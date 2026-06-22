"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Scene({ loaded }: { loaded: boolean }) {
  const points = useRef<THREE.Points>(null!);
  const scrollOffset = useRef(0);
  const loadFactorRef = useRef(0);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const count = isMobile ? 60000 : 500000;

  const colors = {
    hero: new THREE.Color("#ffffff"),
    about: new THREE.Color("#00a693"),
    tech: new THREE.Color("#1c39bb"),
    works: new THREE.Color("#701c1c"),
    process: new THREE.Color("#d45814"),
    contact: new THREE.Color("#ebb40f"),
  };

  const [galaxyPos, infinityPos, cubePos, techPos, dnaPos, processPos, domePos] = useMemo(() => {
    const gArr = new Float32Array(count * 3);
    const iArr = new Float32Array(count * 3);
    const cArr = new Float32Array(count * 3);
    const tArr = new Float32Array(count * 3);
    const dArr = new Float32Array(count * 3);
    const pArr = new Float32Array(count * 3);
    const dmArr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 00. Loading (Starburst Spiral Galaxy)
      const numArms = 2;
      const arm = i % numArms;
      const rGal = Math.pow(Math.random(), 1.8) * 15;
      const thetaGal = (arm * Math.PI * 2) / numArms + rGal * 0.35;
      
      if (i < count * 0.35) {
        const coreR = Math.pow(Math.random(), 2.0) * 3.5;
        const coreTheta = Math.random() * Math.PI * 2;
        gArr[i3] = coreR * Math.cos(coreTheta) + (Math.random() - 0.5) * 0.4;
        gArr[i3+1] = coreR * Math.sin(coreTheta) + (Math.random() - 0.5) * 0.4;
        gArr[i3+2] = (Math.random() - 0.5) * 1.2;
      } else {
        gArr[i3] = rGal * Math.cos(thetaGal) + (Math.random() - 0.5) * 1.5;
        gArr[i3+1] = rGal * Math.sin(thetaGal) + (Math.random() - 0.5) * 1.5;
        gArr[i3+2] = (Math.random() - 0.5) * 0.6;
      }

      // 01. Hero (Infinity)
      const t = (i / count) * Math.PI * 2;
      iArr[i3] = (5 * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      iArr[i3+1] = (5 * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      iArr[i3+2] = (Math.random() - 0.5) * 0.5;

      // 02. About (Cube)
      const side = Math.floor(Math.random() * 6);
      const a = (Math.random() - 0.5) * 7;
      const b = (Math.random() - 0.5) * 7;
      const s = 3.5;
      if (side === 0) { cArr[i3]=a; cArr[i3+1]=b; cArr[i3+2]=s; }
      else if (side === 1) { cArr[i3]=a; cArr[i3+1]=b; cArr[i3+2]=-s; }
      else if (side === 2) { cArr[i3]=a; cArr[i3+1]=s; cArr[i3+2]=b; }
      else if (side === 3) { cArr[i3]=a; cArr[i3+1]=-s; cArr[i3+2]=b; }
      else if (side === 4) { cArr[i3]=s; cArr[i3+1]=a; cArr[i3+2]=b; }
      else { cArr[i3]=-s; cArr[i3+1]=a; cArr[i3+2]=b; }

      // 03. Technologies (Wavy Plane)
      const xTech = (Math.random() - 0.5) * 28;
      const yTech = (Math.random() - 0.5) * 16;
      tArr[i3] = xTech;
      tArr[i3+1] = yTech + xTech * 0.2; 
      tArr[i3+2] = Math.sin(xTech * 0.2 + yTech * 0.2) * 2.5;

      // 04. Works (DNA Strand)
      const tDna = (i / count) * Math.PI * 14; 
      const strand = i % 2 === 0 ? 1 : -1;
      const radius = 4.2;
      const p = (Math.random() - 0.5) * 1.5;
      const thetaDna = Math.random() * Math.PI * 2;
      const phiDna = Math.acos(2 * Math.random() - 1);
      dArr[i3] = (radius * Math.cos(tDna) * strand) + (p * Math.sin(phiDna) * Math.cos(thetaDna));
      dArr[i3+1] = (tDna - Math.PI * 7) * 2.5 + (p * Math.sin(phiDna) * Math.sin(thetaDna));
      dArr[i3+2] = (radius * Math.sin(tDna) * strand) + (p * Math.cos(phiDna));

      // 05. Process (Whirlpool Vortex)
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 1.8) * 13 + 0.4; 
      const spiralTwist = theta + r * 0.4; 
      pArr[i3] = r * Math.cos(spiralTwist);
      pArr[i3+1] = (Math.random() - 0.5) * 1.5 - (13 - r) * 0.25; 
      pArr[i3+2] = r * Math.sin(spiralTwist);

      // 06. Contact (Mount Damavand Volcanic Cone)
      const hProgress = Math.random();
      const yDamavand = -9.5 + hProgress * 16.0;
      const baseRadius = 13.5;
      const peakRadius = 0.5;
      const rDamavand = peakRadius + (baseRadius - peakRadius) * Math.pow(1 - hProgress, 2.3);

      const thetaDamavand = Math.random() * Math.PI * 2;
      const ridgeNoise = 1.0 + 
        0.07 * Math.sin(thetaDamavand * 6) * Math.cos(thetaDamavand * 2) + 
        0.02 * Math.sin(thetaDamavand * 16);
      const internalVolume = 0.88 + Math.random() * 0.12; 

      let finalRadius = rDamavand * ridgeNoise * internalVolume;
      if (hProgress > 0.95) finalRadius += (hProgress - 0.95) * 1.8;

      dmArr[i3] = finalRadius * Math.cos(thetaDamavand);
      dmArr[i3+1] = yDamavand + (Math.random() - 0.5) * 0.15;
      dmArr[i3+2] = finalRadius * Math.sin(thetaDamavand);
    }
    return [gArr, iArr, cArr, tArr, dArr, pArr, dmArr];
  }, [count]);

  useEffect(() => {
    const onScroll = () => {
      scrollOffset.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const s = scrollOffset.current;
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    const mat = points.current.material as THREE.PointsMaterial;
    const time = state.clock.getElapsedTime();

    loadFactorRef.current = THREE.MathUtils.lerp(loadFactorRef.current, loaded ? 1 : 0, 0.025);
    const lf = loadFactorRef.current;

    const activeCount = Math.floor(THREE.MathUtils.lerp(isMobile ? 15000 : 45000, count, lf));
    points.current.geometry.setDrawRange(0, activeCount);

    if (!loaded) {
      points.current.rotation.z = time * 0.15;
    } else {
      points.current.rotation.z = THREE.MathUtils.lerp(points.current.rotation.z, 0, 0.04);
    }

    let fromArr = infinityPos, toArr = cubePos;
    let factor = 0;
    let fromColor = colors.hero, toColor = colors.about;

    if (s < 0.10) {
      fromArr = infinityPos; toArr = cubePos; factor = s / 0.10;
      fromColor = colors.hero; toColor = colors.about;
    } else if (s < 0.38) {
      fromArr = cubePos; toArr = cubePos; factor = 0;
      fromColor = colors.about; toColor = colors.about;
    } else if (s < 0.46) {
      fromArr = cubePos; toArr = techPos; factor = (s - 0.38) / 0.08;
      fromColor = colors.about; toColor = colors.tech;
    } else if (s < 0.52) {
      fromArr = techPos; toArr = techPos; factor = 0;
      fromColor = colors.tech; toColor = colors.tech;
    } else if (s < 0.60) {
      fromArr = techPos; toArr = dnaPos; factor = (s - 0.52) / 0.08;
      fromColor = colors.tech; toColor = colors.works;
    } else if (s < 0.72) {
      fromArr = dnaPos; toArr = dnaPos; factor = 0;
      fromColor = colors.works; toColor = colors.works;
    } else if (s < 0.82) {
      fromArr = dnaPos; toArr = processPos; factor = (s - 0.72) / 0.10;
      fromColor = colors.works; toColor = colors.process;
    } else {
      fromArr = processPos; toArr = domePos; factor = Math.min(1, (s - 0.82) / 0.18);
      fromColor = colors.process; toColor = colors.contact;
    }

    const easeFactor = factor < 0.5 ? 2 * factor * factor : 1 - Math.pow(-2 * factor + 2, 2) / 2;

    const isFromTech = fromArr === techPos;
    const isToTech = toArr === techPos;
    const isFromProcess = fromArr === processPos;
    const isToProcess = toArr === processPos;
    const vortexSpeed = time * 0.6;

    const cosV = Math.cos(vortexSpeed);
    const sinV = Math.sin(vortexSpeed);

    for (let j = 0; j < activeCount; j++) {
      const j3 = j * 3;
      
      const gx = galaxyPos[j3], gy = galaxyPos[j3+1], gz = galaxyPos[j3+2];
      let fx = fromArr[j3], fy = fromArr[j3+1], fz = fromArr[j3+2];
      let tx = toArr[j3], ty = toArr[j3+1], tz = toArr[j3+2];

      if (isFromTech) fz = Math.sin(fx * 0.25 + fy * 0.25 + time * 1.5) * 3.0;
      if (isToTech) tz = Math.sin(tx * 0.25 + ty * 0.25 + time * 1.5) * 3.0;

      if (isFromProcess) {
        const rx = fx, rz = fz;
        fx = rx * cosV - rz * sinV;
        fz = rx * sinV + rz * cosV;
      }
      if (isToProcess) {
        const rx = tx, rz = tz;
        tx = rx * cosV - rz * sinV;
        tz = rx * sinV + rz * cosV;
      }

      const targetX = fx + (tx - fx) * easeFactor;
      const targetY = fy + (ty - fy) * easeFactor;
      const targetZ = fz + (tz - fz) * easeFactor;

      pos[j3] = gx + (targetX - gx) * lf;
      pos[j3+1] = gy + (targetY - gy) * lf;
      pos[j3+2] = gz + (targetZ - gz) * lf;
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    mat.color.lerpColors(fromColor, toColor, easeFactor);

    const sizeMultiplier = isMobile ? 1.5 : 1.0;
    if (s >= 0.82) {
      mat.size = 0.018 * sizeMultiplier;
    } else if (s >= 0.60 && s <= 0.72) {
      mat.size = 0.024 * sizeMultiplier; 
    } else if (s >= 0.46 && s <= 0.52) {
      mat.size = 0.026 * sizeMultiplier; 
    } else {
      mat.size = 0.015 * sizeMultiplier; 
    }

    points.current.rotation.y += 0.0003;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={galaxyPos.slice()} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        transparent 
        opacity={0.85} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function GlobalCanvas() {
  const [loaded, setLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setTimeout(() => setShowOverlay(false), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showOverlay && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
            loaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase animate-pulse select-none">
            Loading
          </h1>
          <div className="mt-4 text-[10px] tracking-[0.6em] text-[#00a693] uppercase font-mono opacity-60">
            Mapping Core Constellations
          </div>
        </div>
      )}

      <div className="fixed inset-0 -z-10 bg-[#020202]">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Scene loaded={loaded} />
        </Canvas>
      </div>
    </>
  );
}