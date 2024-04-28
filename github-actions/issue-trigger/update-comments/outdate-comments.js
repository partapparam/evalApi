// Import modules
const hideComment = require("../../utils/hide-issue-comment")

// Global variables
var github
var context

async function main({ g, c }) {
  github = g
  context = c
  const comment = await findComment(github, context)
  if (comment && comment.node_id) {
    await hideComment(github, comment.node_id)
  }
  console.log("failed")
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

  return response.data
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
  // this will return the oldest comment, we want the most recent
  // get last comment, autosorted by github ascending order by date
  const comment = matchingComments[matchingComments.length - 1]
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
