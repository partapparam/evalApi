/**
 * Reopen a closed issue
 * @param {Number} issueId - the issue that should be reopened
 */
async function reopenIssue(issueId, github, context) {
  try {
    await github.graphql.issues.createComment(mutation, {
      issueId: issueId,
    })
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * GraphQL query template to use to execute the mutation.
 */
const mutation = `
mutation ($issueId: String!) {
  reopenIssue (input: { issueId: $issueId}) {
    issue {
      title
      state
    }
  }
}
`

module.exports = reopenIssue
