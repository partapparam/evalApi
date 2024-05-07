/**
 * Hide a comment as OUTDATE on github
 * @param {Number} nodeID - the comment to be marked as 'OUTDATED'
 */

async function hideComment(github, nodeID) {
  const reason = "OUTDATED"
  try {
    const resp = await github.graphql(`
      mutation {
        minimizeComment(input: {classifier: ${reason}, subjectId: "${nodeID}"}) {
          minimizedComment {
            isMinimized
            minimizedReason
            viewerCanMinimize
          }
        }
      }
    `)
    console.log("Return from api:", resp)
    if (resp.errors) {
      throw new Error(`${resp.errors[0].message}`)
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = hideComment
