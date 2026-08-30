"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function SpinningRing() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.6;
    ref.current.rotation.y += delta * 0.9;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.28, 128, 16]} />
      <meshStandardMaterial color="#D7FF3F" roughness={0.25} metalness={0.5} />
    </mesh>
  );
}

// Small celebratory 3D flourish behind the order-success checkmark.
export function SuccessBadge3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={40} color="#FF4433" />
      <pointLight position={[-3, -2, 2]} intensity={30} color="#D7FF3F" />
      <SpinningRing />
    </Canvas>
  );
}
