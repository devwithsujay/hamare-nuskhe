"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  type: "leaf" | "pollen";
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  swayFreq: number;
  swayAmp: number;
  color: string;
  veinColor: string;
  leafType: "neem" | "tulsi" | "kansa";
  t: number;
}

export default function BotanicalBreeze() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState<boolean>(true);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check user preference and prefers-reduced-motion
    const saved = localStorage.getItem("hn-botanical-breeze");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (saved !== null) {
      setEnabled(saved === "true");
    } else if (prefersReducedMotion) {
      setEnabled(false);
    }

    const handleToggle = (e: any) => {
      if (typeof e.detail?.enabled === "boolean") {
        setEnabled(e.detail.enabled);
      } else {
        setEnabled((prev) => !prev);
      }
    };

    window.addEventListener("hn-toggle-breeze", handleToggle);
    return () => window.removeEventListener("hn-toggle-breeze", handleToggle);
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle Palette
    // 75% Neem Green, Tulsi, Kansa Gold leaves. 25% golden Haldi pollen spores.
    const leafColors = [
      { fill: "rgba(28, 67, 50, 0.25)", vein: "rgba(20, 50, 36, 0.35)", type: "neem" as const },
      { fill: "rgba(64, 115, 86, 0.22)", vein: "rgba(45, 85, 62, 0.32)", type: "tulsi" as const },
      { fill: "rgba(200, 157, 84, 0.28)", vein: "rgba(160, 120, 55, 0.40)", type: "kansa" as const },
    ];

    const pollenColors = [
      "rgba(217, 155, 38, 0.55)",
      "rgba(200, 157, 84, 0.50)",
      "rgba(245, 175, 45, 0.45)",
    ];

    const totalParticles = 26; // 24-28 range
    const particles: Particle[] = [];

    for (let i = 0; i < totalParticles; i++) {
      const isPollen = i % 4 === 0; // 25% pollen, 75% leaves
      if (isPollen) {
        particles.push({
          type: "pollen",
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.5 + Math.random() * 2,
          speedY: 0.3 + Math.random() * 0.45,
          speedX: (Math.random() - 0.5) * 0.4,
          rotation: 0,
          rotSpeed: 0,
          flip: 0,
          flipSpeed: 0,
          swayFreq: 0.008 + Math.random() * 0.012,
          swayAmp: 0.6 + Math.random() * 1.2,
          color: pollenColors[Math.floor(Math.random() * pollenColors.length)],
          veinColor: "transparent",
          leafType: "kansa",
          t: Math.random() * 1000,
        });
      } else {
        const c = leafColors[Math.floor(Math.random() * leafColors.length)];
        particles.push({
          type: "leaf",
          x: Math.random() * width,
          y: Math.random() * height,
          size: 14 + Math.random() * 12,
          speedY: 0.45 + Math.random() * 0.65,
          speedX: 0.2 + (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.018,
          flip: Math.random() * Math.PI * 2,
          flipSpeed: 0.012 + Math.random() * 0.02,
          swayFreq: 0.006 + Math.random() * 0.008,
          swayAmp: 1.2 + Math.random() * 1.8,
          color: c.fill,
          veinColor: c.vein,
          leafType: c.type,
          t: Math.random() * 1000,
        });
      }
    }

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.t += 1;

        // Downward drift with sinusoidal wind sway
        p.y += p.speedY;
        p.x += Math.sin(p.t * p.swayFreq) * p.swayAmp * 0.4 + p.speedX;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        // Mouse-cursor repulsion within 110px radius
        if (mouseX !== null && mouseY !== null) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0) {
            const force = (1 - dist / 110) * 3.2;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Boundary wrapping
        if (p.y > height + 30) {
          p.y = -25;
          p.x = Math.random() * width;
        } else if (p.y < -30) {
          p.y = height + 25;
        }
        if (p.x > width + 30) {
          p.x = -25;
        } else if (p.x < -30) {
          p.x = width + 25;
        }

        // Render leaf or pollen
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "leaf") {
          // 3D leaf flutter transformation
          const scaleY = Math.cos(p.flip) * 0.65 + 0.35;
          ctx.scale(1, scaleY);

          const l = p.size;
          const w = p.leafType === "tulsi" ? l * 0.52 : l * 0.38;

          // Leaf outline using quadratic curves
          ctx.beginPath();
          ctx.moveTo(0, -l * 0.5);
          ctx.quadraticCurveTo(w, 0, 0, l * 0.5);
          ctx.quadraticCurveTo(-w, 0, 0, -l * 0.5);
          ctx.closePath();

          ctx.fillStyle = p.color;
          ctx.fill();

          // Center primary vein
          ctx.beginPath();
          ctx.moveTo(0, -l * 0.45);
          ctx.lineTo(0, l * 0.45);
          ctx.strokeStyle = p.veinColor;
          ctx.lineWidth = Math.max(0.7, p.size * 0.04);
          ctx.stroke();

          // Subtle side secondary veins
          ctx.beginPath();
          ctx.moveTo(0, -l * 0.15);
          ctx.lineTo(w * 0.45, -l * 0.05);
          ctx.moveTo(0, l * 0.12);
          ctx.lineTo(-w * 0.45, l * 0.22);
          ctx.strokeStyle = p.veinColor;
          ctx.lineWidth = Math.max(0.4, p.size * 0.025);
          ctx.stroke();
        } else {
          // Golden Haldi pollen spore with radiant micro-halo
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(217, 155, 38, 0.12)";
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[15]"
      aria-hidden="true"
    />
  );
}
