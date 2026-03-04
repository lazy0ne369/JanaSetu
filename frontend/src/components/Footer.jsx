import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 19 7 19 17 12 22 5 17 5 7" />
                        </svg>
                        <span style={{ fontWeight: 800 }}>JanaSetu <span style={{ color: 'var(--cyan)' }}>AI</span></span>
                    </div>
                    <p className="footer-tagline">
                        Bridging the gap between citizens and government welfare through deterministic intelligence.
                    </p>
                </div>

                <div className="footer-links-group">
                    <div className="footer-column">
                        <h4>Platform</h4>
                        <Link to="/dashboard">Scheme Scanner</Link>
                        <Link to="/about">System Architecture</Link>
                        <Link to="/#how-it-works">How It Works</Link>
                    </div>

                    <div className="footer-column">
                        <h4>Legal & Open Source</h4>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                        <Link to="/about">Documentation</Link>
                        <Link to="/login">Operator Login</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} JanaSetu AI. Built for the AI for Bharat Hackathon powered by AWS.
                </div>
                <div className="footer-badges">
                    <span className="mono status-badge"><span className="status-dot"></span>SYS.ONLINE</span>
                </div>
            </div>
        </footer>
    );
}
