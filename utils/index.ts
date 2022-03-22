import { Octokit } from '@octokit/rest';

export interface Issue {
  url: string;
  html_url: string;
  repository_url: string;
  title: string;
  created_at: string;
  updated_at: string;
  project_name: string;
  project_url: string;
  body: string;
  id: string;
  assignee: {
    login: string;
    avatar_url: string;
  };
}

export const getIssues: () => Promise<Issue[]> = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const apiURLBeginning = 'https://api.github.com/repos';

  const repoURLBeginning = 'https://github.com/';

  const projectUrls = [
    `${apiURLBeginning}/developer-dao/web3-ui/issues`,
    `${apiURLBeginning}/developer-dao/developerdao.com/issues`,
    `${apiURLBeginning}/developer-dao/dao-job-board/issues`,
    `${apiURLBeginning}/developer-dao/code-claim-site/issues`,
    `${apiURLBeginning}/developer-dao/devdao-domains/issues`,
  ];

  const validLabels = ['good first issue'];

  const result = [];

  for (const url of projectUrls) {
    const response = await octokit.request(url);
    const filtered = response.data
      .filter((i: any) => {
        if (i.labels !== []) {
          const num = i.labels.filter((i: any) =>
            validLabels.includes(i.name.toLowerCase())
          );
          return num.length > 0;
        }
      })
      .map((i: any) => {
        const repoUrlArr = i.repository_url.split('/');
        return {
          ...i,
          project_name: repoUrlArr[repoUrlArr.length - 1],
        };
      });
    result.push(filtered);
  }
  return result.flat();
};
