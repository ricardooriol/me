/**
 * Ricardo Oriol — Minimal Canvas
 * Theme Toggle & Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Prefer stored theme, otherwise check system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('canvas-theme') || (systemPrefersDark ? 'dark' : 'light');

  setTheme(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('canvas-theme', theme);
    if (toggleBtn) {
      toggleBtn.textContent = theme === 'light' ? 'dark' : 'light';
    }
  }
});
