import React from 'react';
import { 
  Globe2, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  Radio, 
  Video,
  Music2
} from 'lucide-react';

export const StoresGrid = () => {
  // Curated, executive selection of top 8 primary streaming & telecom platforms
  const topStores = [
    { 
      name: 'Spotify', 
      type: 'Global Streaming Leader', 
      coverage: '180+ Countries', 
      tag: 'Global DSP',
      badgeColor: '#059669',
      bgColor: '#ecfdf5',
      icon: '🎧'
    },
    { 
      name: 'Apple Music', 
      type: 'Lossless & Spatial Audio', 
      coverage: 'Worldwide', 
      tag: 'Hi-Fi Audio',
      badgeColor: '#e11d48',
      bgColor: '#fff1f2',
      icon: '🍎'
    },
    { 
      name: 'JioSaavn', 
      type: 'Indian Market Leader', 
      coverage: 'India & South Asia', 
      tag: 'Top Indian DSP',
      badgeColor: '#059669',
      bgColor: '#ecfdf5',
      icon: '🟢'
    },
    { 
      name: 'Wynk Music', 
      type: 'Airtel Ecosystem & Tunes', 
      coverage: 'Pan-India', 
      tag: 'Indian DSP',
      badgeColor: '#dc2626',
      bgColor: '#fef2f2',
      icon: '🔴'
    },
    { 
      name: 'YouTube Music & Content ID', 
      type: 'Rights Fingerprint & Monetization', 
      coverage: 'Worldwide', 
      tag: 'Sync & Video',
      badgeColor: '#dc2626',
      bgColor: '#fef2f2',
      icon: '▶️'
    },
    { 
      name: 'Jio & Airtel Caller Tunes', 
      type: 'CRBT Mobile Ringback Tunes', 
      coverage: '800M+ Mobile Users', 
      tag: 'Telco CRBT',
      badgeColor: '#7c3aed',
      bgColor: '#f5f3ff',
      icon: '📞'
    },
    { 
      name: 'Instagram Reels & TikTok', 
      type: 'Viral Audio Library Whitelisting', 
      coverage: 'Global Social Video', 
      tag: 'Social Media',
      badgeColor: '#d97706',
      bgColor: '#fffbeb',
      icon: '📸'
    },
    { 
      name: 'Amazon Music & Gaana', 
      type: 'Prime HD & Bollywood Audio', 
      coverage: 'Global & India', 
      tag: 'HD Streaming',
      badgeColor: '#2563eb',
      bgColor: '#eff6ff',
      icon: '🎵'
    }
  ];

  return (
    <section className="section" style={{ position: 'relative', borderBottom: '1px solid #eef2f6' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        <div className="section-header">
          <span className="section-tag">Global & Indian Reach</span>
          <h2 className="section-title">
            Direct Distribution To <span className="text-gradient">150+ Digital Stores</span>
          </h2>
          <p className="section-subtitle">
            Your music delivered directly to the world's leading audio apps, telecom caller tune networks, and social video platforms in 24–48 hours.
          </p>
        </div>

        {/* Clean, Curated 8-Card Grid (Fewer cards, premium look) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {topStores.map((store, i) => (
            <div 
              key={i}
              className="glass-card"
              style={{
                padding: '1.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                fontSize: '1.75rem',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: store.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #e2e8f0'
              }}>
                {store.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '6px',
                  marginBottom: '2px'
                }}>
                  <div style={{ 
                    fontWeight: 800, 
                    fontSize: '1rem', 
                    color: '#0f172a', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {store.name}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                  {store.type}
                </div>
                <div style={{ 
                  fontSize: '0.72rem', 
                  color: store.badgeColor, 
                  fontWeight: 700, 
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>✓</span> {store.coverage}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Bottom Trust Bar */}
        <div style={{
          textAlign: 'center',
          padding: '1rem 1.5rem',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-full)',
          maxWidth: '680px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <Sparkles size={16} color="var(--primary-red)" />
          <span style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
            Plus 140+ additional global DSPs, DTH channels (Tata Play), Tidal, Deezer & regional apps.
          </span>
        </div>
      </div>
    </section>
  );
};
