import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface TTSPlayerProps {
  title?: string;
  textToSpeak: string;
  defaultVoice?: string;
  compact?: boolean;
}

export const TTSPlayer: React.FC<TTSPlayerProps> = ({
  title = 'Voice Narration',
  textToSpeak,
  defaultVoice = 'Kore',
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>(defaultVoice);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset audio if text changes
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setAudioUrl(null);
    setError(null);
  }, [textToSpeak]);

  const handleGenerateAndPlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioUrl && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      } catch (err) {
        console.warn('Playback error, regenerating audio...', err);
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          voice: selectedVoice,
          style: 'Scholarly, authoritative, calm and clear technical narration',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to synthesize speech');
      }

      const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
      setAudioUrl(audioSrc);

      const audio = new Audio(audioSrc);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setError('Playback failed.');
      };

      await audio.play();
      setIsPlaying(true);
    } catch (err: any) {
      console.error('TTS synthesis error:', err);
      setError(err.message || 'TTS service temporarily unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleGenerateAndPlay}
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause speech' : 'Play text to speech'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          ) : isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-cyan-400 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
          )}
          <span>{isPlaying ? 'Pause' : 'Listen'}</span>
        </button>
        {error && <span className="text-[10px] text-rose-400 truncate max-w-[120px]">{error}</span>}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">{title}</h4>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Powered by gemini-3.8-flash-tts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <label htmlFor="voice-select" className="text-[11px] text-slate-400 mr-1">Voice:</label>
          <select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => {
              setSelectedVoice(e.target.value);
              setAudioUrl(null);
            }}
            className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="Kore">Kore (Clear / Scholarly)</option>
            <option value="Puck">Puck (Energetic / Tech)</option>
            <option value="Fenrir">Fenrir (Authoritative / Baritone)</option>
            <option value="Zephyr">Zephyr (Warm / Conversational)</option>
            <option value="Charon">Charon (Deep / Deliberate)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerateAndPlay}
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white flex items-center justify-center shadow-md active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        <div className="flex-1 bg-slate-950/80 border border-slate-800/80 rounded-xl px-3 py-2 flex items-center gap-2">
          {/* Animated Waveform Bars */}
          <div className="flex items-end gap-1 h-6 w-28">
            {[40, 75, 55, 90, 60, 30, 85, 70, 95, 45, 65, 80].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-cyan-400 animate-pulse'
                    : 'bg-slate-700'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.8)))}%` : '20%',
                  animationDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>

          <div className="text-[11px] text-slate-400 truncate flex-1 pl-2">
            {isLoading
              ? 'Synthesizing voice with Gemini...'
              : isPlaying
              ? 'Now reading executive abstract...'
              : 'Tap Play to listen to voice synthesis'}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-[11px] text-rose-400 flex items-center gap-1.5 bg-rose-950/30 border border-rose-800/50 rounded-lg px-2.5 py-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
