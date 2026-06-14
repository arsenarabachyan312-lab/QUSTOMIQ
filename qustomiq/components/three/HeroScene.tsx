"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Module-level state — zero per-frame allocations ─────── */
const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 }; // NDC, lerped for camera

/* ── GLSL shaders for per-particle mouse brightening ─────── */
const VERT = /* glsl */ `
  uniform vec2 uMouse;

  attribute vec3 aColor;
  varying   vec3 vColor;
  varying   float vAlpha;

  void main() {
    vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);
    vec4 clip   = projectionMatrix * mvPos;
    gl_Position = clip;

    /* Screen-space NDC distance from cursor */
    vec2 ndc  = clip.xy / clip.w;
    float dist = length(ndc - uMouse);
    float t    = max(0.0, 1.0 - dist / 0.5); /* 0.5 NDC radius ≈ 200px on 800px wide */

    /* Size: base 1.8, +20% near cursor */
    float sz = 1.8 * (1.0 + t * 0.2);
    gl_PointSize = clamp(sz * (280.0 / -mvPos.z), 0.4, 4.0);

    /* Brightness: 0.15 → 0.40 near cursor */
    vAlpha = 0.15 + t * 0.25;
    vColor = aColor;
  }
`;

const FRAG = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  c   = gl_PointCoord - 0.5;
    float len = length(c);
    if (len > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, len);
    gl_FragColor = vec4(vColor, soft * vAlpha);
  }
`;

/* ── Particle cloud ───────────────────────────────────────── */
function Particles() {
  const ref    = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const COUNT = 800;

  /* Build buffers once */
  const geo = useMemo(() => {
    const pos  = new Float32Array(COUNT * 3);
    const col  = new Float32Array(COUNT * 3);
    const em   = new THREE.Color("#10B981");
    const vi   = new THREE.Color("#A78BFA");

    for (let i = 0; i < COUNT; i++) {
      const layer  = Math.random();
      const radius = layer < 0.4 ? 2.2 + Math.random() * 1.1 : 3.4 + Math.random() * 4.5;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      /* 70% emerald bias: t goes from 0 to 0.30 */
      const t  = (i / COUNT) * 0.3;
      const c  = em.clone().lerp(vi, t);
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor",   new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t  = clock.elapsedTime;
    mouse.cx += (mouse.tx - mouse.cx) * 0.04;
    mouse.cy += (mouse.ty - mouse.cy) * 0.04;
    ref.current.rotation.y = t * 0.016 + mouse.cx * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.011) * 0.04;

    if (matRef.current) {
      matRef.current.uniforms.uMouse.value.set(mouse.cx, mouse.cy);
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{ uMouse: { value: new THREE.Vector2(0, 0) } }}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ── Camera drift ─────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.cx * 0.5  - camera.position.x) * 0.012;
    camera.position.y += (-mouse.cy * 0.3 - camera.position.y) * 0.012;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Root export ──────────────────────────────────────────── */
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
      <ambientLight intensity={0.04} />
      <Particles />
      <Sparkles count={60} scale={9} size={1.1} speed={0.22} opacity={0.35} color="#10B981" noise={0.9} />
      <Sparkles count={30} scale={7} size={0.85} speed={0.16} opacity={0.22} color="#A78BFA" noise={1.2} />
      <CameraRig />
    </Canvas>
  );
}
