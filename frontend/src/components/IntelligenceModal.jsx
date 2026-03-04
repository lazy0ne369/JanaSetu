import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal that shows full scheme details.
 * "Explain Simply" generates a plain-language summary from the description.
 * This is a mock — will be replaced with AWS Bedrock in Phase 3.
 */
export default function IntelligenceModal({ scheme, onClose }) {
    if (!scheme) return null;

    // Mock plain-English explanation derived from the description
    const simplifiedExplanation = `This scheme is called "${scheme.scheme_name}". ${scheme.description} You can receive up to ₹${scheme.benefit_amount.toLocaleString('en-IN')} in benefits. The deadline to apply is ${scheme.deadline}. Make sure to gather your documents and apply before the deadline.`;

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center p-4"
                style={{ background: 'rgba(5,11,20,0.85)', backdropFilter: 'blur(4px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Modal panel */}
                <motion.div
                    className="console-card relative w-full max-w-lg p-6 z-50"
                    style={{ borderColor: 'rgba(0,245,255,0.2)' }}
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 24 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 font-mono text-xs px-2 py-1 rounded"
                        style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        ✕ CLOSE
                    </button>

                    {/* Header */}
                    <p className="font-mono text-xs mb-1" style={{ color: '#00f5ff' }}>
                        ◈ SCHEME INTELLIGENCE
                    </p>
                    <h2 className="text-lg font-bold leading-snug mb-4" style={{ color: 'var(--text-primary)' }}>
                        {scheme.scheme_name}
                    </h2>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                            { label: 'BENEFIT', value: `₹${scheme.benefit_amount.toLocaleString('en-IN')}` },
                            { label: 'DEADLINE', value: scheme.deadline },
                            { label: 'SCORE', value: `${scheme.eligibility_score}/100` },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="rounded-lg px-3 py-2"
                                style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.1)' }}
                            >
                                <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                                <p className="font-mono text-sm font-semibold" style={{ color: '#00f5ff' }}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-muted)' }}>DESCRIPTION</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                            {scheme.description}
                        </p>
                    </div>

                    {/* Documents placeholder */}
                    <div
                        className="rounded-lg px-3 py-3 mb-4"
                        style={{ background: 'rgba(168,85,247,0.06)', border: '1px dashed rgba(168,85,247,0.25)' }}
                    >
                        <p className="font-mono text-xs mb-1" style={{ color: '#a855f7' }}>DOCUMENTS REQUIRED</p>
                        <ul className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                            <li>• Aadhaar Card</li>
                            <li>• Income Certificate</li>
                            <li>• Bank Passbook (first page)</li>
                            <li>• Category Certificate (if applicable)</li>
                        </ul>
                    </div>

                    {/* Explain Simply */}
                    <details className="group">
                        <summary
                            className="font-mono text-xs cursor-pointer select-none flex items-center gap-2 mb-2"
                            style={{ color: '#00f5ff' }}
                        >
                            <span className="group-open:rotate-90 inline-block transition-transform duration-200">▶</span>
                            EXPLAIN SIMPLY
                            <span
                                className="ml-auto text-xs px-1.5 py-0.5 rounded font-mono"
                                style={{ background: 'rgba(0,245,255,0.08)', color: 'var(--text-muted)' }}
                            >
                                MOCK · AWS Bedrock in Phase 3
                            </span>
                        </summary>
                        <p className="text-sm leading-relaxed p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', color: '#cbd5e1' }}>
                            {simplifiedExplanation}
                        </p>
                    </details>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
