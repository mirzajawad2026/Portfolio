# React + Vite

# Mirza-jawad-portfolio
# Portfolio

## GitHub API integration

This project can use the GitHub API to show your repositories and stats. To avoid GitHub rate limits and enable access to private data, create a `.env` file at the project root with a personal access token named `VITE_GITHUB_TOKEN`.

1. Copy `.env.example` to `.env`.
2. Set `VITE_GITHUB_TOKEN` to your GitHub personal access token.

Example:

```
VITE_GITHUB_TOKEN=ghp_yourtokenhere
```

Restart the dev server after adding the `.env` file so Vite picks up the variable.
