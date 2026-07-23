import { useState, useRef, useCallback, useEffect } from "react";

// Web Audio API ambient chime synth fallback for missing audio files
class AmbientSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  play() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.scheduleNotes();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
  }

  scheduleNotes() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 349.23], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G6
    ];

    const chord = chords[Math.floor(Math.random() * chords.length)];
    chord.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.22);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.22 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.22 + 2.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.22);
        osc.stop(now + idx * 0.22 + 2.3);
      } catch {
        // Safe catch
      }
    });

    this.timer = setTimeout(() => {
      if (this.isPlaying) this.scheduleNotes();
    }, 2600);
  }
}

const synthInstance = new AmbientSynth();

export function useMusicPlayer(src = "/audio/friendship-background.mp3") {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [useSynthFallback, setUseSynthFallback] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      synthInstance.stop();
    };
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      if (useSynthFallback) {
        synthInstance.stop();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlaying(false);
    } else {
      if (useSynthFallback) {
        synthInstance.play();
        setPlaying(true);
        return;
      }

      if (!audioRef.current && src) {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.4;
        audio.addEventListener("error", () => {
          setUseSynthFallback(true);
          synthInstance.play();
        });
        audioRef.current = audio;
      }

      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
          })
          .catch(() => {
            // Fallback to Web Audio synth on playback error or missing file
            setUseSynthFallback(true);
            synthInstance.play();
            setPlaying(true);
          });
      } else {
        setUseSynthFallback(true);
        synthInstance.play();
        setPlaying(true);
      }
    }
  }, [playing, useSynthFallback, src]);

  return { playing, toggle };
}
