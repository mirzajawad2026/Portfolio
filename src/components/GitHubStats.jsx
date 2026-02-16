import React, { useEffect, useState } from "react";
import "../styles/global.css";
import fetchGitHubProjects from "../services/githubService";

function GitHubStats() {
  const [stats, setStats] = useState({ totalRepos: 0, totalStars: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const projects = await fetchGitHubProjects();
        if (!mounted) return;
        const totalRepos = projects.length;
        const totalStars = projects.reduce((acc, p) => acc + (p.stars || 0), 0);
        setStats({ totalRepos, totalStars });
      } catch (err) {
        console.error("Error loading GitHub stats:", err);
        if (mounted) setStats({ totalRepos: 0, totalStars: 0 });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadStats();

    return () => { mounted = false; };
  }, []);

  if (loading) return (
    <div className="github-stats">
      <div className="stat">Loading stats…</div>
    </div>
  );

  return (
    <div className="github-stats" data-aos="fade-up">
      <div className="stat-card">
        <div className="stat-number">{stats.totalRepos}</div>
        <div className="stat-label">Projects</div>
      </div>

      <div className="stat-card">
        <div className="stat-number">{stats.totalStars}</div>
        <div className="stat-label">Total Stars</div>
      </div>

      <a href={`/#projects`} className="view-projects-link">View Projects</a>
    </div>
  );
}

export default GitHubStats;
