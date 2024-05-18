/**
 * Reopen a closed issue
 * @param {Number} issueId - the issue that should be reopened
 */
async function reopenIssue(issueId, github, context) {
  try {
    return await github.graphql(mutation, {
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
mutation ($issueId: ID!) {
  reopenIssue (input: { issueId: $issueId}) {
    issue {
      title
      state
      projectCards {
          nodes {
            id
          }
        }
    }
  }
}
`

module.exports = reopenIssue
