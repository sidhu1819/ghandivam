import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">G</div>
          <div>
            <div className="brand-title">GlobalCollab</div>
            <div className="brand-subtitle">
              Global Collaborative Learning & Projects
            </div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={page === "home" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            className={page === "projects" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("projects")}
          >
            My Projects
          </button>
          <button
            className={page === "skills" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("skills")}
          >
            Skill Learning
          </button>
          <button
            className={page === "profile" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("profile")}
          >
            Profile
          </button>
          <button
            className={page === "feedback" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("feedback")}
          >
            Peer Feedback
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        {page === "home" && <HomeSection />}
        {page === "projects" && <ProjectsSection />}
        {page === "skills" && <SkillsSection />}
        {page === "profile" && <ProfileSection />}
        {page === "feedback" && <FeedbackSection />}
      </main>
    </div>
  );
}

/* HOME SECTION */
function HomeSection() {
  return (
    <section className="section">
      <div className="badge">🏠 Home Page • Discovery Hub</div>
      <h2>Discover Projects, Skills, and Global Teammates</h2>
      <p className="desc">
        This is the entry point for all users. It acts as a central dashboard
        that connects you to projects, skills, and your profile identity.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>Dynamic Discovery Area</h3>
          <p>
            The home page highlights what matters{" "}
            <span className="highlight">right now</span>:
          </p>
          <ul className="list">
            <li>Rotating list of projects actively seeking members</li>
            <li>Community announcements and opportunities</li>
            <li>
              Clear actions: <b>Join Projects</b> or <b>Enroll in Courses</b>
            </li>
          </ul>
          <button className="btn">Explore Projects</button>
        </div>

        <div className="card">
          <h3>Sample “Live Now” Projects</h3>
          <p className="small">Static demo for hackathon pitch.</p>
          <div className="pill">AI • Collaboration</div>
          <p className="small">
            <b>AI-Powered Peer Feedback System</b> – React, Node, Firebase • 3
            members needed
          </p>
          <div className="pill">EdTech • Global</div>
          <p className="small">
            <b>Global Collaborative Learning Hub</b> – UI/UX, APIs, Cloud • 2
            members needed
          </p>
        </div>
      </div>
    </section>
  );
}

/* PROJECTS SECTION */
function ProjectsSection() {
  return (
    <section className="section">
      <div className="badge">🧩 My Projects • Collaboration Engine</div>
      <h2>Manage Your Projects from Creation to Evaluation</h2>
      <p className="desc">
        This area handles project marketplace, registered projects, collaboration
        tools, and peer feedback with trust points.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>Project Marketplace</h3>
          <p className="small">
            Users can create projects or apply to join others.
          </p>
          <ul className="list">
            <li>Define project, set required skills</li>
            <li>Leader reviews and approves candidates</li>
            <li>Search / filter projects by skills or domain</li>
          </ul>
          <button className="btn">+ Create Project (UI only)</button>
        </div>

        <div className="card">
          <h3>Projects Registered • Active Workspace</h3>
          <p className="small">Once approved, projects move here.</p>
          <ul className="list">
            <li>Project dashboard with milestones and task tracking</li>
            <li>
              Live video calls with real-time subtitles (future AI integration)
            </li>
            <li>
              Virtual discussion rooms for async conversation across time zones
            </li>
            <li>
              Common team chat with AI bot (summaries, translation, FAQs)
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>Post-Completion Flow • Peer Feedback System</h3>
        <ul className="list">
          <li>Teammates rate each other on professionalism, quality, and communication</li>
          <li>Ratings are converted into Trust Points automatically</li>
          <li>
            Trust Points are pushed to the user&apos;s profile as a reliability
            metric
          </li>
        </ul>
      </div>
    </section>
  );
}

/* SKILL LEARNING SECTION */
function SkillsSection() {
  return (
    <section className="section">
      <div className="badge">📚 Skill Learning • Knowledge Center</div>
      <h2>Learn, Teach, and Earn Credentials</h2>
      <p className="desc">
        Internal LMS for live classes with subtitles, documents, and user-created content.
      </p>

      <div className="card">
        <h3>Search Courses</h3>
        <p className="small">Demo search bar (no backend yet).</p>
        <div className="form-row">
          <label>
            <span>Search Skill</span>
            <input placeholder="e.g. React, ML, Public Speaking" />
          </label>
        </div>
        <button className="btn btn-secondary">Search (Demo)</button>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Live Classes with Subtitles</h3>
          <ul className="list">
            <li>Experts host live interactive sessions</li>
            <li>AI speech-to-text subtitles remove language barriers</li>
            <li>Reusable session recordings and notes</li>
          </ul>
        </div>

        <div className="card">
          <h3>Content Contribution & Certification</h3>
          <ul className="list">
            <li>Users upload notes and tutorials</li>
            <li>Apply to host live classes</li>
            <li>Certificates of completion issued for finished courses</li>
            <li>Skills and credentials auto-updated into Profile</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* PROFILE SECTION */
function ProfileSection() {
  return (
    <section className="section">
      <div className="badge">👤 Profile • Identity & Portfolio</div>
      <h2>Your Verifiable Global Identity</h2>
      <p className="desc">
        The profile is a living portfolio with skills, completed projects, and trust points.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>Core Information</h3>
          <p className="small">
            <b>Name:</b> M. Siddhartha Reddy
          </p>
          <p className="small">
            <b>Followers / Following:</b> 120 / 85 (demo)
          </p>
          <p className="small">
            <b>Overall Progress:</b> 5 completed projects, 3 skills certified
          </p>
        </div>

        <div className="card">
          <h3>Trust Points (from Peer Feedback)</h3>
          <p className="small">
            Transparent score representing your reliability and collaboration quality.
          </p>
          <div className="stat-value">4.5</div>
          <p className="small">
            Used by team leaders and collaborators to select trusted teammates.
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Skill Slots</h3>
        <div className="tag-row">
          <span className="tag">React</span>
          <span className="tag">Node.js</span>
          <span className="tag">Firebase</span>
          <span className="tag">Team Collaboration</span>
        </div>
      </div>

      <div className="card">
        <h3>Completed Projects Links</h3>
        <ul className="list">
          <li>AI-based Peer Feedback System</li>
          <li>Global Collaborative Learning Platform</li>
          <li>Solar Energy Estimation Tool</li>
        </ul>
        <p className="small">
          In a real system, each project links to case studies or GitHub repos.
        </p>
      </div>
    </section>
  );
}

/* FEEDBACK SECTION */
function FeedbackSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "In a full version, this feedback would be saved and converted into Trust Points!"
    );
  };

  return (
    <section className="section">
      <div className="badge">⭐ Peer Feedback • Trust Engine</div>
      <h2>Peer Feedback Demo</h2>
      <p className="desc">
        Teammates evaluate each other on professionalism, quality, and communication.
        The average becomes Trust Points.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>Feedback Form (UI only)</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Teammate Name
                <select>
                  <option>Harshit</option>
                  <option>Ch. Durga Prasad</option>
                  <option>M. Siddhartha Reddy</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Professionalism (1–5)
                <input type="number" min="1" max="5" defaultValue="5" />
              </label>
              <label>
                Quality of Work (1–5)
                <input type="number" min="1" max="5" defaultValue="5" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Communication (1–5)
                <input type="number" min="1" max="5" defaultValue="5" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Comment
                <textarea placeholder="Great ownership, clear communication..." />
              </label>
            </div>
            <button className="btn" type="submit">
              Submit Feedback (Demo)
            </button>
          </form>
        </div>

        <div className="card">
          <h3>How Trust Points Work</h3>
          <ul className="list">
            <li>Each teammate rates others on 3 criteria.</li>
            <li>System calculates an average score (1–5).</li>
            <li>
              Scores from different projects are combined into final{" "}
              <b>Trust Points</b>.
            </li>
            <li>
              Trust Points are displayed on the Profile and impact selection for
              future teams.
            </li>
          </ul>
          <p className="small">
            In the full version, this data is stored in the database and updated
            to the profile in real time.
          </p>
        </div>
      </div>
    </section>
  );
}

/* SMALL PRESENTATION CSS IN JS FILE */
export default App;
