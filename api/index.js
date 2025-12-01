const GITHUB_API_URL = "https://api.github.com/graphql";

const query = `
  query UserMetrics($login: String!) {
    user(login: $login) {
      login
      name
      contributionsCollection {
        totalCommitContributions
        totalPullRequestReviewContributions
        totalRepositoryDiscussionComments
      }
      issues(states: CLOSED) {
        totalCount
      }
      repositories(
        privacy: PUBLIC
        ownerAffiliations: OWNER
        isFork: false
        first: 100
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          stargazerCount
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;

function buildHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };
}

async function fetchGitHubData(token, username) {
  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${errorBody}`);
  }

  const body = await response.json();

  if (body.errors) {
    const messages = body.errors.map((error) => error.message).join("; ");
    throw new Error(`GitHub API returned errors: ${messages}`);
  }

  return body.data;
}

function mapMetrics(user) {
  const commits = user?.contributionsCollection?.totalCommitContributions ?? 0;
  const reviews =
    user?.contributionsCollection?.totalPullRequestReviewContributions ?? 0;
  const discussionComments =
    user?.contributionsCollection?.totalRepositoryDiscussionComments ?? 0;
  const closedIssues = user?.issues?.totalCount ?? 0;
  const stars = (user?.repositories?.nodes ?? []).reduce(
    (sum, repo) => sum + (repo?.stargazerCount ?? 0),
    0,
  );
  const repositoriesTruncated = Boolean(user?.repositories?.pageInfo?.hasNextPage);

  return {
    username: user?.login,
    name: user?.name,
    commits,
    reviews,
    discussionComments,
    closedIssues,
    stars,
    repositoriesTruncated,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.GH_TOKEN;
  const username = req.query?.username;

  if (!token) {
    res.status(500).json({ error: "Missing GH_TOKEN environment variable" });
    return;
  }

  if (!username) {
    res.status(400).json({ error: "Missing required 'username' query parameter" });
    return;
  }

  try {
    const data = await fetchGitHubData(token, username);
    if (!data?.user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const metrics = mapMetrics(data.user);

    res.status(200).json({
      requestedAt: new Date().toISOString(),
      metrics,
      raw: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
