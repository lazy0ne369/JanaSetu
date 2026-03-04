import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';

export default function ProcessingOverlay() {
    const ringsRef = useRef(null);

    useEffect(() => {
        animate('.spinner-ring', {
            rotate: '1turn',
            duration: 1200,
            ease: 'linear',
            loop: true,
            delay: (el, i) => i * 150,
        });
    }, []);

    return (
        <motion.div
            className="processing-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative flex items-center justify-center" style={{ width: '80px', height: '80px' }} ref={ringsRef}>
                <div className="spinner-ring" style={{ width: '80px', height: '80px', borderTopColor: 'var(--cyan)' }} />
                <div className="spinner-ring" style={{ width: '60px', height: '60px', borderRightColor: 'var(--purple)', animationDirection: 'reverse' }} />
                <div className="spinner-ring" style={{ width: '40px', height: '40px', borderBottomColor: 'var(--cyan)' }} />
                <div style={{ width: '8px', height: '8px', background: 'var(--text-1)', borderRadius: '50%', boxShadow: '0 0 10px white' }} />
            </div>
            <div className="mono text-center" style={{ color: 'var(--cyan)', letterSpacing: '0.1em' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>ANALYZING ELIGIBILITY</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>Matching 120+ database schemes...</p>
            </div>
        </motion.div>
    );
}
