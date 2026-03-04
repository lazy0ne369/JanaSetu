import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="landing-page">
            {/* HERO SECTION */}
            <section className="hero-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="home-hero"
                >
                    <div className="hero-icon-wrapper mx-auto">
                        <div className="hero-icon-glow"></div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className="hero-icon-inner"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <polygon points="12 2 19 7 19 17 12 22 5 17 5 7" />
                                <line x1="12" y1="2" x2="12" y2="22" strokeOpacity="0.5" />
                                <line x1="5" y1="7" x2="19" y2="17" strokeOpacity="0.5" />
                                <line x1="19" y1="7" x2="5" y2="17" strokeOpacity="0.5" />
                            </svg>
                        </motion.div>
                    </div>

                    <h1 className="home-title">
                        Empowering Citizens with <span className="home-title-highlight">AI</span>
                    </h1>

                    <p className="home-subtitle mx-auto">
                        JanaSetu AI bridges the gap between citizens and government welfare schemes. Using advanced deterministic matching algorithms, our platform ensures every individual finds the benefits they rightfully deserve.
                    </p>

                    <div className="home-actions">
                        <Link to="/dashboard" className="btn-filled btn-large" style={{ textDecoration: 'none' }}>
                            <span className="mono">Launch Dashboard</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>

                        <Link to="/about" className="btn-outline btn-large" style={{ textDecoration: 'none' }}>
                            Learn More
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* IMPACT STATS SECTION */}
            <section className="stats-section">
                <div className="stats-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="stat-card"
                    >
                        <h3 className="stat-number" style={{ color: 'var(--cyan)' }}>150+</h3>
                        <p className="stat-label">Government Schemes</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="stat-card"
                    >
                        <h3 className="stat-number" style={{ color: 'var(--purple)' }}>&lt;2s</h3>
                        <p className="stat-label">Match Latency</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="stat-card"
                    >
                        <h3 className="stat-number" style={{ color: 'var(--gold)' }}>100%</h3>
                        <p className="stat-label">Deterministic Accuracy</p>
                    </motion.div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="how-it-works-section" id="how-it-works">
                <div className="section-header">
                    <h2>How It Works</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="steps-container">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="step-card"
                    >
                        <div className="step-number" style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}>01</div>
                        <h3>Input Profile Data</h3>
                        <p>Provide basic demographic indicators like age, income, and state. Our platform does not collect PII.</p>
                    </motion.div>

                    <div className="step-connector"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="step-card"
                    >
                        <div className="step-number" style={{ borderColor: 'var(--purple)', color: 'var(--purple)' }}>02</div>
                        <h3>Engine Evaluation</h3>
                        <p>The FastMatch algorithm calculates eligibility scores deterministically against a unified scheme ruleset.</p>
                    </motion.div>

                    <div className="step-connector"></div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="step-card"
                    >
                        <div className="step-number" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>03</div>
                        <h3>Discover Benefits</h3>
                        <p>Receive ordered, hyper-relevant scheme cards detailing benefit amounts, deadlines, and direct application routes.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
