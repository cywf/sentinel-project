import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

interface Sentry {
  name: string;
  path: string;
  description: string;
  readmeUrl: string;
}

function scanAiDirectories() {
  const aiDir = join(process.cwd(), '..', 'ai');
  const sentries: Sentry[] = [];

  try {
    console.log('Scanning AI directories...');

    const entries = readdirSync(aiDir);

    for (const entry of entries) {
      const fullPath = join(aiDir, entry);
      
      try {
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && entry !== 'node_modules' && !entry.startsWith('.')) {
          const readmePath = join(fullPath, 'README.md');
          
          try {
            const readmeContent = readFileSync(readmePath, 'utf-8');
            
            // Extract first paragraph as description
            const lines = readmeContent.split('\n').filter(l => l.trim());
            let description = 'AI Sentry agent';
            
            for (const line of lines) {
              if (line.startsWith('#')) continue;
              if (line.trim().length > 20) {
                description = line.trim().substring(0, 150);
                if (description.length === 150) description += '...';
                break;
              }
            }

            sentries.push({
              name: entry.charAt(0).toUpperCase() + entry.slice(1),
              path: `ai/${entry}`,
              description,
              readmeUrl: `https://github.com/cywf/sentinel-project/tree/main/ai/${entry}`,
            });
          } catch {
            // No README, still add the sentry with basic info
            sentries.push({
              name: entry.charAt(0).toUpperCase() + entry.slice(1),
              path: `ai/${entry}`,
              description: 'AI Sentry agent',
              readmeUrl: `https://github.com/cywf/sentinel-project/tree/main/ai/${entry}`,
            });
          }
        }
      } catch (err) {
        console.warn(`Skipping ${entry}:`, err);
      }
    }

    // Sort by name
    sentries.sort((a, b) => a.name.localeCompare(b.name));

    // Write to file
    const outputPath = './public/data/sentries.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(sentries, null, 2));

    console.log('✓ Sentries data written to', outputPath);
    console.log(`  Found ${sentries.length} sentries`);
  } catch (error) {
    console.error('Error scanning AI directories:', error);
    
    // Write empty array on error
    const outputPath = './public/data/sentries.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify([], null, 2));
    
    console.log('⚠ Empty sentries written due to error');
  }
}

scanAiDirectories();
