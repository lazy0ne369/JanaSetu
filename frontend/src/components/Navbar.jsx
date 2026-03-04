import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

/** Diamond/hexagon logo SVG */
function LogoIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 19 7 19 17 12 22 5 17 5 7" />
            <line x1="12" y1="2" x2="12" y2="22" strokeOpacity="0.5" />
            <line x1="5" y1="7" x2="19" y2="17" strokeOpacity="0.5" />
            <line x1="19" y1="7" x2="5" y2="17" strokeOpacity="0.5" />
        </svg>
    );
}

export default function Navbar() {
    const location = useLocation();
    const isAuth = localStorage.getItem('janasetuAuth') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('janasetuAuth');
        // Force reload to clear state and redirect properly
        window.location.href = '/login';
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {/* Logo */}
            <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
                <LogoIcon />
                <span>Jana<span style={{ color: 'var(--cyan)' }}>Setu</span> AI</span>
            </Link>

            {/* Nav links + Login */}
            <div className="navbar-links">
                <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
                <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>About</Link>

                {isAuth && (
                    <Link to="/dashboard" className={`nav-link${location.pathname === '/dashboard' ? ' active' : ''}`}>Dashboard</Link>
                )}

                {isAuth ? (
                    <button onClick={handleLogout} className="login-btn" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid var(--border)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="login-btn" style={{ textDecoration: 'none' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Login
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}
