/**
 * GraphQL query template to use to execute the search.
 */
//   repository(owner: "hackforla", name: "website") {
//
const query = `
query ($owner: String!, $repository: String!) {
  repository(owner: $owner, name: $repository) {
    projects(first: 10) {
      nodes {
        name
        number
        id
        columns(first: 10) {
          __typename
          nodes {
            name
            id
          }
        }
      }
    }
  }
}
}
`

const changeColumn = `
`
