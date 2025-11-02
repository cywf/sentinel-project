import { Octokit } from '@octokit/rest';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const OWNER = 'cywf';
const REPO = 'sentinel-project';

interface Discussion {
  title: string;
  author: string;
  url: string;
  createdAt: string;
  category: string;
  answerCount: number;
  upvoteCount: number;
}

async function fetchDiscussions() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });

  try {
    console.log('Fetching discussions...');

    // GraphQL query for discussions
    const query = `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussions(first: 25, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              author {
                login
              }
              url
              createdAt
              category {
                name
              }
              comments {
                totalCount
              }
              upvoteCount
            }
          }
        }
      }
    `;

    const response: any = await octokit.graphql(query, {
      owner: OWNER,
      repo: REPO,
    });

    const discussions: Discussion[] = response.repository.discussions.nodes.map((node: any) => ({
      title: node.title,
      author: node.author?.login || 'Unknown',
      url: node.url,
      createdAt: node.createdAt,
      category: node.category?.name || 'General',
      answerCount: node.comments.totalCount,
      upvoteCount: node.upvoteCount || 0,
    }));

    // Write to file
    const outputPath = './public/data/discussions.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(discussions, null, 2));

    console.log('✓ Discussions written to', outputPath);
    console.log(`  Found ${discussions.length} discussions`);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    
    // Write empty array on error
    const outputPath = './public/data/discussions.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify([], null, 2));
    
    console.log('⚠ Empty discussions written due to error');
  }
}

fetchDiscussions();
