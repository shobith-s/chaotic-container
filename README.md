# GitHub Entropy Stats (Chaotic Container)

Phase 1 skeleton for the serverless API that powers the "Chaotic Container" GitHub stats card.

## Setup

1. Create a `.env` file (or set an environment variable) with your GitHub token:

   ```bash
   GH_TOKEN=ghp_your_token_here
   ```

2. Install Vercel globally if you plan to run locally:

   ```bash
   npm install -g vercel
   ```

3. Start the development server:

   ```bash
   vercel dev
   ```

   Then call the endpoint: `http://localhost:3000/api?username=octocat`

## API

- **Route:** `/api?username=<github_login>`
- **Method:** `GET`
- **Response:** JSON with two blocks:
  - `metrics`: normalized fields for commits, reviews, discussion comments, closed issues, and a summed star count.
  - `raw`: the original GraphQL response (useful for debugging or iterating on the SVG layout).

## GraphQL query

The API issues a single GitHub GraphQL request to gather the metrics required for the later SVG layout:

- `totalCommitContributions`
- `totalPullRequestReviewContributions`
- `totalRepositoryDiscussionComments`
- `issues(states: CLOSED) { totalCount }`
- Public, non-fork repositories (up to 100) with `stargazerCount`, plus a `hasNextPage` flag to signal truncation.

## Deployment

The provided `vercel.json` pins the runtime to Node 18 and routes `/api/*` to the serverless function. Add the `GH_TOKEN` environment variable in your Vercel project settings before deploying.
