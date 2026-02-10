import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, GradientTexture, PresentationControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

const StylizedProduct = ({ isMobile }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 8;
            meshRef.current.rotation.y = Math.sin(t / 4) / 8;
            meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
            meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Outer Ring / Headband influence - Optimized segments */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.05, 8, isMobile ? 16 : 64]} />
                <MeshDistortMaterial
                    color="#0066FF"
                    speed={2}
                    distort={0.3}
                    radius={1}
                    emissive="#003366"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Main Stylized Core */}
            <mesh position={[0, 0, 0]}>
                <octahedronGeometry args={[1, 0]} />
                <MeshWobbleMaterial
                    color="#00D4FF"
                    factor={0.4}
                    speed={1}
                    metalness={1}
                    roughness={0}
                    emissive="#001133"
                />
            </mesh>

            {/* Floating Particles around model - Reduced count on mobile */}
            {[...Array(isMobile ? 5 : 20)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(i * 1.5) * 2.5,
                        Math.cos(i * 0.5) * 2,
                        Math.sin(i * 0.8) * 2
                    ]}
                >
                    <sphereGeometry args={[0.02, 4, 4]} />
                    <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={2} />
                </mesh>
            ))}

            {/* Subtle glass sphere container - simplify opacity/transmission on mobile if needed, or keep as is */}
            <mesh>
                <sphereGeometry args={[2, isMobile ? 8 : 24, isMobile ? 8 : 24]} />
                <meshPhysicalMaterial
                    transparent
                    opacity={0.1}
                    transmission={0.9}
                    thickness={1}
                    roughness={0}
                    metalness={0.1}
                    color="#ffffff"
                />
            </mesh>
        </group>
    );
};

const SceneReadyEmitter = ({ onReady }) => {
    useFrame((state) => {
        // Once the clock starts and the first frame is requested, we consider the scene "ready"
        if (state.clock.elapsedTime > 0 && onReady) {
            onReady();
        }
    });
    return null;
};

const Hero3D = ({ isMobile, onReady }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full min-h-[300px] md:min-h-[500px] absolute inset-0 z-0"
            style={{ willChange: 'transform' }}
        >
            <Canvas
                shadows={!isMobile}
                frameloop={isMobile ? 'demand' : 'always'}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
                dpr={isMobile ? 1 : [1, 2]}
            >
                <SceneReadyEmitter onReady={onReady} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow={!isMobile} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <PresentationControls
                    config={{ mass: 2, tension: 500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <Float
                        speed={1.4}
                        rotationIntensity={1.5}
                        floatIntensity={2.3}
                    >
                        <StylizedProduct isMobile={isMobile} />
                    </Float>
                </PresentationControls>
            </Canvas>
        </motion.div>
    );
};

export default Hero3D;
