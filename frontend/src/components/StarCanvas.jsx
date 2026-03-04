import { useEffect, useRef } from 'react';

/**
 * Animated background canvas for space effect.
 */
export default function StarCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Scale for HDPI displays
        const dpr = window.devicePixelRatio || 1;
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Create stars
        const stars = Array.from({ length: 150 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.2 + 0.05,
        }));

        let animationFrameId;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(s => {
                // Move star up
                s.y -= s.speed;
                if (s.y < 0) {
                    s.y = height;
                    s.x = Math.random() * width;
                }

                // Pulse opacity slightly
                const currentOpacity = s.opacity + Math.sin(Date.now() * 0.001 * s.speed) * 0.2;

                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, currentOpacity)})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();

                // Add subtle glow to larger stars
                if (s.size > 1.2) {
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'rgba(0, 220, 255, 0.4)';
                } else {
                    ctx.shadowBlur = 0;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Handle resize
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas id="star-canvas" ref={canvasRef} />;
}
