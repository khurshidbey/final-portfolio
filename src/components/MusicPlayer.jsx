"use client";
import { useState, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.2;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} loop src="/music.mp3" />
      <button 
        onClick={toggleMusic}
        className="bg-[#deff9a] p-4 rounded-full shadow-lg hover:scale-110 transition-all text-black font-bold"
      >
        {isPlaying ? "⏸" : "🎵"}
      </button>
    </div>
  );
};

export default MusicPlayer;