/**
 * Gets issue by label
 * @param {String} actor - the creator of the issue
 * @param {String} label - the label we want to filter by
 */
async function getIssueByLabel(actor, label, github, context) {
  try {
    let results = await github.graphql(query, {
      actor: actor,
      label: label,
      owner: "partapparam",
      repository: "evalApi",
    })

    let issue = results.repository.issues.nodes[0]
    console.log(issue)
    return issue
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

/**
 * GraphQL query template to use to execute the search.
 */
const query = `
query ($actor: String!, $label: String!, $owner: String!, $repository: String!) {
  repository (owner: $owner, name: $repository) {
   issues (first: 10, filterBy: {createdBy: $actor labels: [$label]}) {
     nodes {
       __typename
       ... on Issue {
         author {
          login
        }
         title
         closed
         number
         url
         id
         projectCards {
          nodes {
            databaseId
            column {
              name
              id
              __typename
            }
        }
       }
     }
   }
  }
}
}
`

module.exports = getIssueByLabel
