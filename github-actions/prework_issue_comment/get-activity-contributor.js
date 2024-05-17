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
async function main({ g, c }) {
  github = g
  context = c
  console.log(context.eventName, context)
  return getIssueEventType(context)
  //
}

function getIssueEventType(context) {
  let contributor = ""
  if (context.eventName == "opened") {
    contributor = context.payload.issue.user.login
  } else if (context.eventName == "closed") {
    contributor = context.payload.issue.assignee.login || context.actor
  } else {
    //   assigned or unassigned
    contributor = context.payload.assignee.login
  }
  return contributor
}

function getIssueCommentEventType(action) {
  return context.payload.issue
}

module.exports = main

// unassigned
// context.payload.action
// context.payload.assignee.login
// context.eventName

// assigned
// context.payload.action
// context.payload.assignee.login
// context.eventName

// closed
// context.payload.action
// context.payload.issue.assignee.login or context.payload.sender.login or context.actor
// context.eventName

// undefined Context {
//   payload: {
//     action: 'unassigned',
//     assignee: {
//       avatar_url: 'https://avatars.githubusercontent.com/u/24577323?v=4',
//       events_url: 'https://api.github.com/users/partapparam/events{/privacy}',
//       followers_url: 'https://api.github.com/users/partapparam/followers',
//       following_url: 'https://api.github.com/users/partapparam/following{/other_user}',
//       gists_url: 'https://api.github.com/users/partapparam/gists{/gist_id}',
//       gravatar_id: '',
//       html_url: 'https://github.com/partapparam',
//       id: 24577323,
//       login: 'partapparam',
//       node_id: 'MDQ6VXNlcjI0NTc3MzIz',
//       organizations_url: 'https://api.github.com/users/partapparam/orgs',
//       received_events_url: 'https://api.github.com/users/partapparam/received_events',
//       repos_url: 'https://api.github.com/users/partapparam/repos',
//       site_admin: false,
//       starred_url: 'https://api.github.com/users/partapparam/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/partapparam/subscriptions',
//       type: 'User',
//       url: 'https://api.github.com/users/partapparam'
//     },
//     issue: {
//       active_lock_reason: null,
//       assignee: null,
//       assignees: [],
//       author_association: 'OWNER',
//       body: null,
//       closed_at: null,
//       comments: 0,
//       comments_url: 'https://api.github.com/repos/partapparam/evalApi/issues/18/comments',
//       created_at: '2024-05-14T00:15:15Z',
//       events_url: 'https://api.github.com/repos/partapparam/evalApi/issues/18/events',
//       html_url: 'https://github.com/partapparam/evalApi/issues/18',
//       id: 2294072012,
//       labels: [Array],
//       labels_url: 'https://api.github.com/repos/partapparam/evalApi/issues/18/labels{/name}',
//       locked: false,
//       milestone: null,
//       node_id: 'I_kwDOJyGIJc6IvMLM',
//       number: 18,
//       performed_via_github_app: null,
//       reactions: [Object],
//       repository_url: 'https://api.github.com/repos/partapparam/evalApi',
//       state: 'open',
//       state_reason: null,
//       timeline_url: 'https://api.github.com/repos/partapparam/evalApi/issues/18/timeline',
//       title: 'GHA',
//       updated_at: '2024-05-17T22:56:58Z',
//       url: 'https://api.github.com/repos/partapparam/evalApi/issues/18',
//       user: [Object]
//     },
//     repository: {
//       allow_forking: true,
//       archive_url: 'https://api.github.com/repos/partapparam/evalApi/{archive_format}{/ref}',
//       archived: false,
//       assignees_url: 'https://api.github.com/repos/partapparam/evalApi/assignees{/user}',
//       blobs_url: 'https://api.github.com/repos/partapparam/evalApi/git/blobs{/sha}',
//       branches_url: 'https://api.github.com/repos/partapparam/evalApi/branches{/branch}',
//       clone_url: 'https://github.com/partapparam/evalApi.git',
//       collaborators_url: 'https://api.github.com/repos/partapparam/evalApi/collaborators{/collaborator}',
//       comments_url: 'https://api.github.com/repos/partapparam/evalApi/comments{/number}',
//       commits_url: 'https://api.github.com/repos/partapparam/evalApi/commits{/sha}',
//       compare_url: 'https://api.github.com/repos/partapparam/evalApi/compare/{base}...{head}',
//       contents_url: 'https://api.github.com/repos/partapparam/evalApi/contents/{+path}',
//       contributors_url: 'https://api.github.com/repos/partapparam/evalApi/contributors',
//       created_at: '2023-06-21T05:08:50Z',
//       default_branch: 'master',
//       deployments_url: 'https://api.github.com/repos/partapparam/evalApi/deployments',
//       description: 'Node/Express API for Eval - Where Service Providers Can Rate Homeowners',
//       disabled: false,
//       downloads_url: 'https://api.github.com/repos/partapparam/evalApi/downloads',
//       events_url: 'https://api.github.com/repos/partapparam/evalApi/events',
//       fork: false,
//       forks: 1,
//       forks_count: 1,
//       forks_url: 'https://api.github.com/repos/partapparam/evalApi/forks',
//       full_name: 'partapparam/evalApi',
//       git_commits_url: 'https://api.github.com/repos/partapparam/evalApi/git/commits{/sha}',
//       git_refs_url: 'https://api.github.com/repos/partapparam/evalApi/git/refs{/sha}',
//       git_tags_url: 'https://api.github.com/repos/partapparam/evalApi/git/tags{/sha}',
//       git_url: 'git://github.com/partapparam/evalApi.git',
//       has_discussions: false,
//       has_downloads: true,
//       has_issues: true,
//       has_pages: false,
//       has_projects: true,
//       has_wiki: false,
//       homepage: 'https://eval-app.com/',
//       hooks_url: 'https://api.github.com/repos/partapparam/evalApi/hooks',
//       html_url: 'https://github.com/partapparam/evalApi',
//       id: 656508965,
//       is_template: false,
//       issue_comment_url: 'https://api.github.com/repos/partapparam/evalApi/issues/comments{/number}',
//       issue_events_url: 'https://api.github.com/repos/partapparam/evalApi/issues/events{/number}',
//       issues_url: 'https://api.github.com/repos/partapparam/evalApi/issues{/number}',
//       keys_url: 'https://api.github.com/repos/partapparam/evalApi/keys{/key_id}',
//       labels_url: 'https://api.github.com/repos/partapparam/evalApi/labels{/name}',
//       language: 'JavaScript',
//       languages_url: 'https://api.github.com/repos/partapparam/evalApi/languages',
//       license: null,
//       merges_url: 'https://api.github.com/repos/partapparam/evalApi/merges',
//       milestones_url: 'https://api.github.com/repos/partapparam/evalApi/milestones{/number}',
//       mirror_url: null,
//       name: 'evalApi',
//       node_id: 'R_kgDOJyGIJQ',
//       notifications_url: 'https://api.github.com/repos/partapparam/evalApi/notifications{?since,all,participating}',
//       open_issues: 4,
//       open_issues_count: 4,
//       owner: [Object],
//       private: false,
//       pulls_url: 'https://api.github.com/repos/partapparam/evalApi/pulls{/number}',
//       pushed_at: '2024-05-17T22:56:48Z',
//       releases_url: 'https://api.github.com/repos/partapparam/evalApi/releases{/id}',
//       size: 193,
//       ssh_url: 'git@github.com:partapparam/evalApi.git',
//       stargazers_count: 0,
//       stargazers_url: 'https://api.github.com/repos/partapparam/evalApi/stargazers',
//       statuses_url: 'https://api.github.com/repos/partapparam/evalApi/statuses/{sha}',
//       subscribers_url: 'https://api.github.com/repos/partapparam/evalApi/subscribers',
//       subscription_url: 'https://api.github.com/repos/partapparam/evalApi/subscription',
//       svn_url: 'https://github.com/partapparam/evalApi',
//       tags_url: 'https://api.github.com/repos/partapparam/evalApi/tags',
//       teams_url: 'https://api.github.com/repos/partapparam/evalApi/teams',
//       topics: [],
//       trees_url: 'https://api.github.com/repos/partapparam/evalApi/git/trees{/sha}',
//       updated_at: '2024-05-17T22:56:51Z',
//       url: 'https://api.github.com/repos/partapparam/evalApi',
//       visibility: 'public',
//       watchers: 0,
//       watchers_count: 0,
//       web_commit_signoff_required: false
//     },
//     sender: {
//       avatar_url: 'https://avatars.githubusercontent.com/u/24577323?v=4',
//       events_url: 'https://api.github.com/users/partapparam/events{/privacy}',
//       followers_url: 'https://api.github.com/users/partapparam/followers',
//       following_url: 'https://api.github.com/users/partapparam/following{/other_user}',
//       gists_url: 'https://api.github.com/users/partapparam/gists{/gist_id}',
//       gravatar_id: '',
//       html_url: 'https://github.com/partapparam',
//       id: 24577323,
//       login: 'partapparam',
//       node_id: 'MDQ6VXNlcjI0NTc3MzIz',
//       organizations_url: 'https://api.github.com/users/partapparam/orgs',
//       received_events_url: 'https://api.github.com/users/partapparam/received_events',
//       repos_url: 'https://api.github.com/users/partapparam/repos',
//       site_admin: false,
//       starred_url: 'https://api.github.com/users/partapparam/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/partapparam/subscriptions',
//       type: 'User',
//       url: 'https://api.github.com/users/partapparam'
//     }
//   },
//   eventName: 'issues',
//   sha: '0ab6ef67e512fcc59cb68c1dd82b2c8f8b3ee521',
//   ref: 'refs/heads/master',
//   workflow: 'Issue Trigger',
//   action: 'get-contributor',
//   actor: 'partapparam',
//   job: 'add-comment-to-prework-issue',
//   runNumber: 194,
//   runId: 9135162209,
//   apiUrl: 'https://api.github.com',
//   serverUrl: 'https://github.com',
//   graphqlUrl: 'https://api.github.com/graphql'
// }
