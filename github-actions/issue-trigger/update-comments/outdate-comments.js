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
  const comment = await findComment(github, context)
  if (comment && comment.node_id) {
    console.log(comment)
    await hideComment(github, comment.node_id)
  }
  // core.setOutput("comment-id", comment.id.toString())
  // core.setOutput("comment-node-id", comment.node_id)
}

async function fetchComments(github, context) {
  let owner = context.repo.owner
  let repo = context.repo.repo
  const issueNumber = context.payload.issue.number

  const response = await github.rest.issues.listComments({
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
  })
  const comments = response.data
  console.log("got the comments")
  return comments
}

function findCommentPredicate(comment) {
  return comment.body.includes(
    "Based on the feature: feature branch label, this issue should target a feature branch."
  )
}

function findMatchingComment(comments) {
  const matchingComments = comments.filter((comment) =>
    comment.body.includes("`feature: feature branch`")
  )
  const comment = matchingComments[0]
  if (comment) {
    return comment
  }
  return undefined
}

async function findComment(github, context) {
  const comments = await fetchComments(github, context)
  return findMatchingComment(comments)
}

module.exports = main
