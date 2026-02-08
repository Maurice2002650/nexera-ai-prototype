import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import prototypes
import AssetGenerator from './pages/AssetGenerator';
import Avatar from './pages/AiAvatar';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0F172A' }}>
        <nav style={styles.nav}>
          <div style={styles.navContent}>
            <h1 style={styles.logo}>NexEra AI Challenge</h1>
            <div style={styles.navLinks}>
              <Link to="/" style={styles.link}>
                🔧 Prototype 1: 3D Asset Pipeline
              </Link>
              <Link to="/avatar" style={styles.link}>
                🤖 Prototype 2: AI Avatar
              </Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<AssetGenerator />} />
          <Route path="/avatar" element={<Avatar />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: '#1E293B',
    padding: '15px 0',
    borderBottom: '2px solid #334155'
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    margin: 0,
    color: '#60A5FA',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: '#CBD5E1',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#334155',
    fontWeight: '600',
    transition: 'all 0.2s'
  }
};

export default App;