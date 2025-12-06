import { useState } from "react";
import "./App.css";

function App() {
  // 1. Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("home");

  // 2. Navigation Items Configuration
  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "projects", label: "My Projects", icon: "🚀" },
    { id: "skills", label: "Skill Learning", icon: "📚" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  // 3. Render Logic: If not logged in, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="brand" style={{ justifyContent: "center" }}>
            <div className="brand-icon">N</div>
            Nexus Global
          </div>
          <h2 style={{ marginBottom: "1rem" }}>Welcome Back</h2>
          <p className="card-desc">Login to access your global workspace</p>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
            <input className="input-field" type="email" placeholder="Email Address" required />
            <input className="input-field" type="password" placeholder="Password" required />
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  // 4. Render Logic: If logged in, show Dashboard Layout
  return (
    <div className="app-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>
          Nexus Global
        </div>
        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              <span style={{ marginRight: "10px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: "auto" }}>
          <button className="nav-item" onClick={() => setIsAuthenticated(false)}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <header className="header-bar">
          <h1 className="page-title">
            {navItems.find((n) => n.id === activePage)?.label}
          </h1>
          <div className="user-pill">
            <div style={{ width: 24, height: 24, background: "#3b82f6", borderRadius: "50%" }}></div>
            <span>M. Siddhartha</span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        {activePage === "home" && <HomePage />}
        {activePage === "projects" && <ProjectsPage />}
        {activePage === "skills" && <SkillsPage />}
        {activePage === "profile" && <ProfilePage />}
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS (PAGES) ---

function HomePage() {
  return (
    <div className="dashboard-grid">
      <div className="info-card" style={{ gridColumn: "span 2" }}>
        <h3 className="card-title">Discovery Hub</h3>
        <p className="card-desc">
          [cite_start]Central dashboard for platform activity. View advertisements and announcements. [cite: 3, 4]
        </p>
        <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "1rem", borderRadius: "8px" }}>
          <strong>📢 Announcement:</strong> New "AI Translation" feature is now live in video calls!
        </div>
      </div>

      <div className="info-card">
        <h3 className="card-title">Join Projects</h3>
        <p className="card-desc">Find active projects seeking members.</p>
        <button className="btn-primary">Browse Projects</button>
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div>
      <div className="dashboard-grid">
        {/* Project Marketplace */}
        <div className="info-card">
          <h3 className="card-title">Create Project</h3>
          [cite_start]<p className="card-desc">Define skills, set requirements, and lead a team. [cite: 13]</p>
          <button className="btn-primary">+ New Project</button>
        </div>

        <div className="info-card">
          <h3 className="card-title">Active Workspace</h3>
          [cite_start]<p className="card-desc">Access your current projects, dashboards, and chats. [cite: 16]</p>
          <ul style={{ paddingLeft: "20px", color: "#94a3b8" }}>
            <li>Solar Energy Tool (Leader)</li>
            <li>Global Edu Platform (Member)</li>
          </ul>
        </div>

        {/* Tools Section */}
        <div className="info-card" style={{ gridColumn: "span 2" }}>
          <h3 className="card-title">Collaboration Tools</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            [cite_start]<span className="user-pill">🎥 Video Call (Subtitles) [cite: 19]</span>
            [cite_start]<span className="user-pill">💬 Team Chat (AI Bot) [cite: 21]</span>
            [cite_start]<span className="user-pill">📂 Discussions [cite: 20]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="dashboard-grid">
      <div className="info-card">
        <h3 className="card-title">Search Courses</h3>
        [cite_start]<p className="card-desc">Find global courses to acquire new skills. [cite: 28]</p>
        <input className="input-field" placeholder="Search (e.g., Python, React)..." />
      </div>

      <div className="info-card">
        <h3 className="card-title">Live Classes</h3>
        [cite_start]<p className="card-desc">Synchronous sessions with real-time subtitles. [cite: 30]</p>
        <button className="btn-primary">View Schedule</button>
      </div>

      <div className="info-card">
        <h3 className="card-title">Teach</h3>
        [cite_start]<p className="card-desc">Upload content or host a class to share expertise. [cite: 34]</p>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="dashboard-grid">
      <div className="info-card">
        <h3 className="card-title">M. Siddhartha Reddy</h3>
        <p className="card-desc">Full Stack Developer • India</p>
        <div style={{ display: "flex", gap: "10px" }}>
           <div style={{ textAlign: "center" }}>
              <h2>120</h2>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Followers</span>
           </div>
           <div style={{ textAlign: "center" }}>
              <h2>85</h2>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Following</span>
           </div>
        </div>
      </div>

      {/* TRUST POINTS HIGHLIGHT */}
      <div className="info-card" style={{ borderColor: "#3b82f6" }}>
        [cite_start]<h3 className="card-title" style={{ color: "#3b82f6" }}>Trust Points [cite: 45]</h3>
        <h1 style={{ fontSize: "3rem", margin: "10px 0" }}>4.8</h1>
        <p className="card-desc">
          Verified by peer feedback from 5 completed projects.
        </p>
      </div>

      <div className="info-card" style={{ gridColumn: "span 2" }}>
        [cite_start]<h3 className="card-title">Skill Slots [cite: 43]</h3>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
          {["React", "Node.js", "Teamwork", "Public Speaking"].map(skill => (
            <span key={skill} className="user-pill" style={{ background: "#0f172a" }}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;