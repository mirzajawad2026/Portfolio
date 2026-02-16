# GitHub API Integration Setup Guide

Your portfolio is now configured to automatically sync projects from your GitHub repositories! 🚀

## How It Works

- **Automatic Syncing**: When you add a new public repository to GitHub, it will automatically appear on your portfolio
- **Automatic Removal**: When you delete a repository from GitHub, it will automatically disappear from your portfolio
- **Real-time Updates**: The portfolio fetches your latest public repos when the page loads
- **Smart Filtering**: Only public repositories are displayed (private repos are hidden)
- **Auto-sorting**: Projects are sorted by most recently updated

## Setup Instructions

### Step 1: Get Your GitHub Personal Access Token

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give your token a name: `Portfolio` (or any name you prefer)
4. Under **Select scopes**, check:
   - ✅ `public_repo` (minimum required)
5. Click **"Generate token"** at the bottom
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token to `.env` File

Open the `.env` file in the root of your project and replace the placeholder:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

Replace `your_github_personal_access_token_here` with your actual token token. Example:

```env
VITE_GITHUB_TOKEN=ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r
```

**⚠️ Important**: Never commit this file to GitHub! It's already in `.gitignore`.

### Step 3: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to the Projects section
3. You should see your GitHub repositories loaded automatically

## What Happens Automatically

### Adding a Project
When you create a new public repository on GitHub:
1. Push some code to the repository
2. Refresh your portfolio page
3. The new project appears automatically! ✨

### Removing a Project
When you delete a repository from GitHub:
1. Delete the repo from GitHub
2. Refresh your portfolio page
3. The project disappears automatically! 🗑️

### Updating Project Info
When you update repository details on GitHub:
- Description changes appear when you refresh
- Language updates show immediately
- Stars and updates are reflected in real-time

## Project Display Features

Each project card displays:
- **Title**: Repository name (with hyphens converted to spaces)
- **Language**: Programming language used (if detected)
- **Color**: Unique gradient color for each project
- **Live Preview**: Link to GitHub Pages (if enabled for that repo)
- **View Code**: Direct link to your repository

## Environment Setup

The integration uses environment variables configured via Vite:

```javascript
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = "your_username"; // Update this in githubService.js
```

### Customization

You can customize the behavior by editing [src/services/githubService.js](src/services/githubService.js):

- **Change username**: Edit `GITHUB_USERNAME` constant
- **Filter repositories**: Modify the `.filter(repo => !repo.private)` logic
- **Change sorting**: Update the `.sort()` function
- **Customize colors**: Edit the `colors` array in `generateColor()`

## Troubleshooting

### Projects Not Loading?
- ✅ Check that your `.env` file has the correct token
- ✅ Verify the token has `public_repo` scope
- ✅ Ensure you have at least one public repository on GitHub
- ✅ Check browser console (F12) for error messages

### Token Expired?
- Generate a new token on GitHub
- Update the `.env` file with the new token
- Restart the development server

### Rate Limiting?
GitHub's public API allows 60 requests per hour without authentication, or 5,000 per hour with a token. With a valid token, rate limiting shouldn't be an issue.

## Security Notes

- ✅ Never share your personal access token
- ✅ Never commit `.env` to version control (it's in `.gitignore`)
- ✅ If you accidentally expose a token, delete it immediately from GitHub settings
- ✅ Use the minimum required scopes (`public_repo`)

## File Structure

```
src/
├── services/
│   └── githubService.js      # Fetches repos from GitHub API
├── components/
│   └── Projects.jsx          # Displays projects with auto-sync
└── data/
    └── projectsData.js       # (No longer used - kept for reference)
```

## API Reference

### fetchGitHubProjects()

```javascript
import { fetchGitHubProjects } from '../services/githubService';

const projects = await fetchGitHubProjects();
// Returns array of transformed project objects
```

Each project object contains:
```javascript
{
  id: number,                    // GitHub repo ID
  title: string,                 // Repository name (formatted)
  description: string,           // Repository description
  color: string,                 // Hex color code
  image: string,                 // SVG image data URL
  liveDemo: string,             // GitHub Pages URL
  code: string,                 // Repository URL
  language: string,             // Programming language
  stars: number,                // Star count
  updatedAt: string             // Last update timestamp
}
```

## Next Steps

- [ ] Generate GitHub personal access token
- [ ] Add token to `.env` file
- [ ] Run `npm run dev`
- [ ] Visit Projects section to verify
- [ ] Create/delete repos on GitHub and watch them sync!

Enjoy your dynamic portfolio! 🎉
