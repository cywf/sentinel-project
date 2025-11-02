import { Octokit } from '@octokit/rest';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const OWNER = 'cywf';
const REPO = 'sentinel-project';

interface ProjectItem {
  title: string;
  status: string;
  url: string;
  labels: string[];
  assignees: string[];
  type: 'issue' | 'pr';
}

interface ProjectBoard {
  columns: {
    [key: string]: ProjectItem[];
  };
  lastUpdated: string;
}

async function fetchProjects() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });

  try {
    console.log('Fetching project data...');

    // Try to fetch GitHub Projects v2 data using GraphQL
    try {
      const query = `
        query($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            projectsV2(first: 1) {
              nodes {
                title
                items(first: 100) {
                  nodes {
                    content {
                      ... on Issue {
                        title
                        url
                        labels(first: 10) {
                          nodes {
                            name
                          }
                        }
                        assignees(first: 5) {
                          nodes {
                            login
                          }
                        }
                      }
                      ... on PullRequest {
                        title
                        url
                        labels(first: 10) {
                          nodes {
                            name
                          }
                        }
                        assignees(first: 5) {
                          nodes {
                            login
                          }
                        }
                      }
                    }
                    fieldValues(first: 10) {
                      nodes {
                        ... on ProjectV2ItemFieldSingleSelectValue {
                          name
                          field {
                            ... on ProjectV2SingleSelectField {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response: any = await octokit.graphql(query, {
        owner: OWNER,
        repo: REPO,
      });

      const project = response.repository.projectsV2.nodes[0];
      
      if (project) {
        const board: ProjectBoard = {
          columns: {},
          lastUpdated: new Date().toISOString(),
        };

        project.items.nodes.forEach((item: any) => {
          if (!item.content) return;

          // Find status field
          let status = 'No Status';
          item.fieldValues.nodes.forEach((field: any) => {
            if (field.field?.name === 'Status' && field.name) {
              status = field.name;
            }
          });

          const projectItem: ProjectItem = {
            title: item.content.title,
            status,
            url: item.content.url,
            labels: item.content.labels?.nodes.map((l: any) => l.name) || [],
            assignees: item.content.assignees?.nodes.map((a: any) => a.login) || [],
            type: item.content.url.includes('/pull/') ? 'pr' : 'issue',
          };

          if (!board.columns[status]) {
            board.columns[status] = [];
          }
          board.columns[status].push(projectItem);
        });

        const outputPath = './public/data/projects.json';
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, JSON.stringify(board, null, 2));

        console.log('✓ Projects v2 data written to', outputPath);
        console.log(`  Columns: ${Object.keys(board.columns).join(', ')}`);
        return;
      }
    } catch (projectError) {
      console.log('Projects v2 not available, falling back to issues...');
    }

    // Fallback: Group issues by status labels
    const { data: issues } = await octokit.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      state: 'open',
      per_page: 100,
    });

    const board: ProjectBoard = {
      columns: {
        'To Do': [],
        'In Progress': [],
        'Done': [],
        'Other': [],
      },
      lastUpdated: new Date().toISOString(),
    };

    issues.forEach((issue) => {
      const labels = issue.labels.map((l) => (typeof l === 'string' ? l : l.name || ''));
      
      let column = 'Other';
      if (labels.some(l => l.toLowerCase().includes('todo') || l.toLowerCase().includes('to do'))) {
        column = 'To Do';
      } else if (labels.some(l => l.toLowerCase().includes('doing') || l.toLowerCase().includes('progress'))) {
        column = 'In Progress';
      } else if (labels.some(l => l.toLowerCase().includes('done') || l.toLowerCase().includes('complete'))) {
        column = 'Done';
      }

      const item: ProjectItem = {
        title: issue.title,
        status: column,
        url: issue.html_url,
        labels,
        assignees: issue.assignees?.map(a => a.login) || [],
        type: issue.pull_request ? 'pr' : 'issue',
      };

      board.columns[column].push(item);
    });

    const outputPath = './public/data/projects.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(board, null, 2));

    console.log('✓ Issue-based board data written to', outputPath);
    console.log(`  Total items: ${issues.length}`);
  } catch (error) {
    console.error('Error fetching project data:', error);
    
    // Write empty board on error
    const emptyBoard: ProjectBoard = {
      columns: {},
      lastUpdated: new Date().toISOString(),
    };
    
    const outputPath = './public/data/projects.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(emptyBoard, null, 2));
    
    console.log('⚠ Empty project board written due to error');
  }
}

fetchProjects();
