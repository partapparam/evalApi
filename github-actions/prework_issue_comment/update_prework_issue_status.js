// Import modules
var fs = require("fs")
var reopenIssue = require("../utils/reopen-issue")
var updateIssueProjectCard = require("../utils/update-issue-project-card")

// Global variables
var github
var context

/**
 * @description - This function is the entry point into the javascript file, it formats the md file and posts the comment on the issue
 * @param {Object} g - github object
 * @param {Object} c - context object
 */
async function main({ g, c }, issue) {
  github = g
  context = c

  // TODO value is hardcoded
  // Project Number =1 , for HFLA project number = 7
  const projectColumnId = "PC_lATOJyGIJc4A4juVzgEvcLk"
  if (issue.closed == true) {
    const result = await reopenIssue(issue.id, github, context)
    // const issueProjectCard = result.reopenIssue.issue.projectCards.nodes[0]
    await updateIssueProjectCard(
      issue.projectCards.nodes[0].id,
      projectColumnId,
      github
    )
  }
}

module.exports = main
