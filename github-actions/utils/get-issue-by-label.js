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
    let issues = results.repository.issues.nodes.map((issue) => issue)
    console.log("issues fetched:", issues)
    console.log(context)
    return issues[0]
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * GraphQL query template to use to execute the search.
 */
const query = `
query ($actor: String!, $label: String!, $owner: String!, $repository: String!) {
  repository (owner: $owner, name: $repository) {
   issues (labels: [$label], first: 1, filterBy: {createdBy: $actor}) {
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
`

module.exports = getIssueByLabel
