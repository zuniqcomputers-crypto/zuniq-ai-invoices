// src/components/AmbientBackground.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export default function AmbientBackground({ children }: { children: React.ReactNode }) {
  const [cursorPos, setCursorPos] = useState<Position>({ x: 0.5, y: 0.5 });
  const [gyroOffset, setGyroOffset] = useState<Position>({ x: 0, y: 0 });
  const [useGyro, setUseGyro] = useState(false);
  const [permissionAsked, setPermissionAsked] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // ── Desktop cursor tracking ──────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalise to 0–1 range
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setCursorPos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Mobile gyroscope ─────────────────────────────
  const enableGyro = useCallback(() => {
    // iOS 13+ requires explicit permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            setUseGyro(true);
          }
        })
        .catch(() => setUseGyro(false));
    } else {
      // Android / older iOS – just listen
      setUseGyro(true);
    }
    setPermissionAsked(true);
  }, []);

  useEffect(() => {
    if (!useGyro) return;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // beta: front/back tilt (-180 to 180), gamma: left/right tilt (-90 to 90)
      const beta = event.beta ?? 0; // -180..180
      const gamma = event.gamma ?? 0; // -90..90
      // Map to -1..1 range for smooth offset
      const x = Math.max(-1, Math.min(1, gamma / 45)); // 45° max sensitivity
      const y = Math.max(-1, Math.min(1, (beta - 45) / 45)); // subtract 45° to centre when holding upright
      setGyroOffset({ x, y });
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [useGyro]);

  // ── Glow style (GPU‑accelerated transform) ─────
  const getGlowStyle = (): React.CSSProperties => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (isMobile) {
      if (useGyro) {
        // Move the glow based on phone tilt
        const translateX = gyroOffset.x * 60; // max 60px movement
        const translateY = gyroOffset.y * 60;
        return {
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
          opacity: 0.25,
        };
      }
      // Fallback: CSS animation (pulsing + slow drift)
      return {
        animation: "mobileGlowPulse 8s ease-in-out infinite alternate",
        opacity: 0.2,
      };
    }

    // Desktop: follow cursor
    const x = cursorPos.x * 100;
    const y = cursorPos.y * 100;
    return {
      transform: `translate3d(${x - 50}%, ${y - 50}%, 0)`,
      opacity: 0.22,
    };
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111b17]">
      {/* The ambient glow */}
      <div
        ref={glowRef}
        className="
          pointer-events-none fixed inset-0 z-0
          w-[120vw] h-[120vh] -left-[10vw] -top-[10vh]
          rounded-full
          bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.15)_0%,_transparent_70%)]
          blur-3xl
          transition-transform duration-500 ease-out
          will-change-transform
        "
        style={getGlowStyle()}
      />

      {/* Mobile: small hint to enable motion glow (only if permission not yet asked) */}
      {!permissionAsked && typeof window !== "undefined" && window.innerWidth < 768 && (
        <button
          onClick={enableGyro}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-600/90 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-sm"
        >
          ✨ Enable motion glow
        </button>
      )}

      {/* Page content */}
      <div className="relative z-10">{children}</div>

      {/* Inject CSS keyframes for mobile fallback */}
      <style jsx>{`
        @keyframes mobileGlowPulse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.18;
          }
          25% {
            transform: translate3d(20px, -10px, 0) scale(1.02);
            opacity: 0.22;
          }
          50% {
            transform: translate3d(-15px, 15px, 0) scale(0.98);
            opacity: 0.2;
          }
          75% {
            transform: translate3d(-10px, -20px, 0) scale(1.01);
            opacity: 0.24;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.18;
          }
        }
      `}</style>
    </div>
  );
}
