import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import ProfileConsole from '../components/ProfileConsole';
import ProcessingOverlay from '../components/ProcessingOverlay';
import SchemeCard from '../components/SchemeCard';
import { matchSchemes } from '../services/api';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [schemes, setSchemes] = useState(null);
    const [error, setError] = useState(null);

    const handleScan = async (profile) => {
        setLoading(true);
        setError(null);
        setSchemes(null);

        try {
            // Add deliberate 1.5s delay to show loading animation
            const [data] = await Promise.all([
                matchSchemes(profile),
                new Promise((resolve) => setTimeout(resolve, 1500))
            ]);
            setSchemes(data.matched_schemes);
        } catch (err) {
            setError(err.message || 'Failed to fetch schemes');
        } finally {
            setLoading(false);
        }
    };

    // Calculate average score for the overall bar
    const topScore = schemes && schemes.length > 0 ? schemes[0].eligibility_score : 0;

    // Overall bar color based on top score
    let overallColor = '#ff4d6d'; // Red
    let overallGlow = 'rgba(255,77,109,0.5)';

    if (topScore >= 80) {
        overallColor = '#00dcff'; // Cyan
        overallGlow = 'rgba(0,220,255,0.6)';
    } else if (topScore >= 50) {
        overallColor = '#a259ff'; // Purple
        overallGlow = 'rgba(162,89,255,0.5)';
    }

    return (
        <main className="main-grid">
            {/* Left Panel: Form */}
            <div className="left-panel">
                <ProfileConsole onScan={handleScan} loading={loading} />
            </div>

            {/* Right Panel: Results */}
            <div className="right-panel">
                <AnimatePresence>
                    {loading && <ProcessingOverlay />}
                </AnimatePresence>

                <motion.div
                    className="panel" style={{ height: '100%' }}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
                >
                    <h2 className="results-title">Top Schemes for You</h2>

                    {/* Idle State */}
                    {!schemes && !loading && !error && (
                        <div className="idle-state">
                            <div className="idle-icon">⬡</div>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-1)' }}>Ready to Scan</h3>
                            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', maxWidth: '300px' }}>
                                Adjust your profile parameters on the left and click "Find Schemes" to discover matching government programs.
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="idle-state">
                            <div className="idle-icon" style={{ borderColor: 'var(--red)', color: 'var(--red)', background: 'var(--red-dim)' }}>!</div>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--red)' }}>Error connecting to server</h3>
                            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>{error}</p>
                        </div>
                    )}

                    {/* No Results */}
                    {schemes && schemes.length === 0 && !loading && (
                        <div className="idle-state">
                            <div className="idle-icon" style={{ borderColor: 'var(--purple)', color: 'var(--purple)', background: 'var(--purple-dim)' }}>0</div>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-1)' }}>No Matches Found</h3>
                            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', maxWidth: '300px' }}>
                                We couldn't find any schemes matching your current profile parameters. Try adjusting age, income, or category.
                            </p>
                        </div>
                    )}

                    {/* Results List */}
                    {schemes && schemes.length > 0 && !loading && (
                        <div className="results-list">
                            {schemes.map((scheme, i) => (
                                <SchemeCard
                                    key={scheme.scheme_id}
                                    scheme={scheme}
                                    index={i}
                                    onClick={() => { }} // Modal intentionally omitted for concise layout matching
                                />
                            ))}

                            {/* Overall Score Section matching the bottom component in reference */}
                            <motion.div
                                className="overall-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: Math.min(schemes.length * 0.06 + 0.2, 0.6) }}
                            >
                                <div className="overall-label">
                                    <span>Overall Match Score</span>
                                    <span className="overall-num" style={{ color: overallColor }}>{topScore}</span>
                                </div>

                                <div className="overall-bar-track">
                                    <motion.div
                                        className="overall-bar-fill"
                                        style={{ background: overallColor, boxShadow: `0 0 12px ${overallGlow}` }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${topScore}%` }}
                                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                                    />
                                    <motion.div
                                        className="overall-bar-marker"
                                        initial={{ left: 0, opacity: 0 }}
                                        animate={{ left: `calc(${topScore}% - 1px)`, opacity: 1 }}
                                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                                    />
                                </div>

                                <div className="action-row">
                                    <button className="btn-outline">View Details</button>
                                    <button className="btn-filled">Explain Simply</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
