import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   AUDIO ENGINE  (Web Audio API)
   All sound synthesis happens here — no external files needed.
───────────────────────────────────────────────────────────────────────────── */
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.masterGain = null;
    this.ambientNode = null;
    this.isAmbientPlaying = false;
    this.dataArray = null;
    this._initiated = false;
  }

  /* Lazily create AudioContext on first user gesture */
  init() {
    if (this._initiated) return;
    this._initiated = true;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.55;
    this.masterGain.connect(this.ctx.destination);

    /* Analyser for waveform visualizer */
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.82;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.connect(this.masterGain);
  }

  resume() {
    if (this.ctx?.state === "suspended") this.ctx.resume();
  }

  /* ── LOW-FREQUENCY BASS RUMBLE (ambient) ── */
  startAmbient() {
    if (!this.ctx || this.isAmbientPlaying) return;
    this.isAmbientPlaying = true;

    const createLayer = (freq, gainVal, detune = 0) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = detune;

      lfo.type = "sine";
      lfo.frequency.value = 0.12;
      lfoGain.gain.value = freq * 0.08;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(gainVal, this.ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(this.analyser);

      lfo.start();
      osc.start();
      this._ambientOscs = this._ambientOscs || [];
      this._ambientOscs.push({ osc, gain, lfo });
      return gain;
    };

    createLayer(38, 0.18);          // Deep sub bass
    createLayer(52, 0.10, 3);       // Mid bass
    createLayer(76, 0.05, -2);      // Upper bass harmonic
    createLayer(19, 0.08);          // Sub-sub rumble
  }

  stopAmbient() {
    if (!this.isAmbientPlaying || !this._ambientOscs) return;
    this._ambientOscs.forEach(({ osc, gain, lfo }) => {
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
      setTimeout(() => { try { osc.stop(); lfo.stop(); } catch {} }, 1600);
    });
    this._ambientOscs = [];
    this.isAmbientPlaying = false;
  }

  /* ── BASS THUD — deep impact hit ── */
  bassThud(intensity = 1) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    [40, 60, 80].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * (1 + i * 0.1), t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.3, t + 0.25);
      gain.gain.setValueAtTime(0.28 * intensity * (1 - i * 0.08), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.connect(gain);
      gain.connect(this.analyser);
      osc.start(t);
      osc.stop(t + 0.55);
    });

    // Noise burst for punch
    const bufSize = this.ctx.sampleRate * 0.08;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const noise = this.ctx.createBufferSource();
    const noiseGain = this.ctx.createGain();
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 180;
    noise.buffer = buf;
    noiseGain.gain.setValueAtTime(0.15 * intensity, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.analyser);
    noise.start(t);
  }

  /* ── MODE-SPECIFIC SOUND SIGNATURES ── */
  playCinema() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Epic cinematic bass swell
    [28, 42, 56, 84].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i < 2 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, t + i * 0.06);
      osc.frequency.linearRampToValueAtTime(freq * 1.04, t + 0.8);
      gain.gain.setValueAtTime(0, t + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.18 - i * 0.03, t + i * 0.06 + 0.12);
      gain.gain.linearRampToValueAtTime(0.001, t + 1.8);
      osc.connect(gain);
      gain.connect(this.analyser);
      osc.start(t + i * 0.06);
      osc.stop(t + 2);
    });
    // High shimmer
    const shimmer = this.ctx.createOscillator();
    const shimGain = this.ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.value = 4200;
    shimGain.gain.setValueAtTime(0, t + 0.1);
    shimGain.gain.linearRampToValueAtTime(0.015, t + 0.5);
    shimGain.gain.linearRampToValueAtTime(0.001, t + 1.6);
    shimmer.connect(shimGain);
    shimGain.connect(this.analyser);
    shimmer.start(t + 0.1);
    shimmer.stop(t + 1.8);
  }

  playParty() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Energetic kick + rising synth
    [60, 90, 120].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, t + i * 0.09);
      osc.frequency.exponentialRampToValueAtTime(freq * 2.5, t + i * 0.09 + 0.3);
      gain.gain.setValueAtTime(0.12, t + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.4);
      osc.connect(gain);
      gain.connect(this.analyser);
      osc.start(t + i * 0.09);
      osc.stop(t + i * 0.09 + 0.45);
    });
    this.bassThud(0.8);
  }

  playRelax() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Soft chime cluster — pentatonic
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5 E5 G5 C6 E6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t + i * 0.14);
      gain.gain.linearRampToValueAtTime(0.07 - i * 0.008, t + i * 0.14 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.14 + 1.4);
      osc.connect(gain);
      gain.connect(this.analyser);
      osc.start(t + i * 0.14);
      osc.stop(t + i * 0.14 + 1.5);
    });
  }

  playSleep() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Gentle descending tone — fade to silence
    [220, 196, 174.6, 164.8].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t + i * 0.4);
      gain.gain.linearRampToValueAtTime(0.06, t + i * 0.4 + 0.2);
      gain.gain.linearRampToValueAtTime(0.001, t + i * 0.4 + 1.2);
      osc.connect(gain);
      gain.connect(this.analyser);
      osc.start(t + i * 0.4);
      osc.stop(t + i * 0.4 + 1.3);
    });
  }

  /* ── HOVER MICRO-SOUND — subtle tick ── */
  playHover() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(2400, t + 0.04);
    gain.gain.setValueAtTime(0.025, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  /* ── CLICK SOUND — satisfying thunk ── */
  playClick() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start(t);
    osc.stop(t + 0.13);
  }

  /* ── SECTION ENTER — whoosh ── */
  playSectionWhoosh() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufSize = this.ctx.sampleRate * 0.35;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
    const noise = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(200, t);
    filter.frequency.linearRampToValueAtTime(2800, t + 0.3);
    filter.Q.value = 0.6;
    noise.buffer = buf;
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.35);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  /* Get frequency data for visualizer */
  getFrequencyData() {
    if (!this.analyser) return null;
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }
}

/* Singleton */
const audioEngine = new AudioEngine();

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    :root {
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-dim: rgba(201,168,76,0.15);
      --dark: #07080a;
      --dark2: #0d0e11;
      --dark3: #111318;
      --off-white: #f0ece4;
      --muted: rgba(240,236,228,0.45);
    }
    * { box-sizing: border-box; }
    .av-page {
      background: var(--dark);
      color: var(--off-white);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }
    .av-cursor {
      position: fixed; width: 10px; height: 10px;
      background: var(--gold); border-radius: 50%;
      pointer-events: none; z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width .2s, height .2s, background .2s;
      mix-blend-mode: difference;
    }
    .av-cursor-ring {
      position: fixed; width: 36px; height: 36px;
      border: 1px solid rgba(201,168,76,0.5); border-radius: 50%;
      pointer-events: none; z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width .35s cubic-bezier(.22,.68,0,1.2), height .35s cubic-bezier(.22,.68,0,1.2), border-color .25s;
    }
    .av-cursor.hover { width: 20px; height: 20px; }
    .av-cursor-ring.hover { width: 64px; height: 64px; border-color: var(--gold); }
    .font-display { font-family: 'Instrument Serif', 'Cormorant Garamond', serif; }
    .hero-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
      background-size: 80px 80px; pointer-events: none;
    }
    @keyframes wave {
      0%, 100% { transform: scaleY(0.3); }
      50%       { transform: scaleY(1); }
    }
    .wave-bar {
      width: 3px; background: var(--gold); border-radius: 3px;
      transform-origin: bottom;
      animation: wave var(--dur, 1.2s) ease-in-out infinite;
      animation-delay: var(--delay, 0s); opacity: 0.7;
    }
    .wave-bar.audio-active { opacity: 1; background: var(--gold-light); }
    .sr { opacity: 0; transform: translateY(32px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
    .sr.in { opacity: 1; transform: none; }
    .sr-left { opacity: 0; transform: translateX(-32px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
    .sr-left.in { opacity: 1; transform: none; }
    .sr-right { opacity: 0; transform: translateX(32px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
    .sr-right.in { opacity: 1; transform: none; }
    .gold-link { position: relative; display: inline-flex; align-items: center; gap: 6px; }
    .gold-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
      height: 1px; background: var(--gold);
      transform: scaleX(0); transform-origin: left; transition: transform .3s cubic-bezier(.16,1,.3,1);
    }
    .gold-link:hover::after { transform: scaleX(1); }
    .exp-tab {
      position: relative; padding: 14px 28px;
      border: 1px solid rgba(201,168,76,0.15); border-radius: 9999px;
      font-size: 13px; font-weight: 500; letter-spacing: 0.04em;
      color: var(--muted); background: transparent; cursor: none;
      transition: color .25s, border-color .25s, background .25s;
    }
    .exp-tab.active, .exp-tab:hover { color: var(--dark); background: var(--gold); border-color: var(--gold); }
    @keyframes pulse-ring-av {
      0%   { transform: scale(1); opacity: .5; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .pulse-av { position: relative; }
    .pulse-av::before, .pulse-av::after {
      content: ''; position: absolute; inset: 0; border-radius: 50%;
      border: 1px solid var(--gold); animation: pulse-ring-av 2.4s ease-out infinite;
    }
    .pulse-av::after { animation-delay: 1.2s; }
    .spec-card {
      border: 1px solid rgba(201,168,76,0.12); border-radius: 16px;
      background: rgba(255,255,255,0.02);
      transition: border-color .3s, background .3s, transform .35s cubic-bezier(.34,1.56,.64,1);
    }
    .spec-card:hover { border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.04); transform: translateY(-4px); }
    .hscroll-track { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
    .hscroll-track::-webkit-scrollbar { display: none; }
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 0 32px rgba(201,168,76,0.25); }
      50%       { box-shadow: 0 0 64px rgba(201,168,76,0.45); }
    }
    .cta-glow { animation: ctaGlow 3s ease-in-out infinite; }
    .grain::after {
      content: ''; position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
      pointer-events: none; opacity: .5;
    }
    .av-sep { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 40%, rgba(201,168,76,0.2) 60%, transparent); }
    .mode-btn {
      position: relative; overflow: hidden;
      border: 1px solid rgba(201,168,76,0.2); border-radius: 12px;
      padding: 20px 24px; background: rgba(255,255,255,0.02);
      cursor: none; transition: border-color .3s, background .3s; text-align: left;
    }
    .mode-btn::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.1), transparent);
      opacity: 0; transition: opacity .3s;
    }
    .mode-btn:hover, .mode-btn.active { border-color: rgba(201,168,76,0.5); }
    .mode-btn:hover::before, .mode-btn.active::before { opacity: 1; }
    .process-line { position: absolute; left: 20px; top: 32px; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--gold), transparent); }
    .img-zoom { overflow: hidden; border-radius: 20px; }
    .img-zoom img { transition: transform .7s cubic-bezier(.16,1,.3,1); }
    .img-zoom:hover img { transform: scale(1.06); }
    .eyebrow { font-size: 10px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); }

    /* Audio toggle button */
    .audio-toggle {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 52px; height: 52px; border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.35);
      background: rgba(7,8,10,0.88); backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      cursor: none; transition: border-color .25s, transform .2s;
    }
    .audio-toggle:hover { border-color: var(--gold); transform: scale(1.08); }
    .audio-toggle.active { border-color: var(--gold); background: rgba(201,168,76,0.12); }

    /* Live audio indicator */
    .audio-indicator {
      position: fixed; bottom: 90px; right: 22px; z-index: 9998;
      display: flex; align-items: flex-end; gap: 2px; padding: 8px 10px;
      background: rgba(7,8,10,0.82); backdrop-filter: blur(10px);
      border: 1px solid rgba(201,168,76,0.2); border-radius: 10px;
      transition: opacity .4s;
    }
    .audio-indicator.hidden { opacity: 0; pointer-events: none; }

    /* Reactive waveform bar */
    .rwave-bar {
      width: 3px; background: var(--gold); border-radius: 2px;
      transform-origin: bottom; transition: height 0.05s ease;
    }

    @keyframes scrollHint { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

    /* Mode sound flash */
    @keyframes modeFlash {
      0%   { opacity: 0; transform: scale(0.94); }
      30%  { opacity: 1; transform: scale(1); }
      100% { opacity: 1; transform: scale(1); }
    }
    .mode-flash { animation: modeFlash .4s cubic-bezier(.16,1,.3,1); }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM CURSOR (with audio init on first move)
───────────────────────────────────────────────────────────────────────────── */
const Cursor = ({ onFirstInteraction }) => {
  const dot = useRef(null);
  const ring = useRef(null);
  const interacted = useRef(false);

  useEffect(() => {
    const move = (e) => {
      if (dot.current)  { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
      if (!interacted.current) { interacted.current = true; onFirstInteraction?.(); }
    };
    const over = (e) => {
      if (e.target.closest("a,button,.exp-tab,.mode-btn,.audio-toggle")) {
        dot.current?.classList.add("hover"); ring.current?.classList.add("hover");
      } else {
        dot.current?.classList.remove("hover"); ring.current?.classList.remove("hover");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [onFirstInteraction]);

  return (
    <>
      <div className="av-cursor" ref={dot} />
      <div className="av-cursor-ring" ref={ring} />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   REACTIVE WAVEFORM — reads live frequency data from analyser
───────────────────────────────────────────────────────────────────────────── */
const ReactiveWaveform = ({ bars = 28, height = 48, audioActive }) => {
  const barsRef = useRef([]);
  const rafRef = useRef(null);
  const baseHeights = useRef(Array.from({ length: bars }, () => 30 + Math.random() * 70));

  useEffect(() => {
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const freqData = audioActive ? audioEngine.getFrequencyData() : null;

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        let h;
        if (freqData && audioActive) {
          // Map bar index to frequency bin (focus on bass/mid range)
          const binIndex = Math.floor((i / bars) * (freqData.length * 0.6));
          const freqVal = freqData[binIndex] / 255;
          h = Math.max(8, freqVal * 95 + 5);
          bar.style.height = h + "%";
          bar.style.opacity = 0.5 + freqVal * 0.5;
          bar.style.background = freqVal > 0.6
            ? `var(--gold-light)`
            : `var(--gold)`;
        } else {
          // Fallback CSS animation when no audio
          h = baseHeights.current[i];
          bar.style.height = h + "%";
          bar.style.background = "var(--gold)";
          bar.style.opacity = "0.7";
        }
      });
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [audioActive, bars]);

  return (
    <div className="flex items-end gap-[3px]" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className={`wave-bar flex-1 ${audioActive ? "audio-active" : ""}`}
          style={{
            "--dur": `${0.8 + Math.random() * 0.8}s`,
            "--delay": `${(i / bars) * 0.8}s`,
            height: `${baseHeights.current[i]}%`,
          }}
        />
      ))}
    </div>
  );
};

/* Static waveform for non-reactive uses */
const Waveform = ({ bars = 28, height = 48 }) => (
  <div className="flex items-end gap-[3px]" style={{ height }}>
    {Array.from({ length: bars }).map((_, i) => (
      <div key={i} className="wave-bar flex-1"
        style={{
          "--dur": `${0.8 + Math.random() * 0.8}s`,
          "--delay": `${(i / bars) * 0.8}s`,
          height: `${30 + Math.random() * 70}%`,
        }} />
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   AUDIO TOGGLE BUTTON (floating)
───────────────────────────────────────────────────────────────────────────── */
const AudioToggle = ({ audioActive, onToggle }) => (
  <button
    className={`audio-toggle ${audioActive ? "active" : ""}`}
    onClick={onToggle}
    title={audioActive ? "Mute ambient sound" : "Enable ambient sound"}
  >
    {audioActive ? (
      /* Sound on icon */
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="w-5 h-5">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
      </svg>
    ) : (
      /* Sound off icon */
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" className="w-5 h-5">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
    )}
  </button>
);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const solutions = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="3"/></svg>),
    name: "Home Theatre", tag: "Cinema",
    desc: "Dolby Atmos surround, 8K projection, and acoustically tuned rooms that rival commercial cinemas.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>),
    name: "Multi-Room Audio", tag: "Distributed",
    desc: "Seamless hi-res audio flowing through every zone — synchronized or independent, on demand.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M12 22V12"/><path d="M8 12h8"/></svg>),
    name: "Outdoor Audio", tag: "Weather-proof",
    desc: "Architectural landscape speakers that blend into your garden while delivering studio-grade fidelity.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>),
    name: "Media Rooms", tag: "Versatile",
    desc: "Gaming, streaming, sports — one room engineered to excel at every immersive experience.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>),
    name: "Acoustic Treatment", tag: "Science",
    desc: "Room calibration, absorption panels, diffusers, and bass traps for perfect acoustic balance.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>),
    name: "Sound Insulation", tag: "Isolation",
    desc: "Structural isolation, decoupled walls, and mass-loaded vinyl to contain sound perfectly.",
  },
];

const expZones = [
  {
    id: "theatre", label: "Home Theatre",
    headline: "Step inside a private cinema",
    body: "Our Experience Centre features a fully calibrated Dolby Atmos 7.2.4 theatre room. Sit in a reference listening position and hear the difference between speaker placement, room treatment, and raw output — before you commit to a single rupee.",
    specs: ["Dolby Atmos 7.2.4", "4K laser projection", "Acoustic panels + diffusers", "Reference seating position"],
  },
  {
    id: "audio", label: "Hi-Fi Listening",
    headline: "Hear what you've been missing",
    body: "A dedicated stereo listening room with TruAudio architectural in-walls and in-ceilings driven by premium amplification. Compare speaker models side-by-side in a properly treated space — not a showroom or a mall.",
    specs: ["TruAudio architectural speakers", "Room EQ Wizard calibration", "A/B switching between models", "Hi-Res FLAC streaming"],
  },
  {
    id: "control", label: "Smart Control",
    headline: "One touch. Everything.",
    body: "Live demonstration of whole-home audio, motorized shades, lighting scenes, and climate — all triggered from a single button press or voice command. See Control4 and KNX integration working in a real environment.",
    specs: ["Control4 live demo", "Voice + app + keypad control", "Multi-zone scene switching", "Lighting + AV integration"],
  },
  {
    id: "insulation", label: "Acoustic Lab",
    headline: "The science of silence",
    body: "Walk between our treated and untreated rooms and hear the physical difference acoustic isolation makes. We demonstrate mass-loaded vinyl, decoupled flooring, and absorption coefficients — so you understand exactly what you're buying.",
    specs: ["STC-rated wall assemblies", "Floating floor demo", "Before/after comparison", "Reverberation time measurement"],
  },
];

const features = [
  {
    label: "Visual Excellence", title: "Breathtaking Home Theatre",
    body: "Transform any room into a world-class cinema. We combine 4K laser projection, acoustically transparent screens, and Dolby Atmos surround sound to transport you directly into the action.",
    bullets: ["Dolby Atmos 7.2.4 calibration", "Acoustic treatment + diffusion design", "One-touch cinema control", "Light-controlled dedicated room"],
    img: "/assets/av1.png", imgAlt: "Home Theatre", reverse: false,
  },
  {
    label: "Ubiquitous Sound", title: "Whole Home Audio",
    body: "Music that follows you seamlessly — different tracks in every room, or the same symphony throughout the house. Invisible in-ceiling and in-wall speakers deliver extraordinary sound without compromising your interior design.",
    bullets: ["32+ independent audio zones", "Hi-Res FLAC & lossless streaming", "In-wall / in-ceiling architectural install", "App, voice, and keypad control"],
    img: "/assets/av2.png", imgAlt: "Whole Home Audio", reverse: true,
    stat1: { value: "32+", label: "Audio Zones" }, stat2: { value: "Hi-Res", label: "Audio Quality" },
  },
];

const whyCards = [
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>), title: "Premium US Brand", desc: "TruAudio is a globally recognized leader in architectural audio innovation, trusted by luxury integrators worldwide." },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>), title: "Architectural Design", desc: "Speakers that disappear into your walls and ceilings — invisible installations that preserve premium interiors." },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>), title: "End-to-End Service", desc: "From acoustic design and room treatment to installation, calibration, and long-term support — everything in-house." },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg>), title: "Smart Integration", desc: "Fully compatible with Control4, KNX, and major smart home ecosystems for unified single-app control." },
];

const procesSteps = [
  { num: "01", title: "Consultation", desc: "We assess your space, lifestyle, and acoustic goals in a detailed discovery session." },
  { num: "02", title: "Acoustic Design", desc: "Room analysis, speaker placement modeling, and treatment design — before a single wall is opened." },
  { num: "03", title: "Experience Demo", desc: "Visit our Experience Centre to hear your proposed setup in a calibrated environment." },
  { num: "04", title: "Installation", desc: "Our certified engineers install, terminate, and calibrate every component with precision." },
  { num: "05", title: "Calibration", desc: "Room EQ Wizard, Dolby Atmos height mapping, and reference-standard tuning for your room." },
];

const modes = [
  { id: "cinema", label: "Cinema Mode", icon: "🎬", desc: "Dolby Atmos activated. Lights dim. Shades close. Pure cinema." },
  { id: "party",  label: "Party Mode",  icon: "🎉", desc: "Multi-room audio syncs. Volume up. Bass optimized." },
  { id: "relax",  label: "Relax Mode",  icon: "🌿", desc: "Ambient music. 30% volume. Warm light scenes." },
  { id: "sleep",  label: "Sleep Mode",  icon: "🌙", desc: "Audio fades to silence over 20 minutes. All zones off." },
];

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const AudioVideo = () => {
  const [activeZone, setActiveZone] = useState("theatre");
  const [activeMode, setActiveMode] = useState("cinema");
  const [audioActive, setAudioActive] = useState(false);
  const [audioInited, setAudioInited] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lastHoverSound = useRef(0);

  /* Init audio on first mouse interaction */
  const handleFirstInteraction = useCallback(() => {
    if (audioInited) return;
    audioEngine.init();
    setAudioInited(true);
  }, [audioInited]);

  /* Toggle ambient bass */
  const toggleAudio = useCallback(() => {
    if (!audioInited) { audioEngine.init(); setAudioInited(true); }
    audioEngine.resume();
    audioEngine.playClick();
    if (!audioActive) {
      audioEngine.startAmbient();
      setAudioActive(true);
    } else {
      audioEngine.stopAmbient();
      setAudioActive(false);
    }
  }, [audioActive, audioInited]);

  /* Mode button click — play signature sound */
  const handleModeClick = useCallback((modeId) => {
    if (!audioInited) return;
    audioEngine.resume();
    setActiveMode(modeId);
    switch (modeId) {
      case "cinema": audioEngine.playCinema(); break;
      case "party":  audioEngine.playParty();  break;
      case "relax":  audioEngine.playRelax();  break;
      case "sleep":  audioEngine.playSleep();  break;
    }
  }, [audioInited]);

  /* Zone tab click */
  const handleZoneClick = useCallback((zoneId) => {
    if (audioInited) { audioEngine.resume(); audioEngine.playClick(); }
    setActiveZone(zoneId);
  }, [audioInited]);

  /* Hover micro-sound — throttled to every 120ms */
  const handleButtonHover = useCallback(() => {
    if (!audioInited) return;
    const now = Date.now();
    if (now - lastHoverSound.current < 120) return;
    lastHoverSound.current = now;
    audioEngine.resume();
    audioEngine.playHover();
  }, [audioInited]);

  /* CTA click — bass thud */
  const handleCtaClick = useCallback(() => {
    if (!audioInited) return;
    audioEngine.resume();
    audioEngine.bassThud(1.2);
  }, [audioInited]);

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".sr, .sr-left, .sr-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const currentZone = expZones.find((z) => z.id === activeZone);

  return (
    <div className="av-page grain">
      <GlobalStyles />
      <Cursor onFirstInteraction={handleFirstInteraction} />

      {/* Floating Audio Toggle */}
      <AudioToggle audioActive={audioActive} onToggle={toggleAudio} />

      {/* Live indicator dots */}
      <div className={`audio-indicator ${audioActive ? "" : "hidden"}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rwave-bar" style={{ height: "8px", width: "3px" }} />
        ))}
        <span style={{ fontSize: "9px", color: "var(--gold)", marginLeft: "4px", letterSpacing: "0.1em", fontWeight: 600 }}>LIVE</span>
      </div>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="hero-grid" />
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#07080a] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-35" alt="Luxury Home Theatre"
          />
        </motion.div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none z-[1]"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,.08), transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full pointer-events-none z-[1]"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,.06), transparent 70%)", filter: "blur(50px)" }} />

        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-[960px] mx-auto px-6 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 border border-[rgba(201,168,76,0.25)] rounded-full bg-[rgba(201,168,76,0.07)] mb-10">
            <ReactiveWaveform bars={8} height={14} audioActive={audioActive} />
            <span className="eyebrow text-[10px]">TruAudio · Premium AV · India</span>
            <ReactiveWaveform bars={8} height={14} audioActive={audioActive} />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .25, ease: [.16,1,.3,1] }}
            className="font-display text-[clamp(3rem,7.5vw,6.2rem)] font-light leading-[1.02] tracking-[-0.025em] mb-6">
            Experience<br />
            <em className="not-italic" style={{ color: "var(--gold)" }}>Sound.</em>{" "}
            Feel Every<br />
            <span className="text-white/50">Moment.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .44 }}
            className="text-base md:text-lg text-white/50 max-w-[520px] leading-relaxed mb-10">
            Architectural audio-video solutions for luxury residences — from Dolby Atmos
            home theatres to whole-home audio, designed and calibrated to reference standards.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .58 }}
            className="flex flex-wrap gap-3 justify-center mb-16">
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-[var(--dark)] cta-glow"
              style={{ background: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={handleButtonHover}
              onClick={handleCtaClick}>
              Book Private Demo
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white/80"
              style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={handleButtonHover}
              onClick={() => audioInited && (audioEngine.resume(), audioEngine.playClick())}>
              Explore Collections
            </button>
          </motion.div>

          {/* Live reactive waveform hero */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}
            className="w-full max-w-[380px]">
            <ReactiveWaveform bars={48} height={40} audioActive={audioActive} />
          </motion.div>

          {/* Audio hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="mt-5 flex items-center gap-2 text-white/20 text-[11px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
            <span>Click the sound button (bottom-right) to feel the bass</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="eyebrow text-[9px] text-white/30">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" className="w-4 h-4" style={{ animation: "scrollHint 2s ease-in-out infinite" }}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ══ STORY ══ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-28">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="sr-left flex-1">
            <span className="eyebrow block mb-4">Designed for Luxury Living</span>
            <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.1] tracking-tight mb-7">
              We don't install speakers.<br />
              <em style={{ color: "var(--gold)" }}>We architect experiences.</em>
            </h2>
            <p className="text-white/50 leading-relaxed mb-4 text-[15px]">
              At IoTrenetics, every project begins with listening — to you, to your space, and to the
              acoustics of your rooms. We partner with TruAudio to bring world-class architectural
              audio that becomes invisible in your interiors while filling every room with crystal-clear sound.
            </p>
            <p className="text-white/40 leading-relaxed text-[15px] mb-8">
              From the first acoustic simulation to the final calibration sweep, we're with you
              at every step — ensuring your investment delivers a reference-standard result.
            </p>
            <div className="av-sep w-16 mb-8" />
            <div className="flex items-center gap-6">
              {[["32+","Zone Capacity"],["7.2.4","Dolby Atmos"],["4K","Laser Projection"]].map(([val, lbl], i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-10 bg-white/10" />}
                  <div className="text-center">
                    <div className="font-display text-3xl" style={{ color: "var(--gold)" }}>{val}</div>
                    <div className="eyebrow text-[9px] mt-1">{lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sr-right flex-1">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl opacity-20"
                style={{ background: "radial-gradient(ellipse, var(--gold), transparent 70%)", filter: "blur(30px)" }} />
              <div className="img-zoom relative z-10 border border-white/8">
                <img src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2070&auto=format&fit=crop" className="w-full" alt="Luxury Audio" />
              </div>
              <div className="absolute -bottom-5 -left-5 z-20 px-5 py-3 rounded-xl border"
                style={{ background: "var(--dark2)", borderColor: "rgba(201,168,76,0.2)" }}>
                <div className="eyebrow text-[9px] mb-1">TruAudio Partner</div>
                <div className="text-white text-sm font-semibold">Certified Installer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══ SOLUTIONS ══ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="sr text-center mb-14">
          <span className="eyebrow block mb-3">Sonic Solutions</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            Tailored for every space<br />in your <em style={{ color: "var(--gold)" }}>estate</em>
          </h2>
        </div>
        <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <div key={i} className="spec-card p-6 flex flex-col gap-4 group"
              onMouseEnter={handleButtonHover}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ background: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.15)", color: "var(--gold)" }}>
                {s.icon}
              </div>
              <div>
                <span className="eyebrow text-[9px] block mb-2">{s.tag}</span>
                <h3 className="font-display text-xl font-light mb-2">{s.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══ EXPERIENCE CENTRE ══ */}
      <section className="py-24" style={{ background: "var(--dark2)" }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="sr text-center mb-14">
            <span className="eyebrow block mb-3">Experience Centre</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight mb-4">
              Hear it before you buy it
            </h2>
            <p className="text-white/40 max-w-[480px] mx-auto text-sm leading-relaxed">
              Our dedicated AV Experience Centre lets you audition every system in
              a properly designed reference environment — not a showroom, not a mall.
            </p>
          </div>
          <div className="sr flex flex-wrap justify-center gap-2 mb-10">
            {expZones.map((z) => (
              <button key={z.id}
                onClick={() => handleZoneClick(z.id)}
                onMouseEnter={handleButtonHover}
                className={`exp-tab ${activeZone === z.id ? "active" : ""}`}>
                {z.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeZone}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [.16,1,.3,1] }}
              className="rounded-2xl border overflow-hidden mode-flash"
              style={{ borderColor: "rgba(201,168,76,0.15)", background: "var(--dark3)" }}>
              <div className="p-8 sm:p-10 flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
                    style={{ background: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.2)" }}>
                    <div className="pulse-av w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                    <span className="eyebrow text-[9px]">Live Demo Available</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light mb-4">{currentZone.headline}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-[440px]">{currentZone.body}</p>
                  <Link to="/contact"
                    className="gold-link inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--gold)" }}
                    onMouseEnter={handleButtonHover}>
                    Book this demo
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentZone.specs.map((spec, i) => (
                    <div key={i} className="spec-card px-4 py-3 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                      <span className="text-sm text-white/60">{spec}</span>
                    </div>
                  ))}
                  <div className="sm:col-span-2 pt-4">
                    <ReactiveWaveform bars={36} height={36} audioActive={audioActive} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══ FEATURE BLOCKS ══ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24 flex flex-col gap-28">
        {features.map((f, fi) => (
          <div key={fi} className={`flex flex-col ${f.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-14 lg:gap-20`}>
            <div className={`w-full lg:w-1/2 ${f.reverse ? "sr-right" : "sr-left"}`}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl opacity-15"
                  style={{ background: "radial-gradient(ellipse, var(--gold), transparent 70%)", filter: "blur(30px)" }} />
                <div className="img-zoom relative z-10 border border-white/8">
                  <img src={f.img} alt={f.imgAlt} className="w-full" />
                </div>
              </div>
            </div>
            <div className={`w-full lg:w-1/2 ${f.reverse ? "sr-left" : "sr-right"}`}>
              <span className="eyebrow block mb-3">{f.label}</span>
              <h3 className="font-display text-3xl sm:text-4xl font-light leading-[1.1] tracking-tight mb-5">{f.title}</h3>
              <p className="text-white/45 text-[15px] leading-relaxed mb-6">{f.body}</p>
              <ul className="flex flex-col gap-3 mb-7">
                {f.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                    {b}
                  </li>
                ))}
              </ul>
              {f.stat1 && (
                <div className="flex gap-4">
                  {[f.stat1, f.stat2].map((st) => (
                    <div key={st.label} className="spec-card px-5 py-4 text-center">
                      <div className="font-display text-2xl mb-1" style={{ color: "var(--gold)" }}>{st.value}</div>
                      <div className="eyebrow text-[9px]">{st.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══ PARALLAX IMPACT ══ */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10" />
          <img src="https://images.unsplash.com/photo-1516054653923-3e3f201dd53a?q=80&w=2072&auto=format&fit=crop"
            className="w-full h-full object-cover" alt="Sound depth" style={{ transform: "scale(1.1)" }} />
        </div>
        <div className="relative z-20 text-center px-6 sr">
          <div className="mb-4"><ReactiveWaveform bars={20} height={28} audioActive={audioActive} /></div>
          <h2 className="font-display text-4xl sm:text-6xl font-light tracking-tight">
            Feel the <em style={{ color: "var(--gold)" }}>Depth</em> of Sound
          </h2>
          <p className="text-white/40 mt-4 text-sm">When every frequency finds its perfect place in your room.</p>
        </div>
      </section>

      {/* ══ WHY ══ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="sr text-center mb-14">
          <span className="eyebrow block mb-3">Why Choose Us</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            Innovation meets <em style={{ color: "var(--gold)" }}>elegance</em>
          </h2>
        </div>
        <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyCards.map((w, i) => (
            <div key={i} className="spec-card p-7 flex flex-col gap-4 group relative overflow-hidden"
              onMouseEnter={handleButtonHover}>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500"
                style={{ color: "var(--gold)", transform: "scale(2.5) translate(10%, -10%)" }}>{w.icon}</div>
              <div className="text-[var(--gold)]">{w.icon}</div>
              <h3 className="font-display text-xl font-light">{w.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══ PROCESS ══ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="sr mb-14">
          <span className="eyebrow block mb-3">How We Work</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            From concept to <em style={{ color: "var(--gold)" }}>calibration</em>
          </h2>
        </div>
        <div className="sr flex flex-col gap-0">
          {procesSteps.map((step, i) => (
            <div key={i} className="relative flex gap-8 pb-10 last:pb-0">
              {i < procesSteps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px"
                  style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.05))" }} />
              )}
              <div className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center z-10"
                style={{ background: "var(--dark2)", borderColor: "rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                <span className="text-[11px] font-bold">{step.num}</span>
              </div>
              <div className="pt-1.5">
                <h4 className="font-display text-xl font-light mb-1">{step.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed max-w-[480px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══ SMART MODES — with audio signatures ══ */}
      <section className="py-24" style={{ background: "var(--dark2)" }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="sr text-center mb-12">
            <span className="eyebrow block mb-3">One Touch Control</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
              Automate your <em style={{ color: "var(--gold)" }}>atmosphere</em>
            </h2>
            <p className="text-white/30 text-xs mt-3">
              {audioInited ? "Click each mode to hear its sound signature" : "Enable audio (bottom-right) then click modes"}
            </p>
          </div>

          <div className="sr grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {modes.map((m) => (
              <button key={m.id}
                onClick={() => handleModeClick(m.id)}
                onMouseEnter={handleButtonHover}
                className={`mode-btn ${activeMode === m.id ? "active" : ""}`}>
                <div className="text-xl mb-3">{m.icon}</div>
                <div className="font-display text-lg font-light mb-1">{m.label}</div>
                <div className="text-white/35 text-xs leading-relaxed">{m.desc}</div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeMode}
              initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: .35 }}
              className="rounded-2xl p-6 border flex items-center gap-4"
              style={{ background: "var(--dark3)", borderColor: "rgba(201,168,76,0.15)" }}>
              <div className="pulse-av w-3 h-3 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
              <span className="text-white/50 text-sm">
                <span style={{ color: "var(--gold-light)" }} className="font-semibold">{modes.find(m => m.id === activeMode)?.label}</span>
                {" "}— {modes.find(m => m.id === activeMode)?.desc}
              </span>
              <ReactiveWaveform bars={16} height={20} audioActive={audioActive} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08), transparent 70%)" }} />
        <div className="absolute inset-0 border-y" style={{ borderColor: "rgba(201,168,76,0.1)" }} />
        <div className="relative max-w-[700px] mx-auto px-6 text-center sr">
          <span className="eyebrow block mb-5">Ready to Begin</span>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] tracking-tight mb-6">
            Ready to transform<br />
            <em style={{ color: "var(--gold)" }}>your space?</em>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-[440px] mx-auto mb-10">
            Let our experts design the perfect acoustic environment for your luxury residence.
            Visit our Experience Centre or schedule a private consultation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[var(--dark)] cta-glow"
              style={{ background: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={handleButtonHover}
              onClick={handleCtaClick}>
              Book Consultation
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-white/70"
              style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={handleButtonHover}>
              Visit Experience Centre
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AudioVideo;
