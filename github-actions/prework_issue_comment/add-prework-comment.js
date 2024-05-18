// Import modules
var fs = require("fs")
const postComment = require("../utils/post-issue-comment")
const formatComment = require("../utils/format-comment")

// Global variables
var github
var context

/**
 * @description - This function is the entry point into the javascript file, it formats the md file and posts the comment on the issue
 * @param {Object} g - github object
 * @param {Object} c - context object
 */
async function main({ g, c }, issueNumber, activityDetail) {
  github = g
  context = c
  const comment = await makeComment(activityDetail)
  if (comment !== null) {
    // the actual creation of the comment in github
    await postComment(issueNumber, comment, github, context)
  }
}

/**
 * @description - This function makes the comment with the label event actor's name github handle using the raw feature-branch-comment.md file
 * @returns {string} - Comment to be posted with the issue label event actor's name
 */

async function makeComment(activityDetail) {
  const comment = ` ${activityDetail.activityObject} has been ${activityDetail.action} by @${activityDetail.contributor}
`
  return comment
}

module.exports = main
