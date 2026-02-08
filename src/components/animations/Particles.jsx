import { useRef, useEffect, useCallback, useMemo } from 'react';

const Particles = ({
    color = '#0066FF',
    density = 50,
    speed = 1,
    opacity = 0.4,
    connectDistance = 0,  // Set > 0 to enable connection lines
    isMobile = false
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    // Memoize particle config for performance
    const config = useMemo(() => ({
        // Mobile: User requested "moving glowing particles"
        particleSpeed: isMobile ? speed * 0.8 : speed * 0.4,
        particleOpacity: isMobile ? opacity : opacity * 0.6,
        minSize: isMobile ? 2 : 1,
        maxSize: isMobile ? 5 : 3,
        glowEnabled: isMobile, // Disable expensive glow on desktop for performance
    }), [speed, opacity, isMobile]);

    const initParticles = useCallback((canvas) => {
        const particles = [];
        for (let i = 0; i < density; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * (config.maxSize - config.minSize) + config.minSize,
                // Very slow, gentle movement for premium feel
                speedX: (Math.random() - 0.5) * config.particleSpeed,
                speedY: (Math.random() - 0.5) * config.particleSpeed,
                // Slight pulsing effect
                pulseOffset: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.01,
            });
        }
        return particles;
    }, [density, config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        let lastWidth = window.innerWidth;

        const resize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // On mobile, height changes frequently due to address bar (hiding/showing).
            // We only re-initialize particles if the width changes significantly.
            const widthChanged = Math.abs(width - lastWidth) > 50;

            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);

            if (widthChanged || particlesRef.current.length === 0) {
                particlesRef.current = initParticles(canvas);
                lastWidth = width;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const animate = (currentTime) => {
            animationRef.current = requestAnimationFrame(animate);

            // Throttle to target FPS for consistent performance
            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;
            lastTime = currentTime - (deltaTime % frameInterval);

            const width = window.innerWidth;
            const height = window.innerHeight;

            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;
            const time = currentTime * 0.001; // Convert to seconds

            // Draw particles
            particles.forEach((p, index) => {
                // Update position with very slow movement
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around edges smoothly
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                // Gentle pulsing size effect
                const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset);
                const currentSize = p.size + pulse * 0.3;

                // Optimization: Only use shadowBlur on mobile if requested, and only once per frame if possible
                // But for now, we minimize its impact by only applying it when necessary
                if (config.glowEnabled) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(currentSize, 0.5), 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = config.particleOpacity * (0.6 + pulse * 0.2);
                ctx.fill();

                if (config.glowEnabled) {
                    ctx.shadowBlur = 0;
                }

                // Connection lines
                if (connectDistance > 0 && !isMobile) {
                    // ... connection logic remains same but optimized for connection counts
                    for (let j = index + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < connectDistance) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = color;
                            ctx.globalAlpha = (1 - distance / connectDistance) * 0.1;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            });

            ctx.globalAlpha = 1;
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [color, density, config, connectDistance, isMobile, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
                willChange: 'transform, opacity',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                contain: 'strict'
            }}
        />
    );
};

export default Particles;
