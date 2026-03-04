import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [passkey, setPasskey] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!passkey) return;

        setError('');
        setIsAuthenticating(true);

        setTimeout(() => {
            if (passkey === '0000') {
                localStorage.setItem('janasetuAuth', 'true');
                navigate('/dashboard');
            } else {
                setError('ACCESS DENIED: INVALID PASSKEY');
                setIsAuthenticating(false);
                setPasskey('');
            }
        }, 1200);
    };

    return (
        <div className="page-container">
            <motion.div
                className="login-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="login-icon"
                    animate={isAuthenticating ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </motion.div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 0.5rem 0', color: 'white' }}>Operator Login</h2>
                <p className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: '2rem' }}>SECURE TERMINAL ACCESS</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--cyan)', textAlign: 'left', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        ENTER PASSKEY
                    </label>
                    <input
                        type="password"
                        value={passkey}
                        onChange={(e) => {
                            setPasskey(e.target.value);
                            setError('');
                        }}
                        className="login-input"
                        placeholder="••••••••"
                        autoFocus
                        disabled={isAuthenticating}
                        style={error ? { borderColor: 'var(--red)', boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 77, 109, 0.3)' } : {}}
                    />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mono"
                            style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '-1rem', marginBottom: '1rem', letterSpacing: '0.05em' }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="btn-filled"
                        disabled={isAuthenticating || !passkey}
                        style={{
                            padding: '1rem',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            opacity: (isAuthenticating || !passkey) ? 0.5 : 1,
                            cursor: (isAuthenticating || !passkey) ? 'not-allowed' : 'pointer',
                            boxShadow: '0 0 20px var(--cyan-dim)'
                        }}
                    >
                        {isAuthenticating ? 'Authenticating...' : 'Initialize Access'}
                    </button>
                </form>

                <div className="login-status-bar">
                    <span>STATUS: <span style={{ color: isAuthenticating ? 'var(--cyan)' : 'inherit' }}>{isAuthenticating ? 'VERIFYING' : 'AWAITING_INPUT'}</span></span>
                    <span>NODE: SECURE-01</span>
                </div>
            </motion.div>
        </div>
    );
}
