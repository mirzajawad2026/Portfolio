import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchGitHubProjects } from "../services/githubService";

import "../styles/global.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from GitHub API
    const getProjects = async () => {
      try {
        const gitHubProjects = await fetchGitHubProjects();
        setProjects(gitHubProjects);
        if (gitHubProjects.length === 0) {
          setError("No public projects found on GitHub");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    getProjects();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, [projects]);

  if (loading) {
    return (
      <section id="projects" data-aos="fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading your awesome projects from GitHub...</p>
        </div>
      </section>
    );
  }

  if (error && projects.length === 0) {
    return (
      <section id="projects" data-aos="fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="loading-container">
          <p className="loading-text">📭 {error}</p>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
            Make sure you have public repositories on GitHub
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" data-aos="fade-up">
      <h2 className="section-title">Projects ({projects.length})</h2>

      {projects.length > 0 ? (
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "25px",
            padding: "20px 10px"
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card-modern"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }}
            >
              <div
                className="project-image-container"
                style={{ borderTopColor: project.color }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    console.warn(`Failed to load image for ${project.title}`);
                  }}
                />
                <div 
                  className="project-overlay"
                  style={{ background: `linear-gradient(135deg, ${project.color}dd, ${project.color}99)` }}
                />
              </div>

              <div className="project-details">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.language}</p>
                {project.description && (
                  <p style={{ fontSize: "12px", color: "#999", marginTop: "8px", lineHeight: "1.4" }}>
                    {project.description}
                  </p>
                )}
              </div>

              <div className="project-actions" style={{ marginTop: "auto" }}>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn live-preview"
                  style={{ 
                    background: project.color,
                    borderColor: project.color,
                    color: "white"
                  }}
                >
                  🌐 Live Server
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn view-code"
                  style={{ 
                    borderColor: project.color,
                    color: project.color
                  }}
                >
                  💻 Code
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-container">
          <p className="loading-text">No projects to display</p>
        </div>
      )}
    </section>
  );
}

export default Projects;
