// Import modules
var fs = require("fs")

// Global variables
var github
var context

/**
 * @description - This function is the entry point into the javascript file, it formats the md file and posts the comment on the issue
 * @param {Object} g - github object
 * @param {Object} c - context object
 */
async function main({ g, c }, actor) {
  github = g
  context = c
  console.log(github.event, context)
}

function getIssueEventType(action) {
  let contributor = ""
  if (github.event.action == "opened") {
    contributor = context.payload.issue.user.login
  } else {
    contributor = context.payload.issue.assignee.login
  }
  return contributor
}

function getIssueCommentEventType(action) {
  return context.payload.issue
}

module.exports = main
