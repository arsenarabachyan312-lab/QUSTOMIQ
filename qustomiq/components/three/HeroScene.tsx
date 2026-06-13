"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Module-level mouse — zero per-frame allocation ──────── */
const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 };

/* ── Central Distorting Orb ──────────────────────────────── */
function DistortOrb() {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh>
        <sphereGeometry args={[0.85, 64, 64]} />
        <MeshDistortMaterial
          color="#10B981"
          distort={0.45}
          speed={2.5}
          transparent
          opacity={0.12}
          emissive="#10B981"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

/* ── Wireframe Icosahedron (dual shell) ──────────────────── */
function Icosahedra() {
  const groupRef = useRef<THREE.Group>(null);

  const outerEdges = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(2.1, 2);
    const e = new THREE.EdgesGeometry(base);
    base.dispose();
    return e;
  }, []);

  const innerEdges = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.35, 1);
    const e = new THREE.EdgesGeometry(base);
    base.dispose();
    return e;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    mouse.cx += (mouse.tx - mouse.cx) * 0.035;
    mouse.cy += (mouse.ty - mouse.cy) * 0.035;
    groupRef.current.rotation.y = t * 0.07 + mouse.cx * 0.22;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.12 - mouse.cy * 0.14;
  });

  return (
    <group ref={groupRef}>
      {/* Outer cage — emerald */}
      <lineSegments geometry={outerEdges}>
        <lineBasicMaterial color="#10B981" transparent opacity={0.42} />
      </lineSegments>
      {/* Inner cage — violet, counter-rotated */}
      <lineSegments geometry={innerEdges} rotation={[0.5, 0.8, 0.3]}>
        <lineBasicMaterial color="#A78BFA" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

/* ── Orbital Torus Ring ───────────────────────────────────── */
function TorusOrbit() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.z = t * 0.08;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, Math.PI / 7]}>
      <torusGeometry args={[2.6, 0.007, 4, 140]} />
      <meshBasicMaterial color="#A78BFA" transparent opacity={0.18} />
    </mesh>
  );
}

/* ── Particle Cloud ──────────────────────────────────────── */
function Particles() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const COUNT = 2200;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const em = new THREE.Color("#10B981");
    const vi = new THREE.Color("#A78BFA");

    for (let i = 0; i < COUNT; i++) {
      const layer  = Math.random();
      const radius = layer < 0.35 ? 2.3 + Math.random() * 1.0 : 3.5 + Math.random() * 4.5;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const c = em.clone().lerp(vi, i / COUNT);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.018 + mouse.cx * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.012) * 0.05 - mouse.cy * 0.08;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.028} sizeAttenuation vertexColors transparent opacity={0.65} depthWrite={false} />
    </points>
  );
}

/* ── Dynamic Lights ──────────────────────────────────────── */
function Lights() {
  const eRef = useRef<THREE.PointLight>(null);
  const vRef = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (eRef.current) eRef.current.position.set(Math.sin(t * 0.28) * 4, Math.cos(t * 0.18) * 2, 2);
    if (vRef.current) vRef.current.position.set(Math.cos(t * 0.22 + 1) * 4, Math.sin(t * 0.15) * 2.5, -2);
  });
  return (
    <>
      <ambientLight intensity={0.06} />
      <pointLight ref={eRef} color="#10B981" intensity={3.5} distance={14} decay={2} />
      <pointLight ref={vRef} color="#A78BFA" intensity={2.5} distance={14} decay={2} />
      <pointLight color="#ffffff" intensity={0.25} distance={20} position={[0, 6, 5]} />
    </>
  );
}

/* ── Camera Drift ─────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.cx * 0.55 - camera.position.x) * 0.012;
    camera.position.y += (-mouse.cy * 0.35 - camera.position.y) * 0.012;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Root export ─────────────────────────────────────────── */
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
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Lights />
      <Icosahedra />
      <TorusOrbit />
      <DistortOrb />
      <Particles />
      <Sparkles count={70} scale={9} size={1.2} speed={0.25} opacity={0.5} color="#10B981" noise={0.8} />
      <Sparkles count={40} scale={7} size={0.9} speed={0.18} opacity={0.35} color="#A78BFA" noise={1.2} />
      <CameraRig />
    </Canvas>
  );
}
