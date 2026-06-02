import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
  type: "heart" | "star";
  color: string;
}

export function FloatingHearts() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: 18 }).map((_, i) => {
      const types: ("heart" | "star")[] = ["heart", "star"];
      const colors = [
        "rgba(244, 114, 182, 0.25)", // Pink
        "rgba(251, 113, 133, 0.25)", // Rose
        "rgba(192, 132, 252, 0.25)", // Purple/Lavender
        "rgba(253, 164, 186, 0.25)", // Warm pink
      ];

      return {
        id: i,
        x: Math.random() * 100,
        scale: 0.3 + Math.random() * 0.5,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 15,
        type: types[i % 2],
        color: colors[i % colors.length],
      };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => {
        const swayWidth = 3 + Math.random() * 5; // Drift range in vw
        const startX = item.x;
        
        return (
          <motion.div
            key={item.id}
            className="absolute bottom-[-100px] will-change-transform filter drop-shadow-[0_4px_8px_rgba(244,114,182,0.15)]"
            initial={{ 
              y: 0, 
              x: `${startX}vw`, 
              opacity: 0,
              scale: item.scale
            }}
            animate={{
              y: "-115vh",
              x: [
                `${startX}vw`, 
                `${startX + swayWidth}vw`, 
                `${startX - swayWidth}vw`, 
                `${startX}vw`
              ],
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, item.id % 2 === 0 ? 90 : -90, item.id % 2 === 0 ? 180 : -180, item.id % 2 === 0 ? 360 : -360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${item.scale * 3.5}rem`,
              height: `${item.scale * 3.5}rem`,
            }}
          >
            {item.type === "heart" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-md"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={item.color}
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-md"
              >
                <path
                  d="M12 2L14.8 8.6L22 9.2L16.5 14L18.2 21L12 17.3L5.8 21L7.5 14L2 9.2L9.2 8.6L12 2Z"
                  fill={item.color}
                />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
