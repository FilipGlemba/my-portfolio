"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Shape({
  position,
  color,
  geometry,
  speed,
  floatIntensity,
}: {
  position: [number, number, number];
  color: string;
  geometry: "icosahedron" | "torus" | "sphere" | "octahedron";
  speed: number;
  floatIntensity: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.1} floatIntensity={floatIntensity}>
      <mesh position={position}>
        {geometry === "icosahedron" ? <icosahedronGeometry args={[1, 0]} /> : null}
        {geometry === "torus" ? <torusGeometry args={[0.6, 0.22, 16, 48]} /> : null}
        {geometry === "sphere" ? <sphereGeometry args={[0.55, 32, 32]} /> : null}
        {geometry === "octahedron" ? <octahedronGeometry args={[0.8, 0]} /> : null}
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

// Ambient 3D shapes floating on the right side of the hero, brand-colored.
// Client-only (WebGL) — loaded via next/dynamic with ssr:false in hero.tsx.
export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 4, 5]} intensity={80} color="#FF4433" />
      <pointLight position={[-4, -3, 3]} intensity={60} color="#D7FF3F" />

      <Shape position={[2.6, 1.1, 0]} color="#FF4433" geometry="icosahedron" speed={1.3} floatIntensity={1.6} />
      <Shape position={[3.7, -1.1, -1.5]} color="#D7FF3F" geometry="torus" speed={1.7} floatIntensity={2} />
      <Shape position={[1.5, -1.9, -2.2]} color="#ffffff" geometry="sphere" speed={1.1} floatIntensity={1.4} />
      <Shape position={[4.4, 0.6, -2.8]} color="#26292E" geometry="octahedron" speed={1.5} floatIntensity={1.8} />
    </Canvas>
  );
}
