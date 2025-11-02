import { useEffect, useState } from 'react';

const THEMES = [
  'nightfall',
  'dracula',
  'cyberpunk',
  'dark-neon',
  'hackerman',
  'gamecore',
  'neon-accent',
] as const;

type Theme = typeof THEMES[number];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('nightfall');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or system preference
    const stored = localStorage.getItem('theme') as Theme | null;
    
    if (stored && THEMES.includes(stored)) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = import.meta.env.PUBLIC_DEFAULT_THEME || 'nightfall';
      const initialTheme = prefersDark ? defaultTheme : 'nightfall';
      setTheme(initialTheme as Theme);
      document.documentElement.setAttribute('data-theme', initialTheme);
      localStorage.setItem('theme', initialTheme);
    }
    
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return (
      <div className="dropdown dropdown-end">
        <button 
          tabIndex={0} 
          className="btn btn-ghost btn-sm"
          aria-label="Theme selector"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button 
        tabIndex={0} 
        className="btn btn-ghost btn-sm"
        aria-label="Select theme"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
        <span className="hidden sm:inline ml-1 capitalize">{theme}</span>
      </button>
      <ul 
        tabIndex={0} 
        className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2 max-h-96 overflow-y-auto z-50"
        role="menu"
      >
        {THEMES.map((t) => (
          <li key={t} role="none">
            <button
              role="menuitem"
              className={`${theme === t ? 'active' : ''}`}
              onClick={() => handleThemeChange(t)}
            >
              <span className="capitalize">{t.replace('-', ' ')}</span>
              {theme === t && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-auto">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
