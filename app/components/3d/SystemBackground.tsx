"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Star Field ─────────────────────────────────────────────────────────── */

function generateStarPositions(count: number, radius: number) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Spherical distribution
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (0.8 + Math.random() * 0.4); 
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
}

function Stars() {
    const ref = useRef<any>(null);
    // Increased to 250 - balanced between minimal and visible
    const sphere = useMemo(() => generateStarPositions(250, 1.5), []);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta * 0.01;
            ref.current.rotation.y -= delta * 0.015;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.008}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

/* ─── Meteor Strike ──────────────────────────────────────────────────────── */

// Minimalist, sharp, and fast shooting stars using Custom Shaders for a perfect fade
const meteorVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const meteorFragmentShader = `
  varying vec2 vUv;
  uniform vec3 color1;
  uniform vec3 color2;
  void main() {
    // Elegant fade from head to tail (y from 1 to 0)
    // Head is bright white/red, tail becomes transparent
    float alpha = smoothstep(0.0, 0.8, vUv.y); 
    vec3 finalColor = mix(color2, color1, vUv.y * vUv.y);
    gl_FragColor = vec4(finalColor, alpha * 0.8);
  }
`;

interface MeteorProps {
    startX: number;
    startY: number;
    speed: number;
    length: number;
    delay: number;
}

function Meteor({ startX, startY, speed, length, delay }: MeteorProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    
    // Diagonal downward travel
    const angle = Math.atan2(-1, -0.5); 
    
    // Time tracker for delays
    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        if (timeRef.current < delay) return; // Wait before starting

        const mesh = meshRef.current;
        if (!mesh) return;

        mesh.visible = true;
        mesh.position.x += Math.cos(angle) * speed * delta;
        mesh.position.y += Math.sin(angle) * speed * delta;

        // Reset if it goes way off screen
        if (mesh.position.y < -2.5) {
            mesh.position.set(startX, startY, 0);
            timeRef.current = 0; // Trigger delay again
            mesh.visible = false;
        }
    });

    const uniforms = useMemo(() => ({
        color1: { value: new THREE.Color("#ffffff") }, // Head color (bright)
        color2: { value: new THREE.Color("#D10000") }  // Tail color (brand red)
    }), []);

    return (
        <mesh 
            ref={meshRef} 
            position={[startX, startY, 0]} 
            rotation={[0, 0, angle - Math.PI / 2]} 
            visible={false}
        >
            <planeGeometry args={[0.002, length]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={meteorVertexShader}
                fragmentShader={meteorFragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

/* ─── Scene ──────────────────────────────────────────────────────────────── */

// Only 4 highly curated meteors that strike occasionally
const METEORS: MeteorProps[] = [
    { startX:  1.2, startY:  1.5, speed: 0.8, length: 0.6, delay: 2.0 },
    { startX:  0.8, startY:  1.8, speed: 1.2, length: 0.8, delay: 5.5 },
    { startX:  2.0, startY:  0.5, speed: 0.9, length: 0.5, delay: 8.0 },
    { startX:  0.2, startY:  2.0, speed: 1.5, length: 0.9, delay: 12.0 },
];

export default function SystemBackground() {
    return (
        <div 
            className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000" 
            style={{ background: '#020202' }} // Deep dark base to prevent white flashes
        >
            <Canvas
                dpr={[1, 1.5]}
                gl={{ 
                    powerPreference: "high-performance", 
                    antialias: false,
                    alpha: false // Opt for solid clear color for performance
                }}
                camera={{ position: [0, 0, 1], fov: 75 }}
            >
                <color attach="background" args={['#020202']} />

                <Stars />
                
                {METEORS.map((m, i) => (
                    <Meteor key={i} {...m} />
                ))}
            </Canvas>
        </div>
    );
}
