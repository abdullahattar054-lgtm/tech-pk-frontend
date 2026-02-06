import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, GradientTexture, PresentationControls, Stage } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const StylizedProduct = () => {
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
                <torusGeometry args={[1.5, 0.05, 16, 100]} />
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

            {/* Floating Particles around model */}
            {[...Array(20)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(i * 1.5) * 2.5,
                        Math.cos(i * 0.5) * 2,
                        Math.sin(i * 0.8) * 2
                    ]}
                >
                    <sphereGeometry args={[0.02, 16, 16]} />
                    <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={2} />
                </mesh>
            ))}

            {/* Subtle glass sphere container */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
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

const Hero3D = () => {
    return (
        <div className="w-full h-full min-h-[500px] absolute inset-0 z-0">
            <Canvas
                shadows
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
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
                        <StylizedProduct />
                    </Float>
                </PresentationControls>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
