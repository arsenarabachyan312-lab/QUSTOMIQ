"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT   = 1600;
const EMERALD = new THREE.Color("#10B981");
const VIOLET  = new THREE.Color("#A78BFA");

/* Module-level mouse state — avoids closure allocations per frame */
const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 };

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const t = Math.random();
      const c = EMERALD.clone().lerp(VIOLET, t);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    mouse.cx += (mouse.tx - mouse.cx) * 0.06;
    mouse.cy += (mouse.ty - mouse.cy) * 0.06;

    ref.current.rotation.y = t * 0.035 + mouse.cx * 0.25;
    ref.current.rotation.x = Math.sin(t * 0.02) * 0.06 + mouse.cy * 0.15;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.052}
        vertexColors
        transparent
        opacity={0.72}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.tx =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Particles />
    </Canvas>
  );
}
