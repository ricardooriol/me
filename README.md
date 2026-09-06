# Ricardo Oriol — Personal Website & Digital Garden

The personal brand website and engineering journal for **Ricardo Oriol**, Integration Engineer at Stripe (ex-AWS Partner Solutions Architect).

## Architecture & Features
- **Zero-Dependency Core:** Pure semantic HTML5, modern vanilla CSS3 design tokens, and modular vanilla JavaScript.
- **Dual Theme Support:** Auto-detects system dark/light mode with smooth toggle and `localStorage` persistence.
- **Stripe & Linear Aesthetic:** Understated palette, responsive grid, glassmorphism sticky navigation, and subtle micro-animations.
- **In-Page Article Reader:** Built-in modal reader for long-form essays without page transitions.
- **Ready for GitHub Pages & Vercel:** Deployable out-of-the-box with zero build step required.

## Live Preview
To preview locally:
```bash
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

## Deploying to GitHub Pages (`ricardooriol.github.io`)
1. Create a repository on GitHub named `ricardooriol.github.io` (or `personal-website`).
2. Add your remote:
   ```bash
   git remote add origin git@github.com:ricardooriol/ricardooriol.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub repo Settings -> Pages, select branch `main` and root `/`.
4. Your site will be live at `https://ricardooriol.github.io/`!
