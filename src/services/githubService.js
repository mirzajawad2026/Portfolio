// GitHub API service to fetch user repositories
const GITHUB_USERNAME = "mirzajawad2026";
// Request up to 100 repos to avoid pagination in the UI
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;
// Read token from Vite env var: VITE_GITHUB_TOKEN
const GITHUB_TOKEN = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_GITHUB_TOKEN
  : undefined;

// Generate a unique color based on string
const generateColor = (str) => {
  const colors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#95E1D3", // Mint
    "#F38181", // Pink
    "#AA96DA", // Purple
    "#FCBAD3", // Light Pink
    "#A8EDEA", // Light Blue
    "#FED6E3", // Peach
    "#667eea", // Indigo
    "#f093fb", // Magenta
    "#FA8072", // Salmon
    "#20B2AA", // Light Sea Green
    "#9370DB", // Medium Purple
    "#FF8C94", // Light Coral
    "#6C5CE7", // Vibrant Purple
  ];
  
  const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Generate Beautiful SVG Image that actually shows
const generateSVGImage = (projectName, color1, color2) => {
  // Create a clean, simple SVG that works reliably
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:0.9" />
    </linearGradient>
  </defs>
  <rect width="400" height="250" fill="url(#grad1)"/>
  <rect x="0" y="0" width="400" height="4" fill="rgba(255,255,255,0.5)"/>
  <circle cx="80" cy="60" r="25" fill="rgba(255,255,255,0.15)"></circle>
  <circle cx="320" cy="190" r="35" fill="rgba(255,255,255,0.12)"></circle>
  <text x="200" y="145" font-size="36" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">${projectName.substring(0, 16)}</text>
  <rect x="50" y="170" width="300" height="2" fill="rgba(255,255,255,0.3)"></rect>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Generate GitHub Pages URL
const generateGitHubPagesUrl = (repoName) => {
  return `https://${GITHUB_USERNAME}.github.io/${repoName}/`;
};

export const fetchGitHubProjects = async () => {
  try {
    const headers = {
      "Accept": "application/vnd.github.v3+json"
    };
    
    // Add token if available for higher rate limits
    if (GITHUB_TOKEN && GITHUB_TOKEN !== "your_github_personal_access_token_here") {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    console.log("🔄 Fetching GitHub projects from:", GITHUB_API_URL);
    
    const response = await fetch(GITHUB_API_URL, { headers });
    
    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`, response.statusText);
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    console.log(`✅ Found ${repos.length} repositories`);
    
    // Transform GitHub data to match our project structure
    const projects = repos
      .filter(repo => !repo.private) // Show only public repos
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by latest updated
      .map((repo, index) => {
        const color1 = generateColor(repo.name);
        const color2 = generateColor(repo.name + index);
        const displayName = repo.name.replace(/-/g, " ");
        
        // Always use reliable SVG image
        const svgImage = generateSVGImage(displayName, color1, color2);
        const gitHubPagesUrl = generateGitHubPagesUrl(repo.name);
        
        return {
          id: repo.id,
          title: displayName,
          description: repo.description || "A GitHub repository project",
          color: color1,
          image: svgImage,
          liveDemo: gitHubPagesUrl,
          code: repo.html_url,
          language: repo.language || "Repository",
          stars: repo.stargazers_count,
          updatedAt: repo.updated_at,
        };
      });
    
    console.log(`📊 Displaying ${projects.length} public projects`);
    return projects;
  } catch (error) {
    console.error("❌ Error fetching GitHub projects:", error);
    return [];
  }
};

export default fetchGitHubProjects;
