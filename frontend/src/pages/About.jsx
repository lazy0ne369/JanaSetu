import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="page-container">
            <motion.div
                className="about-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="about-header">
                    <div className="about-header-icon">#</div>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>System Architecture</h2>
                        <p className="mono" style={{ color: 'var(--cyan)', fontSize: '0.85rem', marginTop: '0.25rem', letterSpacing: '0.05em' }}>JanaSetu v1.0.0 // AI-Powered Engine</p>
                    </div>
                </div>

                <div className="about-grid">
                    <div className="about-text">
                        <p className="lead" style={{ fontWeight: '500' }}>
                            JanaSetu AI translates complex eligibility matrices into a seamless, deterministic matching engine.
                        </p>
                        <p>
                            The platform addresses a critical gap: millions of citizens miss out on eligible government schemes due to convoluted requirements. Our engine evaluates discrete data points against unified scheme rulesets to assure zero-hallucination matches.
                        </p>
                        <div style={{ paddingTop: '1rem', marginTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-3)', fontStyle: 'italic', margin: 0 }}>
                                "Designed for the AI for Bharat Hackathon with a focus on performant, predictable intelligence."
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="tech-stack-title">
                            <span className="tech-stack-dot"></span>
                            Tech Stack Matrix
                        </div>

                        <div className="tech-stack-card tech-frontend">
                            <div className="tech-tag" style={{ color: 'var(--cyan)' }}>FRONTEND.LAYER</div>
                            <div className="tech-title">React + Vite + Tailwind</div>
                            <div className="tech-desc">Framer Motion, Anime.js UI</div>
                        </div>

                        <div className="tech-stack-card tech-backend">
                            <div className="tech-tag" style={{ color: 'var(--purple)' }}>BACKEND.CORE</div>
                            <div className="tech-title">Python FastAPI Engine</div>
                            <div className="tech-desc">Deterministic Scoring algorithms</div>
                        </div>

                        <div className="tech-stack-card tech-infra">
                            <div className="tech-tag" style={{ color: 'var(--gold)' }}>INFRA.PLANNED</div>
                            <div className="tech-title">AWS Bedrock + DynamoDB</div>
                            <div className="tech-desc">Cloud-native deployment</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
