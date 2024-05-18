// Import modules
var fs = require("fs")
var getIssueByLabel = require("../utils/get-issue-by-label")

// Global variables
var github
var context

/**
 * @description - This function is the entry point into the javascript file, it formats the md file and posts the comment on the issue
 * @param {Object} g - github object
 * @param {Object} c - context object
 * @param {Object} activityDetail - person who trigger the workflow
 */
async function main({ g, c }, activityDetail) {
  github = g
  context = c
  let label = "Complexity: Prework"
  const issue = await getIssueByLabel(
    activityDetail.contributor,
    label,
    github,
    context
  )
  return issue
}

module.exports = main
