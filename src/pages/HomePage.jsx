import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { CelebrityShowcase } from '../components/CelebrityShowcase';
import { StoresGrid } from '../components/StoresGrid';
import { 
  Play, 
  Pause, 
  Radio, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Award, 
  Music, 
  Smartphone,
  Check, 
  Send, 
  MapPin, 
  Phone, 
  Mail,
  Globe2
} from 'lucide-react';

export const HomePage = ({ setActivePage }) => {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const [catalog, setCatalog] = useState([]);
  const [includeGst, setIncludeGst] = useState(false);

  // Contact / Demo Pitch form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'interview_pitch',
    artistProfileLink: '',
    demoTrackLink: '',
    message: ''
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await api.getCatalog();
        if (data.success && data.catalog?.length > 0) {
          setCatalog(data.catalog);
        }
      } catch (err) {
        console.error('Failed to fetch catalog:', err);
      }
    };
    fetchCatalog();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError('');

    try {
      const res = await api.submitInquiry(contactData);
      if (res.success) {
        setContactSuccess(true);
        setContactData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'interview_pitch',
          artistProfileLink: '',
          demoTrackLink: '',
          message: ''
        });
      } else {
        setContactError(res.message || 'Failed to submit form');
      }
    } catch (err) {
      setContactError(err.message || 'Network error occurred');
    } finally {
      setContactSubmitting(false);
    }
  };

  const plans = [
    {
      id: 'pay_per_release',
      name: 'Pay Per Release',
      tagline: 'Ideal for independent creators testing the waters',
      basePrice: 599,
      period: 'per release',
      royaltyShare: '85%',
      isPopular: false,
      features: [
        'Pay once, keep song live in stores forever',
        '85% Streaming Royalties Payout',
        'Distribution to 150+ Global Stores',
        'Indian Stores (JioSaavn, Wynk, Gaana, Hungama)',
        'Caller Tune Setup (Jio, Airtel, VI, BSNL)',
        'YouTube Content ID & Fingerprinting',
        'Instagram Reels, Facebook & TikTok Audio Library',
        'Personal Analytics Dashboard',
        'Minimum Payout: Just ₹10'
      ],
      cta: 'Choose Pay Per Release'
    },
    {
      id: 'artist_unlimited',
      name: 'Artist Unlimited',
      tagline: 'Best value for active artists releasing singles year-round',
      basePrice: 3999,
      period: 'per year',
      royaltyShare: '85%',
      isPopular: true,
      features: [
        'Unlimited Song Releases for 1 Year',
        '85% Streaming Royalties Payout',
        '1 Dedicated Artist Profile',
        'Free Caller Tune Setup on all releases',
        'Priority Playlisting Pitch to Spotify & Gaana editors',
        'News Interview on Dailyhunt & Desibeats18',
        'Direct Call & WhatsApp Support Hotline',
        'Fast 24-48h Store Delivery Express',
        'YouTube Official Artist Channel (OAC) setup',
        'Keep songs live forever even if subscription expires'
      ],
      cta: 'Start Artist Unlimited'
    },
    {
      id: 'pro_label',
      name: 'PRO Label',
      tagline: 'Release under your custom record label brand',
      basePrice: 5499,
      period: 'per release',
      royaltyShare: '90%',
      isPopular: false,
      features: [
        'Custom Record Label Brand Name on all stores',
        '90% Streaming Royalties Payout',
        'Unlimited Artists roster under your label imprint',
        'Dedicated VIP Account Manager',
        'Custom ISRC and UPC generation with label code',
        'Automatic YouTube Claims & Piracy Takedown',
        'DTH Platform Release (Tata Play, Airtel DTH)',
        'Regional Language Artwork Title & Credits Allowed'
      ],
      cta: 'Get PRO Label'
    }
  ];

  const heroTrack = catalog[0] || {
    _id: 'default_track_1',
    title: 'Rangreza Re',
    primaryArtist: 'Aaryan Sharma feat. Shaan',
    coverArtUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 1. SOPHISTICATED HERO SECTION */}
      <section style={{
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
        borderBottom: '1px solid #eef2f6',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Background Orbs */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 46, 77, 0.05) 0%, rgba(124, 58, 237, 0.03) 60%, transparent 80%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />

        <div className="container" style={{ maxWidth: '1240px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4.5rem',
            alignItems: 'center'
          }}>
            {/* Left Content Column */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                background: '#fff1f2',
                color: '#e11d48',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                border: '1px solid #ffe4e6',
                boxShadow: '0 1px 2px rgba(225, 29, 72, 0.05)',
                letterSpacing: '0.04em'
              }}>
                <Sparkles size={13} /> OFFICIAL MUSIC DISTRIBUTION & MONETIZATION
              </div>

              <h1 style={{
                fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                marginBottom: '1.25rem',
                color: '#0f172a'
              }}>
                Distribute your music worldwide.<br />
                <span className="text-gradient">Keep up to 90% royalties.</span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '2.25rem',
                maxWidth: '540px'
              }}>
                Deliver tracks to <strong>Spotify, Apple Music, JioSaavn, Wynk</strong>, and 150+ stores in 24–48 hours. Activate official <strong>Jio & Airtel Caller Tunes</strong>, collect YouTube Content ID, and withdraw royalties with just ₹10 minimum payout.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <button
                  onClick={() => setActivePage('register')}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 700 }}
                >
                  <Music size={18} /> Distribute Your Track <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-secondary btn-lg"
                  style={{ fontWeight: 600 }}
                >
                  Explore Pricing Plans
                </button>
              </div>

              {/* Verified Trust Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid #eef2f6'
              }}>
                <div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>150+</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Streaming Stores</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-red)', letterSpacing: '-0.02em' }}>Up to 90%</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Artist Royalty Cut</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '-0.02em' }}>₹10 Min</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Bank Withdrawal</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Master Monitor Card */}
            <div>
              <div className="glass-card" style={{
                padding: '2rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
                borderRadius: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
                    }} />
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>Master Catalog Preview</span>
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>Verified Release</span>
                </div>

                {/* Album Cover Art */}
                <div style={{
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12)'
                }}>
                  <img 
                    src={heroTrack.coverArtUrl}
                    alt={heroTrack.title}
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(0deg, rgba(15, 23, 42, 0.88) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.25rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                        {heroTrack.title}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                        {heroTrack.primaryArtist}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Playback Control Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #eef2f6',
                  marginBottom: '1.25rem'
                }}>
                  <button
                    onClick={() => playTrack(heroTrack)}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'var(--primary-red)',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(255, 46, 77, 0.35)',
                      flexShrink: 0
                    }}
                    title={isPlaying && currentTrack?._id === heroTrack._id ? 'Pause Preview' : 'Play Preview'}
                  >
                    {isPlaying && currentTrack?._id === heroTrack._id ? (
                      <Pause size={18} fill="#fff" />
                    ) : (
                      <Play size={18} fill="#fff" style={{ marginLeft: '2px' }} />
                    )}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 600 }}>482,930 Verified Streams</span>
                      <span style={{ color: '#059669', fontWeight: 700 }}>+34% this week</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '22px' }}>
                      {[40, 70, 30, 85, 60, 95, 45, 65, 80, 50, 100, 75, 40, 60, 80, 55, 70, 90, 45, 60].map((h, i) => (
                        <div 
                          key={i} 
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: i < 12 ? 'var(--primary-red)' : '#cbd5e1',
                            borderRadius: '2px',
                            transition: 'height 0.2s ease'
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: '#64748b',
                  paddingTop: '0.25rem'
                }}>
                  <span style={{ fontWeight: 500 }}>Live On Stores:</span>
                  <div style={{ display: 'flex', gap: '8px', color: '#0f172a', fontWeight: 700 }}>
                    <span>Spotify</span> • <span>JioSaavn</span> • <span>Airtel Tune</span> • <span>Apple Music</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (BENTO ARCHITECTURE) */}
      <section id="distribution" className="section" style={{ borderBottom: '1px solid #eef2f6' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div className="section-header">
            <span className="section-tag">Direct Infrastructure</span>
            <h2 className="section-title">
              Complete Music Distribution & Rights Suite
            </h2>
            <p className="section-subtitle">
              Engineered for independent artists and recording labels who demand rapid delivery, full rights retention, and transparent royalties.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {/* Capability 1 */}
            <div className="glass-card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Globe2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.28rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Worldwide Distribution
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Deliver your music to 150+ digital streaming apps worldwide in 24 to 48 hours, with direct editorial playlist pitching to Spotify and Gaana.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="glass-card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#ede9fe',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Smartphone size={24} />
              </div>
              <h3 style={{ fontSize: '1.28rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Mobile Caller Tunes (CRBT)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Reach over 1 Billion mobile subscribers across India. We automatically set your songs as caller tunes on Reliance Jio, Airtel, VI, and BSNL.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="glass-card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.28rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                YouTube Content ID
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Acoustic fingerprinting automatically detects your music in videos & Shorts across YouTube, collecting ad revenue directly into your account.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="glass-card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#d1fae5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.28rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Multi-Label Management
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Designed for record companies with custom label branding on DSPs, multi-artist catalog management, and automated royalty splits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 150+ STORES SHOWCASE (Curated Top 8 Cards) */}
      <div id="stores">
        <StoresGrid />
      </div>

      {/* 4. CELEBRITY ARTISTS & TRACK RECORD */}
      <div id="artists">
        <CelebrityShowcase />
      </div>

      {/* 5. TRANSPARENT PRICING PLANS */}
      <section id="pricing" className="section" style={{ borderBottom: '1px solid #eef2f6' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div className="section-header">
            <span className="section-tag">Straightforward Pricing</span>
            <h2 className="section-title">
              Clear Plans. <span className="text-gradient">Zero Hidden Deductions.</span>
            </h2>
            <p className="section-subtitle">
              Keep 85% to 90% of all streaming royalties. Minimum bank payout is just ₹10.
            </p>

            {/* GST Toggle Switch */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '1.5rem',
              background: '#ffffff',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #cbd5e1',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '0.86rem', color: !includeGst ? '#0f172a' : '#64748b', fontWeight: 700 }}>
                Base Price
              </span>
              <button
                onClick={() => setIncludeGst(!includeGst)}
                style={{
                  width: '44px',
                  height: '22px',
                  borderRadius: '11px',
                  background: includeGst ? 'var(--primary-red)' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  padding: '2px'
                }}
                aria-label="Toggle GST"
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: includeGst ? '24px' : '2px',
                  transition: 'all 0.2s ease'
                }} />
              </button>
              <span style={{ fontSize: '0.86rem', color: includeGst ? '#0f172a' : '#64748b', fontWeight: 700 }}>
                Including 18% GST
              </span>
            </div>
          </div>

          {/* Pricing Cards Grid (Without the giant table) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch'
          }}>
            {plans.map((plan) => {
              const displayPrice = includeGst ? Math.round(plan.basePrice * 1.18) : plan.basePrice;
              return (
                <div
                  key={plan.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: plan.isPopular ? '2px solid var(--primary-red)' : '1px solid #e2e8f0',
                    position: 'relative',
                    padding: '2.25rem 1.75rem',
                    background: '#ffffff',
                    boxShadow: plan.isPopular ? '0 12px 30px -5px rgba(255, 46, 77, 0.16)' : 'var(--shadow-card)'
                  }}
                >
                  {plan.isPopular && (
                    <div style={{
                      position: 'absolute',
                      top: '-13px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--primary-red)',
                      color: '#fff',
                      padding: '4px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      boxShadow: '0 2px 8px rgba(255, 46, 77, 0.35)'
                    }}>
                      ★ Most Popular Choice
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px', color: '#0f172a' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', minHeight: '38px', marginBottom: '1.5rem' }}>
                      {plan.tagline}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#0f172a' }}>
                          ₹{displayPrice.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {includeGst ? 'incl. GST' : '+ 18% GST'} / {plan.period}
                        </span>
                      </div>
                      <div style={{
                        display: 'inline-block',
                        marginTop: '8px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: '#059669',
                        background: '#d1fae5',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}>
                        Keep {plan.royaltyShare} of Streaming Royalties
                      </div>
                    </div>

                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      marginBottom: '2rem',
                      fontSize: '0.88rem',
                      borderTop: '1px solid #eef2f6',
                      paddingTop: '1.5rem'
                    }}>
                      {plan.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#475569' }}>
                          <Check size={16} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ color: idx === 0 ? '#0f172a' : 'inherit', fontWeight: idx === 0 ? 600 : 400 }}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setActivePage('register')}
                    className={plan.isPopular ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{ width: '100%', fontWeight: 700, padding: '0.75rem 1rem' }}
                  >
                    {plan.cta} <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CONTACT & A&R PITCH SECTION */}
      <section id="contact" className="section" style={{ background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div className="section-header">
            <span className="section-tag">Direct A&R Access</span>
            <h2 className="section-title">
              Pitch Your Music & Connect With Us
            </h2>
            <p className="section-subtitle">
              Submit a demo for distribution review, request a Dailyhunt / Desibeats18 artist news interview, or ask about custom label contracts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}>
            {/* Corporate Info Card */}
            <div className="glass-card" style={{ padding: '2.25rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                Corporate Representation
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.94rem' }}>Noida Head Office</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, marginTop: '2px' }}>
                      265 Felicita Mahagun Moderne, Sector 78, Noida, Uttar Pradesh 201305, India
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#ede9fe',
                    color: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.94rem' }}>Phone & WhatsApp Support</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '2px' }}>
                      +91 93159 03706
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#d1fae5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.94rem' }}>Direct Email</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '2px' }}>
                      info@vusicrecords.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Pitch Form Card */}
            <div className="glass-card" style={{ padding: '2.25rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                Submit Demo / Media Pitch
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Our A&R team reviews submissions daily and responds within 24 hours.
              </p>

              {contactSuccess && (
                <div style={{
                  background: '#d1fae5',
                  border: '1px solid #a7f3d0',
                  color: '#059669',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  ✓ Pitch submitted successfully! Our A&R team will get in touch shortly.
                </div>
              )}

              {contactError && (
                <div style={{
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem'
                }}>
                  {contactError}
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 ..."
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Inquiry Purpose</label>
                    <select
                      value={contactData.inquiryType}
                      onChange={(e) => setContactData({ ...contactData, inquiryType: e.target.value })}
                      className="form-select"
                    >
                      <option value="interview_pitch">Dailyhunt News Interview Pitch</option>
                      <option value="distribution">Music Distribution Inquiry</option>
                      <option value="youtube_monetization">YouTube Copyright & Monetization</option>
                      <option value="custom_label">Record Label Business</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Song Link / Drive URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://open.spotify.com/... or Google Drive link"
                    value={contactData.demoTrackLink}
                    onChange={(e) => setContactData({ ...contactData, demoTrackLink: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Release Details *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about your upcoming single, release date, or questions..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}
                >
                  {contactSubmitting ? 'Sending...' : 'Submit Pitch to A&R'} <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
