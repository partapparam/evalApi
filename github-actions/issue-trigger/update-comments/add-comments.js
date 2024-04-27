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
  const issueNumber = context.payload.issue.number

  // Add issue number used to reference the issue and comment on the `Dev/PM Agenda and Notes`
  const commentBody = `Hi @${context.actor}
            Based on the \`feature: feature branch\` label, this issue should target a feature branch.  Please consult the instructions on [working off of a feature branch](https://github.com/hackforla/website/wiki/How-to-work-off-of-a-feature-branch)`
  await postComment(issueNumber, commentBody, github, context)
}

module.exports = main
