



import { Octokit } from "./../../../../../../web_modules/@octokit/rest";

const octokit = new Octokit();

// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
octokit.rest.repos
  .listForOrg({
    org: "ethermap",
    type: "public",
  })
  .then(({ data }) => {
    // handle data

    console.log('what wow please just work ', data )
  });