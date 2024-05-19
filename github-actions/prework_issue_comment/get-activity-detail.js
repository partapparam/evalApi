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
async function main({ g, c }) {
  github = g
  context = c
  console.log(context)
  // console.log(context.eventName)
  if (context.eventName == "issue_comment") {
    return await getIssueCommentEventType(context)
  } else if (context.eventName == "issues") {
    return await getIssueEventType(context)
  } else if (context.eventName == "pull_request") {
    return await getPullRequestEventType(context)
  } else if (context.eventName == "pull_request_review") {
    return await getPullRequestReviewEventType(context)
  } else if (context.eventName == "pull_request_review_comment") {
    return await getPullRequestReviewCommentEventType(context)
  }
  //
}

async function getIssueEventType(context) {
  const activityDetail = {
    contributor: "",
    action: context.payload.action,
    activityObject: `Issue #${context.payload.issue.number}`,
  }
  if (context.payload.action == "opened") {
    activityDetail.contributor = context.payload.issue.user.login
  } else if (context.payload.action == "closed") {
    //   NOTE: context.payload.issue.assignee.login can be null if issue is not assigned and marked closed
    activityDetail.contributor = context.payload.issue.assignee.login
  } else {
    //   on unassigned event, the `issue.assignee` is null.
    activityDetail.contributor = context.payload.assignee.login
  }
  return activityDetail
}

async function getIssueCommentEventType(context) {
  const activityDetail = {
    contributor: context.payload.comment.user.login,
    action: context.payload.action,
    activityObject: context.payload.comment.url,
  }
  return activityDetail
}

async function getPullRequestEventType(context) {
  const activityDetail = {
    contributor: context.payload.pull_request.user.login,
    action: context.payload.action,
    activityObject: `PR #${context.payload.pull_request.number}`,
  }
  return activityDetail
}

async function getPullRequestReviewEventType(context) {
  // also achievable by the context.sender - user who did this event
  const activityDetail = {
    contributor: context.payload.review.user.login,
    action: context.payload.action,
    activityObject: `PR #${context.payload.pull_request.number}`,
  }
  return activityDetail
}

async function getPullRequestReviewCommentEventType(context) {
  // also achievable by the context.sender - user who did this event
  const activityDetail = {
    contributor: context.payload.comment.user.login,
    action: context.payload.action,
    activityObject: `${context.payload.comment.url}`,
  }
  return activityDetail
}

module.exports = main
