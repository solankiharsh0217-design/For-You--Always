import { useMemories } from "@/hooks/use-memories";
import { PolaroidCard } from "@/components/PolaroidCard";
import { Loader2, Heart, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState, memo } from "react";
import { type Memory } from "@shared/schema";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      if (index >= text.length) {
        clearInterval(timer);
        return;
      }
      setDisplayed(text.slice(0, index + 1));
      index++;
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <p className="font-handwriting text-2xl text-rose-700 leading-tight">
      {displayed}
    </p>
  );
};

// Memoized loading spinner
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="will-change-transform"
    >
      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-4 sm:mt-6 font-handwriting text-lg sm:text-xl text-pink-600"
    >
      Loading our precious moments...
    </motion.p>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

// Memoized decorative sparkle
const DecorativeSparkle = memo(({ delay, index }: { delay: number; index: number }) => (
  <motion.div
    className="absolute will-change-transform pointer-events-none"
    style={{
      left: `${15 + index * 20}%`,
      top: `${10 + (index % 3) * 25}%`,
    }}
    animate={{
      y: [0, -15, 0],
      opacity: [0.15, 0.3, 0.15],
      scale: [0.9, 1, 0.9],
    }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/40" />
  </motion.div>
));

DecorativeSparkle.displayName = "DecorativeSparkle";

export default function Memories() {
  const { data: memories, isLoading } = useMemories();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Instant scroll reset
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Placeholder data if empty
  const displayMemories: Memory[] = (memories && memories.length > 0) ? memories : [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      type: "image",
      caption: "Your positive energy",
      date: "Always",
      rotation: -2
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      type: "image",
      caption: "Cozy coffee dates & chats",
      date: "Cherished moments",
      rotation: 3
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      type: "image",
      caption: "Sharing favorite playlists",
      date: "Musical notes",
      rotation: -4
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      type: "image",
      caption: "Watching peaceful sunsets",
      date: "Quiet skies",
      rotation: 2
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      type: "image",
      caption: "All the little inside jokes",
      date: "The small things",
      rotation: 5
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
      type: "image",
      caption: "Building spaces just for you",
      date: "Real effort",
      rotation: -3
    }
  ] as Memory[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Simplified background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Single optimized glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-r from-pink-300/25 to-purple-300/25 rounded-full blur-[100px] will-change-transform"
      />

      {/* Reduced floating sparkles - only 4 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <DecorativeSparkle key={i} delay={i * 0.5} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Top decorative element - simplified */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
            </motion.div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 15px rgba(244, 114, 182, 0.1)",
                  "0 0 22px rgba(244, 114, 182, 0.15)",
                  "0 0 15px rgba(244, 114, 182, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
            >
              Our Memory Lane
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto px-4"
            >
              Captured moments that tell our beautiful story
            </motion.p>
          </motion.div>

          {/* Simplified heart decoration - only 3 hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.55, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="will-change-transform"
              >
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400/50 fill-pink-300/50" />
              </motion.div>
            ))}
          </motion.div>
        </motion.header>

        {/* Optimized Memory Grid - mobile-first responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-24"
        >
          {displayMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px", amount: 0.1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <PolaroidCard 
                memory={memory} 
                index={index} 
                onSelect={() => setSelectedMemory(memory)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-12 sm:py-16 relative"
        >
          {/* Simplified background glow */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.1, 0.18, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-[60px]" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 space-y-6 sm:space-y-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-handwriting text-lg sm:text-xl md:text-2xl text-pink-600 px-4"
            >
              Ready for the grand finale?
            </motion.p>

            <Link href="/surprise">
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-sm sm:text-base md:text-lg shadow-xl shadow-pink-300/40 overflow-hidden will-change-transform touch-manipulation"
              >
                {/* Simplified glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full"
                />

                <span className="relative flex items-center gap-2 sm:gap-3">
                  Continue the Journey
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="will-change-transform"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 italic px-4"
            >
              The best is yet to come ♡
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedMemory(null)}
          >
            {/* Falling flower petals inside the modal */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-300/40 text-xl pointer-events-none"
                  initial={{ 
                    y: -50, 
                    x: `${10 + Math.random() * 80}%`, 
                    opacity: 0, 
                    scale: 0.5 + Math.random() * 0.5,
                    rotate: 0 
                  }}
                  animate={{ 
                    y: window.innerHeight + 50, 
                    opacity: [0, 0.7, 0.7, 0],
                    rotate: 360,
                    x: [`${10 + Math.random() * 80}%`, `${15 + Math.random() * 70}%`]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 4, 
                    repeat: Infinity,
                    delay: i * 0.3 
                  }}
                >
                  🌸
                </motion.div>
              ))}
            </div>

            {/* Polaroid Modal Card Container */}
            <motion.div
              initial={{ scale: 0.85, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="relative bg-white p-5 pb-16 shadow-2xl border border-pink-100 rounded-sm w-full max-w-sm mx-auto pointer-events-auto z-10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tape decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/60 backdrop-blur-[1px] shadow-sm transform -rotate-1 skew-x-12 z-20 pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-600 hover:text-pink-700 transition-colors cursor-pointer z-30 font-bold"
              >
                ✕
              </button>

              {/* Photo */}
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-6 border border-gray-100 shadow-inner rounded-xs">
                <img 
                  src={selectedMemory.url} 
                  alt={selectedMemory.caption} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dynamic Typewritten Caption & Details */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-6">
                <TypewriterText text={selectedMemory.caption} />
                {selectedMemory.date && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="font-serif text-xs text-rose-400 mt-1.5 italic"
                  >
                    {selectedMemory.date}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}