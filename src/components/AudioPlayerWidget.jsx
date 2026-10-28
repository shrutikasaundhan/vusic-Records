import React from 'react';
import { useAudio } from '../context/AudioContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ExternalLink
} from 'lucide-react';

export const AudioPlayerWidget = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    progress, 
    duration, 
    seek, 
    volume, 
    setVolume 
  } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '10px 1.5rem',
      zIndex: 999,
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Progress Bar Top */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: '#e2e8f0',
          cursor: 'pointer'
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = clickX / rect.width;
          seek(ratio * duration);
        }}
      >
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'var(--primary-red)',
          borderRadius: '0 2px 2px 0'
        }} />
      </div>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        maxWidth: '1240px'
      }}>
        {/* Track Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
          <img 
            src={currentTrack.coverArtUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100'} 
            alt={currentTrack.title}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '1px solid #e2e8f0'
            }}
          />
          <div>
            <div style={{ 
              fontWeight: 700, 
              fontSize: '0.92rem', 
              color: '#0f172a', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}>
              <span>{currentTrack.title}</span>
              {isPlaying && (
                <div className="equalizer-bars">
                  <div className="equalizer-bar" style={{ height: '14px' }}></div>
                  <div className="equalizer-bar" style={{ height: '10px' }}></div>
                  <div className="equalizer-bar" style={{ height: '16px' }}></div>
                </div>
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              {currentTrack.primaryArtist} {currentTrack.featuredArtists ? `• ${currentTrack.featuredArtists}` : ''}
            </div>
          </div>
        </div>

        {/* Center Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          flex: 1,
          maxWidth: '500px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={togglePlay}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--primary-red)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(255, 46, 77, 0.3)'
              }}
            >
              {isPlaying ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" style={{ marginLeft: '2px' }} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', fontSize: '0.75rem', color: '#64748b' }}>
            <span>{formatTime(progress)}</span>
            <input 
              type="range"
              min="0"
              max={duration || 100}
              value={progress || 0}
              onChange={(e) => seek(Number(e.target.value))}
              style={{
                flex: 1,
                accentColor: 'var(--primary-red)',
                height: '4px',
                cursor: 'pointer'
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & External Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '180px', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {volume === 0 ? <VolumeX size={16} color="#64748b" /> : <Volume2 size={16} color="#64748b" />}
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{ width: '65px', accentColor: 'var(--primary-red)', height: '4px', cursor: 'pointer' }}
            />
          </div>

          <a 
            href="https://open.spotify.com" 
            target="_blank" 
            rel="noreferrer"
            title="Stream on Spotify"
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              background: '#dcfce7',
              color: '#15803d',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Spotify <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
