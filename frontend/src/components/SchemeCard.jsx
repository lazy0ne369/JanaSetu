import { motion } from 'framer-motion';
import ScoreBar from './ScoreBar';

/** CSS-gradient scheme thumbnails — no images needed */
const THUMB_STYLES = [
    { bg: 'linear-gradient(135deg,#0a4a6e 0%,#0d2137 100%)', emoji: '🌾' },
    { bg: 'linear-gradient(135deg,#1a1060 0%,#0d0d2a 100%)', emoji: '🚀' },
    { bg: 'linear-gradient(135deg,#3a0a50 0%,#150520 100%)', emoji: '🌸' },
    { bg: 'linear-gradient(135deg,#0a3020 0%,#050f0a 100%)', emoji: '⚡' },
    { bg: 'linear-gradient(135deg,#4a2000 0%,#1a0a00 100%)', emoji: '🎓' },
];

function getScoreColor(score) {
    if (score >= 80) return { color: 'var(--cyan)', glow: 'rgba(0,220,255,0.3)' };
    if (score >= 50) return { color: 'var(--purple)', glow: 'rgba(162,89,255,0.3)' };
    return { color: 'var(--red)', glow: 'rgba(255,77,109,0.3)' };
}

function formatCurrency(amount) {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} Lakh`;
    if (amount >= 1000) return `₹${amount.toLocaleString('en-IN')}`;
    return `₹${amount}`;
}

export default function SchemeCard({ scheme, index, onClick }) {
    const thumb = THUMB_STYLES[index % THUMB_STYLES.length];
    const { color, glow } = getScoreColor(scheme.eligibility_score);

    return (
        <motion.div
            className="scheme-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
            onClick={() => onClick(scheme)}
        >
            {/* Thumbnail */}
            <div className="scheme-thumb" style={{ background: thumb.bg }}>
                <span style={{ fontSize: '1.5rem' }}>{thumb.emoji}</span>
            </div>

            {/* Info */}
            <div className="scheme-info">
                <div className="scheme-name">{scheme.scheme_name}</div>
                <div className="scheme-deadline">
                    <span>Deadline: </span>{scheme.deadline}
                </div>
                <ScoreBar score={scheme.eligibility_score} />
            </div>

            {/* Meta */}
            <div className="scheme-meta">
                <div className="scheme-amount">{formatCurrency(scheme.benefit_amount)}</div>
                <div>
                    <span className="scheme-type-tag">Grant</span>
                </div>
                <div
                    className="scheme-score-num"
                    style={{ color, textShadow: `0 0 10px ${glow}` }}
                >
                    {scheme.eligibility_score}
                </div>
            </div>
        </motion.div>
    );
}
