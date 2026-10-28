import React from 'react';
import { 
  Music, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Globe, 
  Share2, 
  Video 
} from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  const scrollTo = (id) => {
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer style={{
      backgroundColor: '#0a0915',
      color: '#94a3b8',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: About Vusic */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #FF2E4D 0%, #7C3AED 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Music size={18} color="#ffffff" />
              </div>
              <span style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#fff'
              }}>
                VUSIC <span style={{ color: 'var(--primary-red)' }}>RECORDS</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#94a3b8' }}>
              Formed by Indian music artists, label executives, and recording studios. We get your tracks on 150+ streaming platforms and Indian mobile caller tunes with complete transparency.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href="https://www.instagram.com/vusicrecords/" 
                target="_blank" 
                rel="noreferrer"
                title="Instagram"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Share2 size={16} />
              </a>
              <a 
                href="https://www.facebook.com/vusicrecords/" 
                target="_blank" 
                rel="noreferrer"
                title="Facebook"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Globe size={16} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                title="YouTube"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Video size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Capabilities */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              DISTRIBUTION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li>
                <button 
                  onClick={() => scrollTo('services')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Digital Music Distribution
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('services')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Caller Tune (CRBT) Setup
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('services')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  YouTube Content ID Fingerprint
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('artists')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Artist Playlisting & Promotion
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('pricing')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Pricing & Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Representation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              REPRESENTATION & HUBS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>265 Felicita Mahagun Moderne, Sector 78, Noida, UP 201305</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--primary-red)" style={{ flexShrink: 0 }} />
                <span>+91 93159 03706</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--accent-purple)" style={{ flexShrink: 0 }} />
                <span>info@vusicrecords.com</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>
                Offices: Noida • Delhi • Mumbai • Gorakhpur
              </div>
            </div>
          </div>

          {/* Col 4: Trust */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              TRUST & CERTIFICATION
            </h4>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px'
              }}>
                🇮🇳 MADE IN INDIA
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.85rem' }}>
                Made for World Music & Digital Rights
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                <Shield size={14} /> DMCA Protected & Certified
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem'
        }}>
          <div>
            © 2026 <span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>Vusic Records Pvt. Ltd.</span> All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>Refund Policy</span>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
