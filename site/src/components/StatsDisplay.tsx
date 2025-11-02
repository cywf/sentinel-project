import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title);

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  languages: Record<string, number>;
  recentCommits: { week: string; commits: number }[];
  lastUpdated: string;
}

export default function StatsDisplay() {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '';
    fetch(`${base}/data/stats.json`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load statistics');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error || 'Failed to load statistics'}</span>
      </div>
    );
  }

  // Prepare languages chart data
  const languageData = {
    labels: Object.keys(stats.languages),
    datasets: [{
      data: Object.values(stats.languages),
      backgroundColor: [
        '#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', 
        '#dc2626', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'
      ],
      borderColor: 'rgba(0,0,0,0.2)',
      borderWidth: 1,
    }],
  };

  // Prepare commits chart data
  const commitsData = {
    labels: stats.recentCommits.map(c => c.week),
    datasets: [{
      label: 'Commits',
      data: stats.recentCommits.map(c => c.commits),
      backgroundColor: '#2563eb',
      borderColor: '#1e40af',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'currentColor',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'currentColor' },
        grid: { color: 'rgba(128,128,128,0.1)' },
      },
      y: {
        ticks: { color: 'currentColor' },
        grid: { color: 'rgba(128,128,128,0.1)' },
      },
    },
  };

  const totalBytes = Object.values(stats.languages).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
          <div className="stat-title">Stars</div>
          <div className="stat-value text-primary">{stats.stars}</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
          </div>
          <div className="stat-title">Forks</div>
          <div className="stat-value text-secondary">{stats.forks}</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
          <div className="stat-title">Watchers</div>
          <div className="stat-value text-accent">{stats.watchers}</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Open Issues</div>
          <div className="stat-value text-info">{stats.openIssues}</div>
        </div>
      </div>

      {/* Languages Breakdown */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Languages Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64">
              {Object.keys(stats.languages).length > 0 ? (
                <Pie data={languageData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'currentColor' } } } }} />
              ) : (
                <div className="flex items-center justify-center h-full text-base-content/50">
                  No language data available
                </div>
              )}
            </div>
            <div className="space-y-2">
              {Object.entries(stats.languages)
                .sort((a, b) => b[1] - a[1])
                .map(([lang, bytes]) => (
                  <div key={lang} className="flex items-center justify-between">
                    <span className="font-medium">{lang}</span>
                    <span className="text-sm opacity-70">
                      {((bytes / totalBytes) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commit Activity */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Recent Commit Activity (Last 12 Weeks)</h2>
          <div className="h-64">
            {stats.recentCommits.length > 0 ? (
              <Bar data={commitsData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-base-content/50">
                No commit data available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm text-center opacity-70">
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}
