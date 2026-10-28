import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone,
  ShieldCheck
} from 'lucide-react';

export const UploadMusicPage = ({ setActivePage }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    primaryArtist: user?.artistOrLabelName || user?.name || '',
    featuredArtists: '',
    composer: '',
    lyricist: '',
    labelName: user?.role === 'label' ? user.artistOrLabelName : 'Vusic Records',
    genre: 'Bollywood Pop',
    language: 'Hindi',
    releaseDate: new Date().toISOString().split('T')[0],
    callerTuneStartTime: '00:30',
    youtubeContentId: true,
    coverArtUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    platforms: [
      'Spotify',
      'Apple Music',
      'JioSaavn',
      'Gaana',
      'Wynk Music',
      'YouTube Music',
      'Instagram Reels & FB',
      'Jio Caller Tune',
      'Airtel Hello Tunes',
      'Amazon Music'
    ]
  });

  if (!isAuthenticated) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <Upload size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Artist Account Required
            </h2>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Please login or create your Vusic Records artist account to upload music and distribute to 150+ stores.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setActivePage('login')} className="btn btn-secondary">
                Login
              </button>
              <button onClick={() => setActivePage('register')} className="btn btn-primary">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => {
      const exists = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: exists 
          ? prev.platforms.filter(p => p !== platform)
          : [...prev.platforms, platform]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await api.createRelease(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setActivePage('dashboard');
        }, 1500);
      } else {
        setError(res.message || 'Failed to submit release');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableStores = [
    'Spotify',
    'Apple Music',
    'JioSaavn',
    'Gaana',
    'Wynk Music',
    'YouTube Music',
    'Instagram Reels & FB',
    'Jio Caller Tune',
    'Airtel Hello Tunes',
    'VI Caller Tunes',
    'Amazon Music',
    'TikTok / ByteDance',
    'Hungama Play',
    'TIDAL',
    'Deezer'
  ];

  return (
    <div className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Distribution Portal</span>
          <h1 className="section-title">
            Submit New <span className="text-gradient">Song Release</span>
          </h1>
          <p className="section-subtitle">
            Upload your track, configure caller tunes, set release date, and distribute to 150+ stores worldwide.
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          position: 'relative',
          padding: '0 1rem'
        }}>
          {[
            { num: 1, label: 'Track Info' },
            { num: 2, label: 'Audio & CRBT' },
            { num: 3, label: 'Artwork' },
            { num: 4, label: 'Stores & Review' }
          ].map((st) => (
            <div 
              key={st.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                zIndex: 1,
                cursor: 'pointer'
              }}
              onClick={() => setCurrentStep(st.num)}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: currentStep >= st.num ? 'var(--primary-red)' : '#f1f5f9',
                color: currentStep >= st.num ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: currentStep === st.num ? '2px solid var(--primary-red)' : '1px solid #e2e8f0',
                transition: 'all 0.15s'
              }}>
                {st.num}
              </div>
              <span style={{
                fontSize: '0.78rem',
                color: currentStep === st.num ? '#0f172a' : '#64748b',
                fontWeight: currentStep === st.num ? 700 : 500
              }}>
                {st.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="glass-card" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.88rem'
            }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{
              background: '#d1fae5',
              border: '1px solid #a7f3d0',
              color: '#059669',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 700
            }}>
              🎉 Song submitted successfully! Redirecting to dashboard...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Track Details */}
            {currentStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                  Track Title & Credits
                </h3>

                <div className="form-group">
                  <label className="form-label">Song / Track Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Dilbar Jani, Rangreza Re"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Primary Artist Name *</label>
                    <input
                      type="text"
                      name="primaryArtist"
                      required
                      placeholder="e.g. Aaryan Sharma"
                      value={formData.primaryArtist}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Featured Artist(s) (Optional)</label>
                    <input
                      type="text"
                      name="featuredArtists"
                      placeholder="e.g. Shaan, Javed Ali"
                      value={formData.featuredArtists}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Composer / Music Director</label>
                    <input
                      type="text"
                      name="composer"
                      placeholder="Composer name"
                      value={formData.composer}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Lyricist / Songwriter</label>
                    <input
                      type="text"
                      name="lyricist"
                      placeholder="Lyricist name"
                      value={formData.lyricist}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">Genre</label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Bollywood Pop">Bollywood Pop</option>
                      <option value="Bollywood Sufi">Bollywood Sufi</option>
                      <option value="Punjabi Pop">Punjabi Pop</option>
                      <option value="Romantic Ballad">Romantic Ballad</option>
                      <option value="Devotional / Bhajan">Devotional / Bhajan</option>
                      <option value="Hip Hop / Rap">Hip Hop / Rap</option>
                      <option value="EDM / Electronic">EDM / Electronic</option>
                      <option value="Folk / Regional">Folk / Regional</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Hindi">Hindi</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Bhojpuri">Bhojpuri</option>
                      <option value="Bengali">Bengali</option>
                      <option value="English">English</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Sanskrit">Sanskrit</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Release Date</label>
                    <input
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Audio & Caller Tune */}
            {currentStep === 2 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                  Audio File & Mobile Caller Tune Setup
                </h3>

                <div className="form-group">
                  <label className="form-label">Audio Track URL (WAV / 320kbps MP3)</label>
                  <input
                    type="url"
                    name="audioUrl"
                    placeholder="https://..."
                    value={formData.audioUrl}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                    Tip: Pre-filled with sample audio for instant testing.
                  </div>
                </div>

                <div className="glass-card" style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Smartphone size={20} color="#7c3aed" />
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                      Telecom Caller Tune (CRBT) Clip Selection
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '1rem' }}>
                    Select the exact chorus start time for JioTune, Airtel Hello Tune, and Vodafone Idea. (e.g. 00:30 for chorus).
                  </p>

                  <div className="form-group" style={{ maxWidth: '200px', marginBottom: 0 }}>
                    <label className="form-label">Chorus Start (MM:SS)</label>
                    <input
                      type="text"
                      name="callerTuneStartTime"
                      placeholder="00:30"
                      value={formData.callerTuneStartTime}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '1rem',
                  background: '#fff1f2',
                  border: '1px solid #fecdd3',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <input
                    type="checkbox"
                    id="ytId"
                    name="youtubeContentId"
                    checked={formData.youtubeContentId}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
                  />
                  <label htmlFor="ytId" style={{ cursor: 'pointer', fontSize: '0.88rem', color: '#0f172a' }}>
                    <strong>Enable YouTube Content ID Fingerprinting</strong> (Collect royalties whenever your music is used in other creators' YouTube videos & Shorts).
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Artwork & Record Label */}
            {currentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                  Cover Artwork & Label Imprint
                </h3>

                <div className="form-group">
                  <label className="form-label">Cover Artwork URL (Square 3000x3000px recommended)</label>
                  <input
                    type="url"
                    name="coverArtUrl"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.coverArtUrl}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {formData.coverArtUrl && (
                  <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                    <img 
                      src={formData.coverArtUrl} 
                      alt="Cover Preview"
                      style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        border: '2px solid #cbd5e1',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                      Artwork Live Preview
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Record Label Name</label>
                  <input
                    type="text"
                    name="labelName"
                    placeholder="Vusic Records"
                    value={formData.labelName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Stores & Review */}
            {currentStep === 4 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Select Target Streaming & Telecom Platforms
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  Choose which stores to distribute your release to. All included with zero extra cost.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '10px',
                  marginBottom: '2rem'
                }}>
                  {availableStores.map((store) => {
                    const isSelected = formData.platforms.includes(store);
                    return (
                      <div
                        key={store}
                        onClick={() => handlePlatformToggle(store)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: isSelected ? '#fee2e2' : '#ffffff',
                          border: isSelected ? '1px solid var(--primary-red)' : '1px solid #cbd5e1',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          color: isSelected ? '#991b1b' : '#334155',
                          transition: 'all 0.15s'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          style={{ accentColor: 'var(--primary-red)' }}
                        />
                        <span style={{ fontWeight: isSelected ? 700 : 500 }}>{store}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Card */}
                <div className="glass-card" style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '1.5rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Release Summary:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', color: '#475569' }}>
                    <div><strong>Title:</strong> {formData.title || 'Untitled'}</div>
                    <div><strong>Artist:</strong> {formData.primaryArtist}</div>
                    <div><strong>Genre:</strong> {formData.genre} ({formData.language})</div>
                    <div><strong>Label:</strong> {formData.labelName}</div>
                    <div><strong>Stores Selected:</strong> {formData.platforms.length} Platforms</div>
                    <div><strong>CRBT Chorus:</strong> {formData.callerTuneStartTime}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e2e8f0'
            }}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="btn btn-secondary"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 1 && !formData.title) {
                      setError('Please enter a track title');
                      return;
                    }
                    setError('');
                    setCurrentStep(prev => prev + 1);
                  }}
                  className="btn btn-primary"
                >
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 700 }}
                >
                  {isSubmitting ? 'Delivering Release...' : 'Submit to Stores Now'} <Upload size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
