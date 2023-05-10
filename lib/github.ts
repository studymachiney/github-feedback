import 'server-only';
import jwt from 'jsonwebtoken';
import { notFound } from 'next/navigation';

let accessToken: string;

async function getAccessToken(installationId: number, token: string) {
  const data = await fetchGitHub(`/app/installations/${installationId}/access_tokens`, token, { method: 'POST' });
  return data.token;
}

function getGitHubJWT() {
  if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_APP_PK_PEM) {
    throw new Error(
      'GITHUB_APP_ID and GITHUB_APP_PK_PEM must be defined in .env.local'
    );
  }

  return jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 60,
      iss: process.env.GITHUB_APP_ID,
      exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes is the max
    },
    process.env.GITHUB_APP_PK_PEM.replaceAll('\\n', '\n'),
    {
      algorithm: 'RS256',
    }
  );
}

async function getInstallation(token: string) {
  const installations = await fetchGitHub('/app/installations', token);
  return installations.find((i: any) => i.account.login === 'studymachiney');
}

function createGitHubRequest(path: string, token: string, opts: any = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    }
  })
}

export async function fetchGitHub(path: string, token: string, opts: any = {}) {
  let req = await createGitHubRequest(path, token, opts);
  console.log(req.status);
  if (req.status === 401) {
    await setAccessToken();
    req = await createGitHubRequest(path, accessToken, opts);
  }
  return req.json()
}

export async function readAccessToken() {
  if (!accessToken) {
    await setAccessToken();
  }
  return accessToken;
}

export async function setAccessToken() {
  const jwt = getGitHubJWT();
  const installation = await getInstallation(jwt);
  accessToken = await getAccessToken(installation.id, jwt);

  return accessToken;
}

export async function fetchIssueAndRepoData() {
  const [issues, repoDetails] = await Promise.all([
    fetchGitHub('/repos/studymachiney/github-feedback/issues', accessToken),
    fetchGitHub('/repos/studymachiney/github-feedback', accessToken)
  ]);
  console.log('[Next.js] Fetching data for /');
  console.log(`[Next.js] Issues: ${issues.length}`);

  return {
    issues,
    stargazers_count: repoDetails.stargazers_count,
    forks_count: repoDetails.forks_count,
  };
}

export async function fetchIssuePageData(id: string) {
  const [issue, comments, repoDetails] = await Promise.all([
    fetchGitHub(`/repos/studymachiney/github-feedback/issues/${id}`, accessToken),
    fetchGitHub(
      `/repos/studymachiney/github-feedback/issues/${id}/comments`,
      accessToken
    ),
    fetchGitHub('/repos/studymachiney/github-feedback', accessToken),
  ]);

  console.log({
    issue, comments, repoDetails

  })

  console.log(`[Next.js] Fetching data for /${id}`);
  console.log(`[Next.js] [${id}] Comments: ${comments.length}`);

  if (issue.message === 'Not Found') {
    notFound();
  }

  return {
    issue,
    comments,
    stargazers_count: repoDetails.stargazers_count,
    forks_count: repoDetails.forks_count,
  };
}
