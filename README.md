# MONO — Swiss Design & Spatial Architecture Studio (Option 2)

> **Design Style**: Swiss International Typographic Style (Massimo Vignelli × Josef Müller-Brockmann)  
> **Target**: Frontend Deployment Assessment on Vercel  
> **Tech Stack**: Pure Semantic HTML5, CSS3 with 12-Column Grid & Design Tokens, Vanilla JavaScript (ES6+)

---

## Live Deployment Instructions (Vercel)

This project has **zero external build dependencies**. It deploys to Vercel instantly without any setup or build failures.

### Method A: Deploy via GitHub (Recommended for Assessment)
1. Initialize git and push this folder to your GitHub:
   ```bash
   cd option-2-mono-studio
   git init
   git add .
   git commit -m "feat: complete MONO Studio Swiss UI"
   # Create a new repository on github.com, then run:
   git remote add origin https://github.com/<your-username>/mono-studio-frontend.git
   git branch -M main
   git push -u origin main
   ```
2. Visit [Vercel](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New..."** → **"Project"**.
4. Import your `mono-studio-frontend` repository.
5. Keep default settings (Framework Preset: **Other**, Build Command: empty, Output Directory: empty).
6. Click **Deploy**. Your app is live in ~5 seconds!

### Method B: Deploy via Vercel CLI (1-Click)
```bash
npm i -g vercel
vercel
```

---

## Evaluation Highlights for Examiners
- **Visual Discipline**: Asymmetric 12-column Swiss baseline grid, hairline black dividers, Space Grotesk + Inter typography, and intentional negative space.
- **Interactive Micro-features**:
  - **Selected Works Archive**: Filter by discipline (Spatial, Hardware, Digital) and switch between 3-column Grid and List layout.
  - **Tactile Prototype Comparator**: Drag the slider handle to compare vector CAD toolpaths vs bead-blasted anodized finishes in real-time.
  - **Dynamic Fee & Timeline Estimator**: Interactive discipline selection, prototyping tier add-ons, and velocity sliders with instant total calculation.
  - **Slide-out Specification Drawer**: Inspect material lists, tolerances, and design narratives for each project with backdrop blur and escape key accessibility.
- **Zero-Breakage Architecture**: Pure HTML/CSS/JS with `vercel.json` static configuration.

