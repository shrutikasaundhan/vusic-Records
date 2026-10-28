import React, { useState } from 'react';
import { Calculator, Sparkles } from 'lucide-react';

export const RoyaltyCalculator = ({ onGetStarted }) => {
  const [spotifyStreams, setSpotifyStreams] = useState(150000);
  const [indianStreams, setIndianStreams] = useState(250000);
  const [youtubeViews, setYoutubeViews] = useState(300000);
  const [planType, setPlanType] = useState('85');

  const spotifyRev = spotifyStreams * 0.18;
  const indianRev = indianStreams * 0.10;
  const ytRev = youtubeViews * 0.08;
  const grossRev = spotifyRev + indianRev + ytRev;

  const royaltySharePercent = Number(planType);
  const artistTakeHome = (grossRev * royaltySharePercent) / 100;
  const traditionalLabelTakeHome = (grossRev * 15) / 100;
  const extraEarnings = artistTakeHome - traditionalLabelTakeHome;

  return (
    <div className="glass-card" style={{
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
      padding: '2.5rem 2rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-red">
              <Calculator size={13} /> Real-Time Estimator
            </span>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
            Streaming Royalty & Earnings Calculator
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Calculate your monthly payout from Spotify, JioSaavn, Wynk, Apple & YouTube Content ID.
          </p>
        </div>

        {/* Royalty Tier Toggle */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          border: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => setPlanType('85')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: planType === '85' ? 'var(--primary-red)' : 'none',
              color: planType === '85' ? '#fff' : '#475569',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            Standard (85% Share)
          </button>
          <button
            onClick={() => setPlanType('90')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: planType === '90' ? '#7c3aed' : 'none',
              color: planType === '90' ? '#fff' : '#475569',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            Pro & Label (90% Share)
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {/* Sliders Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {/* Spotify */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a' }}></span>
                Spotify Monthly Streams
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#15803d' }}>
                {spotifyStreams.toLocaleString()}
              </span>
            </div>
            <input 
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={spotifyStreams}
              onChange={(e) => setSpotifyStreams(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
            />
          </div>

          {/* JioSaavn / Wynk / Gaana */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7' }}></span>
                JioSaavn, Wynk & Gaana Streams
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0369a1' }}>
                {indianStreams.toLocaleString()}
              </span>
            </div>
            <input 
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={indianStreams}
              onChange={(e) => setIndianStreams(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
            />
          </div>

          {/* YouTube Views */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626' }}></span>
                YouTube Content ID Claims & Music Views
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#dc2626' }}>
                {youtubeViews.toLocaleString()}
              </span>
            </div>
            <input 
              type="range"
              min="10000"
              max="3000000"
              step="10000"
              value={youtubeViews}
              onChange={(e) => setYoutubeViews(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Calculated Earnings Card */}
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 600 }}>
            Your Estimated Monthly Earnings
          </div>

          <div style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-primary)',
            color: 'var(--primary-red)',
            margin: '0.5rem 0'
          }}>
            ₹{Math.round(artistTakeHome).toLocaleString()}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: '#15803d',
            fontWeight: 700,
            background: '#dcfce7',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} /> +₹{Math.round(extraEarnings).toLocaleString()} more than traditional labels!
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            padding: '1rem 0',
            borderTop: '1px solid #fecaca',
            borderBottom: '1px solid #fecaca',
            marginBottom: '1.5rem',
            textAlign: 'left',
            fontSize: '0.82rem'
          }}>
            <div>
              <div style={{ color: '#64748b' }}>Gross Revenue:</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>₹{Math.round(grossRev).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ color: '#64748b' }}>Your Royalty Cut:</div>
              <div style={{ fontWeight: 700, color: 'var(--primary-red)', fontSize: '0.95rem' }}>{royaltySharePercent}% Keep</div>
            </div>
            <div>
              <div style={{ color: '#64748b' }}>Minimum Payout:</div>
              <div style={{ fontWeight: 700, color: '#15803d', fontSize: '0.95rem' }}>Just ₹10 (Direct Bank)</div>
            </div>
            <div>
              <div style={{ color: '#64748b' }}>Payout Frequency:</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Monthly On-Time</div>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            Start Distributing & Earning
          </button>
        </div>
      </div>
    </div>
  );
};
