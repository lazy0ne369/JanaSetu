import { useState } from 'react';
import { motion } from 'framer-motion';

const STATES = [
    'All', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
];

const EDUCATIONS = ['Any', '5th Pass', '8th Pass', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate'];
const CATEGORIES = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'];
const GENDERS = ['All', 'Male', 'Female', 'Other'];
const OCCUPATIONS = ['All', 'Farmer', 'Student', 'Business', 'Salaried', 'Self-Employed', 'Unemployed', 'Retired'];

const defaultProfile = {
    age: 32, income: 500000, state: 'Maharashtra',
    education: 'Graduate', category: 'OBC',
    gender: 'Male', occupation: 'Salaried', disability: false,
};

function Row({ label, children }) {
    return (
        <div className="form-row">
            <label className="form-label">{label}</label>
            {children}
        </div>
    );
}

export default function ProfileConsole({ onScan, loading }) {
    const [p, setP] = useState(defaultProfile);
    const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onScan({ ...p, age: Number(p.age), income: Number(p.income), disability: Boolean(p.disability) });
    };

    return (
        <motion.div
            className="panel"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
        >
            <div className="panel-header">
                <span className="panel-header-icon">—</span>
                Profile Input
            </div>

            <form onSubmit={handleSubmit}>
                <Row label="Age">
                    <input
                        className="form-control"
                        type="number" min={0} max={100}
                        value={p.age}
                        onChange={(e) => set('age', e.target.value)}
                        required
                    />
                </Row>

                <Row label="Annual Income (Rs)">
                    <input
                        className="form-control"
                        type="number" min={0}
                        value={p.income}
                        onChange={(e) => set('income', e.target.value)}
                        required
                    />
                </Row>

                <Row label="State">
                    <select className="form-control" value={p.state} onChange={(e) => set('state', e.target.value)}>
                        {STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                </Row>

                <Row label="Education">
                    <select className="form-control" value={p.education} onChange={(e) => set('education', e.target.value)}>
                        {EDUCATIONS.map((e) => <option key={e}>{e}</option>)}
                    </select>
                </Row>

                <Row label="Category">
                    <select className="form-control" value={p.category} onChange={(e) => set('category', e.target.value)}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </Row>

                <Row label="Gender">
                    <select className="form-control" value={p.gender} onChange={(e) => set('gender', e.target.value)}>
                        {GENDERS.map((g) => <option key={g}>{g}</option>)}
                    </select>
                </Row>

                <Row label="Occupation">
                    <select className="form-control" value={p.occupation} onChange={(e) => set('occupation', e.target.value)}>
                        {OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                </Row>

                {/* Disability toggle row */}
                <div className="form-row" style={{ borderBottom: 'none' }}>
                    <label className="form-label">Disability</label>
                    <div className="toggle-wrapper">
                        <span className="toggle-label-val" style={{ color: p.disability ? 'var(--cyan)' : 'var(--text-2)' }}>
                            {p.disability ? 'Yes' : 'No'}
                        </span>
                        <button
                            type="button"
                            className="toggle"
                            style={{ background: p.disability ? 'var(--cyan)' : 'rgba(255,255,255,0.15)' }}
                            onClick={() => set('disability', !p.disability)}
                            aria-label="Toggle disability"
                        >
                            <span
                                className="toggle-thumb"
                                style={{ left: p.disability ? '21px' : '3px' }}
                            />
                        </button>
                    </div>
                </div>

                <button type="submit" className="find-btn" disabled={loading}>
                    {loading ? 'Scanning…' : 'Find Schemes'}
                </button>
            </form>
        </motion.div>
    );
}
