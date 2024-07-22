const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const buildDir = 'bundles'; // or 'build', depending on your setup
const branch = 'gh-pages';

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
  console.error(`Build directory "${buildDir}" does not exist. Please build your project first.`);
  process.exit(1);
}

// Initialize a temporary git repo
execSync('git init', { cwd: buildDir });

// Add remote origin
execSync(`git remote add origin https://github.com/naijamesz/FEM-Interactive-comments-challenge.git`, {
  cwd: buildDir,
});

// Checkout to a new orphan gh-pages branch
execSync(`git checkout --orphan ${branch}`, { cwd: buildDir });

// Add all files
execSync('git add .', { cwd: buildDir });

// Commit changes
execSync('git commit -m "Deploy to GitHub Pages"', { cwd: buildDir });

// Force push to the gh-pages branch on GitHub
execSync(`git push origin ${branch} --force`, { cwd: buildDir });

console.log('Deployment to GitHub Pages completed successfully.');
