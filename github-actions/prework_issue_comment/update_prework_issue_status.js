// Import modules
var fs = require("fs")
var reopenIssue = require("../utils/reopen-issue")

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
  console.log("The issue", issue)
  if (issue.closed == true) {
    await reopenIssue(issue.id, github, context)
  }
}

module.exports = main
