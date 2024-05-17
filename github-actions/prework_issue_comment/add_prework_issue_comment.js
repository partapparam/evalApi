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
async function main({ g, c }, actor) {
  github = g
  context = c

  let issues = await github.graphql(query, {
    actor: actor,
  })
  console.log("issues fetched:", issues)
}

/**
 * GraphQL query template to use to execute the search.
 */
const query = `
query {
  repository (owner:"partapparam", name: "evalApi") {
   issues (labels: ["Complexity: Prework"], first: 5, filterBy: {createdBy: $actor}) {
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
       }
     }
   }
  }
}
`

module.exports = main
