import { useAudio } from "@/hooks/use-audio";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const { isPlaying, toggle } = useAudio();

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-white/75 backdrop-blur-md px-4 py-2.5 rounded-full border border-pink-100 shadow-xl transition-all duration-500 hover:scale-[1.02]",
        isPlaying ? "shadow-pink-300/20 border-pink-200" : "shadow-gray-200/20"
      )}
    >
      {/* Spinning Vinyl Record Icon */}
      <div className="relative w-8 h-8 flex-shrink-0 cursor-pointer" onClick={toggle}>
        <div
          className={cn(
            "w-full h-full rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-md overflow-hidden relative",
            isPlaying ? "animate-spin-vinyl" : "rotate-12"
          )}
          style={{ transition: isPlaying ? "none" : "transform 0.8s ease-out" }}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-1 rounded-full border border-neutral-700/40" />
          <div className="absolute inset-2 rounded-full border border-neutral-700/30" />
          <div className="absolute inset-3 rounded-full border border-neutral-700/20" />
          
          {/* Vinyl Label */}
          <div className="w-3.5 h-3.5 rounded-full bg-pink-400 flex items-center justify-center relative">
            {/* Center Spindle Hole */}
            <div className="w-1 h-1 rounded-full bg-white shadow-inner" />
          </div>
        </div>
        
        {/* Play/Pause overlay subtle indicator */}
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
          <div className={cn("w-1 h-1 bg-white rounded-full", isPlaying && "animate-ping")} />
        </div>
      </div>

      {/* Animated Waveform Equalizer */}
      <div className="flex items-end gap-0.5 h-7 w-9 px-1 justify-center pointer-events-none">
        <div
          className={cn(
            "w-0.75 bg-pink-400/80 rounded-full transition-all duration-300",
            isPlaying ? "animate-equalizer-1" : "h-1"
          )}
        />
        <div
          className={cn(
            "w-0.75 bg-rose-400/80 rounded-full transition-all duration-300",
            isPlaying ? "animate-equalizer-2" : "h-1.5"
          )}
        />
        <div
          className={cn(
            "w-0.75 bg-purple-400/80 rounded-full transition-all duration-300",
            isPlaying ? "animate-equalizer-3" : "h-1"
          )}
        />
        <div
          className={cn(
            "w-0.75 bg-pink-500/80 rounded-full transition-all duration-300",
            isPlaying ? "animate-equalizer-4" : "h-2"
          )}
        />
        <div
          className={cn(
            "w-0.75 bg-rose-500/80 rounded-full transition-all duration-300",
            isPlaying ? "animate-equalizer-5" : "h-1.2"
          )}
        />
      </div>

      {/* Vertical Divider */}
      <div className="h-6 w-px bg-pink-100" />

      {/* Trigger Button */}
      <button
        onClick={toggle}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
          isPlaying
            ? "bg-pink-50 text-pink-500 hover:bg-pink-100"
            : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        )}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-pink-500" />
        ) : (
          <Play className="w-3.5 h-3.5 pl-0.5 fill-gray-400" />
        )}
      </button>
    </div>
  );
}
