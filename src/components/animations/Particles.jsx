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
        // Mobile: slower, fewer particles, simpler rendering
        particleSpeed: isMobile ? speed * 0.3 : speed * 0.5,
        particleOpacity: isMobile ? opacity * 0.8 : opacity,
        minSize: isMobile ? 1.5 : 1,
        maxSize: isMobile ? 3 : 4,
        glowEnabled: !isMobile, // Disable glow on mobile for performance
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

        const resize = () => {
            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            // Reinitialize particles on resize
            particlesRef.current = initParticles(canvas);
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
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                // Gentle pulsing size effect
                const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset);
                const currentSize = p.size + pulse * 0.3;

                // Draw particle with subtle glow (desktop only)
                if (config.glowEnabled) {
                    ctx.shadowBlur = 15;
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

                // Connection lines between nearby particles (optional, desktop only)
                if (connectDistance > 0 && !isMobile) {
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
                            ctx.globalAlpha = (1 - distance / connectDistance) * 0.15;
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
                willChange: 'auto',
                contain: 'strict'
            }}
        />
    );
};

export default Particles;
