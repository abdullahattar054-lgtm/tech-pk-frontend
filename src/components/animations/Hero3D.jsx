import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, GradientTexture, PresentationControls, Stage } from '@react-three/drei';
import { useRef } from 'react';
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
            {/* Outer Ring / Headband influence */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.05, 16, isMobile ? 32 : 100]} />
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
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={2} />
                </mesh>
            ))}

            {/* Subtle glass sphere container - simplify opacity/transmission on mobile if needed, or keep as is */}
            <mesh>
                <sphereGeometry args={[2, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
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

const Hero3D = ({ isMobile }) => {
    return (
        <div className="w-full h-full min-h-[300px] md:min-h-[500px] absolute inset-0 z-0">
            <Canvas
                shadows={!isMobile}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
                dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow={!isMobile} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
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

                <OrbitControls enableZoom={false} enablePan={false} enableRotate={!isMobile} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
