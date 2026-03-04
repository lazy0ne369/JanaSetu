import { motion } from 'framer-motion';

/**
 * Compact horizontal score bar used inside scheme cards.
 */
export default function ScoreBar({ score, animate = true }) {
    const getColor = () => {
        if (score >= 80) return { fill: '#00dcff', glow: 'rgba(0,220,255,0.6)', text: 'var(--cyan)' };
        if (score >= 50) return { fill: '#a259ff', glow: 'rgba(162,89,255,0.5)', text: 'var(--purple)' };
        return { fill: '#ff4d6d', glow: 'rgba(255,77,109,0.5)', text: 'var(--red)' };
    };
    const { fill, glow, text } = getColor();

    return (
        <div className="card-bar-track">
            <motion.div
                className="card-bar-fill"
                style={{ background: fill, boxShadow: `0 0 6px ${glow}`, width: `${score}%` }}
                initial={animate ? { width: 0 } : false}
                animate={animate ? { width: `${score}%` } : undefined}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            />
        </div>
    );
}
