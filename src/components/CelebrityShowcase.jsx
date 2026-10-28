import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Flame } from 'lucide-react';

export const CelebrityShowcase = () => {
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const artists = [
    {
      id: 'artist_shaan',
      name: 'SHAAN',
      role: 'Bollywood Playback Legend',
      image: 'https://vusicrecords.com/assets/PhotoLab_app__IMG_20201006_104348-1-150x150.jpg',
      streams: '45M+ Streams',
      track: {
        _id: 'sample_shaan',
        title: 'Chand Sifarish (Vusic Acoustic)',
        primaryArtist: 'Shaan',
        coverArtUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
      }
    },
    {
      id: 'artist_javed',
      name: 'JAVED ALI',
      role: 'Sufi & Bollywood Virtuoso',
      image: 'https://vusicrecords.com/assets/JA-150x150.jpg',
      streams: '38M+ Streams',
      track: {
        _id: 'sample_javed',
        title: 'Kun Faya Kun (Sufi Sessions)',
        primaryArtist: 'Javed Ali',
        coverArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=melody-of-nature-15682.mp3'
      }
    },
    {
      id: 'artist_geetha',
      name: 'GEETHA MADHURI',
      role: 'South Indian Singing Icon',
      image: 'https://vusicrecords.com/assets/PhotoLab_app__IMG_20201006_102119-150x150.jpg',
      streams: '29M+ Streams',
      track: {
        _id: 'sample_geetha',
        title: 'Magaallu (Folk Trance)',
        primaryArtist: 'Geetha Madhuri',
        coverArtUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77342.mp3?filename=electronic-future-beats-117997.mp3'
      }
    },
    {
      id: 'artist_jubin',
      name: 'JUBIN NAUTIYAL',
      role: 'Chart-Topping Melodist',
      image: 'https://vusicrecords.com/assets/PhotoLab_app__IMG_20201006_113806-150x150.jpg',
      streams: '80M+ Streams',
      track: {
        _id: 'sample_jubin',
        title: 'Raataan Lambiyan (Reprise)',
        primaryArtist: 'Jubin Nautiyal',
        coverArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
      }
    },
    {
      id: 'artist_vijay',
      name: 'VIJAY PRAKASH',
      role: 'National Award Winner',
      image: 'https://vusicrecords.com/assets/PhotoLab_app__IMG_20201006_114014-150x150.jpg',
      streams: '22M+ Streams',
      track: {
        _id: 'sample_vijay',
        title: 'Jai Ho (Acoustic Rhythm)',
        primaryArtist: 'Vijay Prakash',
        coverArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=melody-of-nature-15682.mp3'
      }
    },
    {
      id: 'artist_ami',
      name: 'AMI MISHRA',
      role: 'Composer & Independent Star',
      image: 'https://vusicrecords.com/assets/AM-150x150.jpg',
      streams: '19M+ Streams',
      track: {
        _id: 'sample_ami',
        title: 'Hasi Ban Gaye (Raw Soul)',
        primaryArtist: 'Ami Mishra',
        coverArtUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=melody-of-nature-15682.mp3'
      }
    }
  ];

  return (
    <section className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Artists First</span>
          <h2 className="section-title">
            Celebrated Artists On <span className="text-gradient">Vusic Records</span>
          </h2>
          <p className="section-subtitle">
            From Bollywood & Punjabi to South Indian and independent stars, we power the music distribution of India's biggest icons.
          </p>
        </div>

        {/* Artist Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {artists.map((artist) => {
            const isThisTrackPlaying = currentTrack?._id === artist.track._id && isPlaying;
            return (
              <div 
                key={artist.id}
                className="glass-card"
                style={{
                  textAlign: 'center',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #ff2e4d',
                      boxShadow: '0 4px 12px rgba(255, 46, 77, 0.2)'
                    }}
                  />
                  <button
                    onClick={() => playTrack(artist.track)}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-red)',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(255, 46, 77, 0.4)'
                    }}
                    title={`Preview ${artist.name}`}
                  >
                    {isThisTrackPlaying ? <Pause size={14} fill="#fff" /> : <Play size={14} fill="#fff" style={{ marginLeft: '1px' }} />}
                  </button>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  {artist.name}
                </h4>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>
                  {artist.role}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#7c3aed',
                  background: '#ede9fe',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {artist.streams}
                </div>
              </div>
            );
          })}
        </div>

        {/* Viral Campaign Spotlight (Deepika Padukone & Epigamia) */}
        <div className="glass-card" style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <span className="badge badge-red">
                <Flame size={14} /> Viral Campaign Spotlight
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Delivered in Record 24 Hours</span>
            </div>

            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3, color: '#0f172a' }}>
              How Vusic Records Powered Epigamia’s Viral Campaign with <span className="text-gradient">Deepika Padukone</span>
            </h3>

            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              When lifestyle giant <strong>Epigamia</strong> launched their pan-India celebrity digital campaign starring <strong>Deepika Padukone</strong>, they needed official sound fingerprinting, Instagram Reels audio library whitelisting, and mobile caller tune distribution activated across India in a record 24 hours.
            </p>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-red)' }}>24 Hours</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Turnaround Time</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7c3aed' }}>50M+</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Campaign Reach</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Copyright Fingerprinted</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img 
              src="https://vusicrecords.com/assets/Ewq9sWzVIAc11dq.jpg" 
              alt="Epigamia x Deepika Padukone campaign"
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: '#0f172a',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              ⭐ Official Sound Distribution by Vusic Records Pvt. Ltd.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
