import { useEffect, useState } from 'react';

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

export default function ProjectBoard() {
  const [board, setBoard] = useState<ProjectBoard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '';
    fetch(`${base}/data/projects.json`)
      .then(res => res.json())
      .then(data => {
        setBoard(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton h-96 w-full"></div>
        ))}
      </div>
    );
  }

  if (!board || Object.keys(board.columns).length === 0) {
    return (
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>No project board data available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(board.columns).map(([column, items]) => (
          <div key={column} className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg border-b border-base-300 pb-2">
                {column}
                <span className="badge badge-primary ml-auto">{items.length}</span>
              </h3>
              <div className="space-y-2 mt-2">
                {items.map((item, idx) => (
                  <div key={idx} className="card bg-base-300 hover:bg-base-100 transition-colors text-sm">
                    <div className="card-body p-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary line-clamp-2"
                      >
                        {item.title}
                      </a>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.labels.slice(0, 3).map((label, i) => (
                          <span key={i} className="badge badge-xs badge-outline">
                            {label}
                          </span>
                        ))}
                      </div>
                      {item.assignees.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {item.assignees.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-sm text-center opacity-70">
        Last updated: {new Date(board.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}
