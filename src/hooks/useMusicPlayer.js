import { useState, useRef, useCallback } from "react";

export function useMusicPlayer(src) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const [canPlay, setCanPlay] = useState(false);

  const initAudio = useCallback(() => {
    if (audioRef.current || !src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.addEventListener("canplaythrough", () => setCanPlay(true));
    audio.addEventListener("error", () => setCanPlay(false));
    audioRef.current = audio;
  }, [src, volume]);

  const toggle = useCallback(() => {
    initAudio();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => setCanPlay(false));
      setPlaying(true);
    }
  }, [playing, initAudio]);

  const setVolume = useCallback((val) => {
    setVolumeState(val);
    if (audioRef.current) audioRef.current.volume = val;
  }, []);

  return { playing, volume, canPlay, toggle, setVolume };
}
