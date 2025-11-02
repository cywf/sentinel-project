import { Octokit } from '@octokit/rest';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const OWNER = 'cywf';
const REPO = 'sentinel-project';

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  languages: Record<string, number>;
  recentCommits: {
    week: string;
    commits: number;
  }[];
  lastUpdated: string;
}

async function fetchRepoData() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });

  try {
    console.log('Fetching repository data...');

    // Get repository info
    const { data: repo } = await octokit.repos.get({
      owner: OWNER,
      repo: REPO,
    });

    // Get languages
    const { data: languages } = await octokit.repos.listLanguages({
      owner: OWNER,
      repo: REPO,
    });

    // Get commit activity (last 12 weeks)
    const { data: commitActivity } = await octokit.repos.getCommitActivityStats({
      owner: OWNER,
      repo: REPO,
    });

    // Process commit activity
    const recentCommits = (commitActivity || []).slice(-12).map((week: any) => {
      const date = new Date(week.week * 1000);
      return {
        week: date.toISOString().split('T')[0],
        commits: week.total,
      };
    });

    const stats: RepoStats = {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      languages,
      recentCommits,
      lastUpdated: new Date().toISOString(),
    };

    // Write to file
    const outputPath = './public/data/stats.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(stats, null, 2));

    console.log('✓ Repository stats written to', outputPath);
    console.log(`  Stars: ${stats.stars}, Forks: ${stats.forks}, Watchers: ${stats.watchers}`);
  } catch (error) {
    console.error('Error fetching repository data:', error);
    
    // Write empty data on error so build doesn't fail
    const emptyStats: RepoStats = {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0,
      languages: {},
      recentCommits: [],
      lastUpdated: new Date().toISOString(),
    };
    
    const outputPath = './public/data/stats.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(emptyStats, null, 2));
    
    console.log('⚠ Empty stats written due to error');
  }
}

fetchRepoData();
