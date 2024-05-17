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

// HACK FOR LA BOARD ID
// {
//             "name": "Project Board",
//             "number": 7,
//             "id": "MDc6UHJvamVjdDM1NTgyODk=",
//             "columns": {
//               "__typename": "ProjectColumnConnection",
//               "nodes": [
//                 {
//                   "name": "Onboarding infos/links",
//                   "id": "MDEzOlByb2plY3RDb2x1bW4xMTM4MTcxNA=="
//                 },
//                 {
//                   "name": "Ice box",
//                   "id": "MDEzOlByb2plY3RDb2x1bW43MTk4MjI3"
//                 },
//                 {
//                   "name": "Emergent Requests",
//                   "id": "PC_lATOB7-mp84ANkuRzgEoFLg"
//                 },
//                 {
//                   "name": "ERs and epics that are ready to be turned into issues",
//                   "id": "PC_lATOB7-mp84ANkuRzgEtilw"
//                 },
//                 {
//                   "name": "New Issue Approval",
//                   "id": "PC_lATOB7-mp84ANkuRzgDoeJE"
//                 },
//                 {
//                   "name": "Prioritized backlog",
//                   "id": "MDEzOlByb2plY3RDb2x1bW43MTk4MjU3"
//                 },
//                 {
//                   "name": "In progress (actively working)",
//                   "id": "MDEzOlByb2plY3RDb2x1bW43MTk4MjI4"
//                 },
//                 {
//                   "name": "Questions / In Review",
//                   "id": "MDEzOlByb2plY3RDb2x1bW44MTc4Njkw"
//                 },
//                 {
//                   "name": "QA",
//                   "id": "PC_lATOB7-mp84ANkuRzgDsXQE"
//                 },
//                 {
//                   "name": "UAT",
//                   "id": "PC_lATOB7-mp84ANkuRzgEGjWA"
//                 }
//               ]
//             }
//           }
