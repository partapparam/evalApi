/**
 * Posts a comment on github
 * @param {Number} issueNum - the issue number where the comment should be posted
 * @param {String} comment - the comment to be posted
 */
// async function postComment(issueNum, comment, github, context) {
//   try {
//     await github.rest.issues.createComment({
//       owner: context.repo.owner,
//       repo: context.repo.repo,
//       issue_number: issueNum,
//       body: comment,
//     })
//   } catch (err) {
//     throw new Error(err)
//   }
// }

async function hideComment(github, nodeID) {
  const reason = "OUTDATED"
  try {
    await github.graphql(`
      mutation {
        minimizeComment(input: {classifier: ${reason}, subjectId: "${nodeID}"}) {
          minimizedComment {
            isMinimized
          }
        }
      }
    `)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = hideComment
