import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  color: string;
  type: "sparkle" | "heart" | "star";
}

export function CursorTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let sparkleId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 18) return; // Throttled by distance to prevent clutter

      lastX = e.clientX;
      lastY = e.clientY;

      const types: ("sparkle" | "heart" | "star")[] = ["sparkle", "heart", "star"];
      const colors = [
        "rgba(244, 114, 182, 0.65)", // Pink
        "rgba(251, 113, 133, 0.65)", // Rose
        "rgba(192, 132, 252, 0.65)", // Lavender
        "rgba(253, 164, 186, 0.65)", // Warm pink
        "rgba(253, 224, 71, 0.65)",  // Soft Gold
      ];

      const newSparkle: Sparkle = {
        id: sparkleId++,
        x: e.clientX,
        y: e.clientY,
        size: 8 + Math.random() * 12,
        rotate: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };

      setSparkles((prev) => [...prev.slice(-25), newSparkle]); // Throttled history limit
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter out expired sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 850);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute will-change-transform animate-sparkle-fade"
          style={{
            left: sp.x,
            top: sp.y,
            transform: `translate(-50%, -50%) rotate(${sp.rotate}deg)`,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            color: sp.color,
          }}
        >
          {sp.type === "sparkle" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
            </svg>
          )}
          {sp.type === "heart" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {sp.type === "star" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
