// Import modules
const hideComment = require("../../utils/hide-issue-comment")

// Global variables
var github
var context

async function main({ g, c }) {
  github = g
  context = c
  const owner = context.repo.owner
  const repo = context.repo.repo
  const issueNumber = context.payload.issue.number
  const comment = await findComment()
  // core.setOutput("comment-id", comment.id.toString())
  // core.setOutput("comment-node-id", comment.node_id)

  await hideComment(github, comment.node_id)
}

async function fetchComments({ github, context }) {
  let issueNumber = github.event.issue.number
  let owner = context.repo.owner
  let repo = context.repo.repo
  const comments = await github.rest.issues.listComments({
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
  })
  console.log("got the comments")
  console.log(comments)
  return comments
}

export function findCommentPredicate(comment) {
  return comment.body.includes(
    "Based on the feature: feature branch label, this issue should target a feature branch."
  )
}

export function findMatchingComment(comments) {
  const matchingComments = comments.filter((comment) =>
    findCommentPredicate(comment)
  )
  const comment = matchingComments[0]
  console.log("matching comments", matchingComments)
  if (comment) {
    return comment
  }
  return undefined
}

export async function findComment() {
  const comments = await fetchComments()
  return findMatchingComment(comments)
}

module.exports = main
