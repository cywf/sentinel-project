import { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';

interface Diagram {
  name: string;
  filename: string;
  content: string;
}

const diagrams: Diagram[] = [
  { name: 'Architecture', filename: 'architecture.mmd', content: '' },
  { name: 'BPMN-ish Flow', filename: 'bpmnish.mmd', content: '' },
  { name: 'CI Sequence', filename: 'ci-sequence.mmd', content: '' },
  { name: 'Entity Relationship', filename: 'er.mmd', content: '' },
  { name: 'Flowchart', filename: 'flowchart.mmd', content: '' },
];

export default function MermaidVisualizer() {
  const [selectedDiagram, setSelectedDiagram] = useState<string>('architecture.mmd');
  const [diagramContent, setDiagramContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch diagram from GitHub raw
    const url = `https://raw.githubusercontent.com/cywf/sentinel-project/main/mermaid/${selectedDiagram}`;
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch diagram');
        return res.text();
      })
      .then(content => {
        setDiagramContent(content);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load diagram');
        setLoading(false);
      });
  }, [selectedDiagram]);

  useEffect(() => {
    if (diagramContent && containerRef.current && !loading) {
      const renderDiagram = async () => {
        try {
          containerRef.current!.innerHTML = '';
          const { svg } = await mermaid.render('mermaid-diagram', diagramContent);
          containerRef.current!.innerHTML = svg;
        } catch (err) {
          setError('Failed to render diagram');
          console.error(err);
        }
      };
      renderDiagram();
    }
  }, [diagramContent, loading]);

  return (
    <div className="space-y-6">
      {/* Diagram Selector */}
      <div className="tabs tabs-boxed bg-base-200 p-2">
        {diagrams.map((diagram) => (
          <button
            key={diagram.filename}
            className={`tab ${selectedDiagram === diagram.filename ? 'tab-active' : ''}`}
            onClick={() => setSelectedDiagram(diagram.filename)}
          >
            {diagram.name}
          </button>
        ))}
      </div>

      {/* Diagram Display */}
      <div className="card bg-base-200">
        <div className="card-body">
          {loading && (
            <div className="skeleton h-96 w-full"></div>
          )}
          
          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {!loading && !error && (
            <div className="overflow-x-auto">
              <div
                ref={containerRef}
                className="flex justify-center items-center min-h-[400px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <a
          href={`https://github.com/cywf/sentinel-project/blob/main/mermaid/${selectedDiagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View Source
        </a>
        
        <div className="text-sm opacity-70">
          Tip: You can add new diagrams by placing <code>.mmd</code> files in <code>/mermaid</code>
        </div>
      </div>
    </div>
  );
}
