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
    console.log("returned issue", result)
    const issueProjectCard = result.reopenIssue.issue.projectCards.nodes[0]
    await updateIssueProjectCard(issueProjectCard.id, projectColumnId, github)
  }
}

module.exports = main

// {
//                   "name": "In progress (actively working)",
//                   "id": "PC_lATOJyGIJc4A4juVzgEvcLk"
//                 }

// //{
//   "data": {
//     "repository": {
//       "issues": {
//         "nodes": [
//           {
//             "__typename": "Issue",
//             "author": {
//               "login": "partapparam"
//             },
//             "title": "Test - complete response",
//             "closed": false,
//             "number": 15,
//             "url": "https://github.com/partapparam/evalApi/issues/15",
//             "id": "I_kwDOJyGIJc6IvHuy",
//             "projectCards": {
//               "nodes": [
//                 {
//                   "databaseId": 92579017,
//                   "id": "PRC_lALOJyGIJc4A4juVzgWEpMk",
//                   "column": {
//                     "name": "Prioritized backlog",
//                     "id": "PC_lATOJyGIJc4A4juVzgEvcLg",
//                     "__typename": "ProjectColumn"
//                   }
//                 }
//               ]
//             }
//           },
//           {
//             "__typename": "Issue",
//             "author": {
//               "login": "partapparam"
//             },
//             "title": "issue activity",
//             "closed": false,
//             "number": 16,
//             "url": "https://github.com/partapparam/evalApi/issues/16",
//             "id": "I_kwDOJyGIJc6IvLug",
//             "projectCards": {
//               "nodes": [
//                 {
//                   "databaseId": 92579016,
//                   "id": "PRC_lALOJyGIJc4A4juVzgWEpMg",
//                   "column": {
//                     "name": "Prioritized backlog",
//                     "id": "PC_lATOJyGIJc4A4juVzgEvcLg",
//                     "__typename": "ProjectColumn"
//                   }
//                 }
//               ]
//             }
//           },
//           {
//             "__typename": "Issue",
//             "author": {
//               "login": "partapparam"
//             },
//             "title": "GHA",
//             "closed": true,
//             "number": 17,
//             "url": "https://github.com/partapparam/evalApi/issues/17",
//             "id": "I_kwDOJyGIJc6IvL9K",
//             "projectCards": {
//               "nodes": [
//                 {
//                   "databaseId": 92579018,
//                   "id": "PRC_lALOJyGIJc4A4juVzgWEpMo",
//                   "column": {
//                     "name": "QA",
//                     "id": "PC_lATOJyGIJc4A4juVzgEvcLs",
//                     "__typename": "ProjectColumn"
//                   }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   }
// }
