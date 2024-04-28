/**
 * Posts a comment on github
 * @param {Number} nodeID - the issue number where the comment should be posted
\ */

async function hideComment(github, nodeID) {
  const reason = "OUTDATED"
  try {
    const resp = await github.graphql(`
      mutation {
        minimizeComment(input: {classifier: ${reason}, subjectId: "${nodeID}"}) {
          minimizedComment {
            isMinimized
          }
        }
      }
    `)
    if (resp.errors) {
      throw new Error(`${resp.errors[0].message}`)
    }
    return resp
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = hideComment
