// Import modules
const postComment = require("../../utils/post-issue-comment")

// Global variables
var github
var context

async function main({ g, c }) {
  github = g
  context = c

  const owner = context.repo.owner
  const repo = context.repo.repo
  const issueNumber = github.event.issue.number

  // Add issue number used to reference the issue and comment on the `Dev/PM Agenda and Notes`
  const commentBody = `Hi @[REPLACE WITH AUTHOR]
            Based on the \`feature: feature branch\` label, this issue should target a feature branch.  Please consult the instructions on [working off of a feature branch](https://github.com/hackforla/website/wiki/How-to-work-off-of-a-feature-branch)`
  await postComment(issueNumber, commentBody, github, context)
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
  return comments
}

export function findCommentPredicate(comment) {
  return comment.body.includes("string to match")
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
