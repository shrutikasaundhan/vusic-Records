import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { 
  TrendingUp, 
  Disc, 
  DollarSign, 
  Radio, 
  Upload, 
  Trash2, 
  Play, 
  Pause, 
  CreditCard,
  Send
} from 'lucide-react';

export const DashboardPage = ({ setActivePage }) => {
  const { user, updateUser } = useAuth();
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const [releases, setReleases] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [royalties, setRoyalties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Withdrawal state
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMessage, setWithdrawMessage] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);

  // Bank profile state
  const [bankDetails, setBankDetails] = useState({
    accountHolder: user?.bankDetails?.accountHolder || user?.name || '',
    accountNumber: user?.bankDetails?.accountNumber || '',
    ifscCode: user?.bankDetails?.ifscCode || '',
    bankName: user?.bankDetails?.bankName || '',
    upiId: user?.bankDetails?.upiId || ''
  });
  const [savingBank, setSavingBank] = useState(false);
  const [bankSuccess, setBankSuccess] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [relRes, anaRes, royRes] = await Promise.all([
        api.getMyReleases(),
        api.getDashboardAnalytics(),
        api.getRoyalties()
      ]);

      if (relRes.success) setReleases(relRes.releases);
      if (anaRes.success) setAnalytics(anaRes.analytics);
      if (royRes.success) setRoyalties(royRes.royalties);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteRelease = async (id, title) => {
    if (window.confirm(`Initiate takedown for "${title}"? This will request takedown from stores.`)) {
      try {
        await api.deleteRelease(id);
        fetchData();
      } catch (err) {
        alert(err.message || 'Failed to delete release');
      }
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) < 10) {
      setWithdrawMessage('Minimum withdrawal amount is ₹10.');
      return;
    }

    setWithdrawing(true);
    setWithdrawMessage('');
    try {
      const res = await api.requestPayout({
        amount: Number(withdrawAmount),
        payoutMethod: bankDetails.upiId ? 'UPI' : 'NEFT / IMPS Bank Transfer',
        destinationDetails: bankDetails.upiId || bankDetails.accountNumber
      });
      setWithdrawMessage(res.message);
      setWithdrawAmount('');
      fetchData();
    } catch (err) {
      setWithdrawMessage(err.message || 'Failed to request withdrawal');
    } finally {
      setWithdrawing(false);
    }
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setSavingBank(true);
    try {
      await updateUser({ bankDetails });
      setBankSuccess(true);
      setTimeout(() => setBankSuccess(false), 3000);
    } catch (err) {
      alert('Error saving bank details');
    } finally {
      setSavingBank(false);
    }
  };

  return (
    <div className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
                Artist Studio & Catalog
              </h1>
              <span className="badge badge-purple">
                {user?.plan || 'Artist Unlimited'}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Welcome back, <strong>{user?.artistOrLabelName || user?.name}</strong>. Here is your music distribution and streaming performance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setActivePage('upload')}
              className="btn btn-primary"
            >
              <Upload size={16} /> Submit New Track
            </button>
          </div>
        </div>

        {/* 4 Analytics Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Total Streams</span>
              <Radio size={18} color="var(--primary-red)" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-primary)' }}>
              {analytics?.totalStreams?.toLocaleString() || '0'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
              +18.4% growth across 150+ DSPs
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Total Gross Revenue</span>
              <DollarSign size={18} color="#7c3aed" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-primary)' }}>
              ₹{analytics?.totalGrossRevenue?.toLocaleString() || '0'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              Spotify, JioSaavn, YouTube, Caller Tunes
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Your Royalty Earnings</span>
              <TrendingUp size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-primary)' }}>
              ₹{analytics?.totalArtistEarnings?.toLocaleString() || '0'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              85% - 90% payout rate
            </div>
          </div>

          <div className="glass-card" style={{
            padding: '1.5rem',
            background: '#fff1f2',
            border: '1px solid #fecdd3'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Ready for Bank Payout</span>
              <CreditCard size={18} color="var(--primary-red)" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--primary-red)', fontFamily: 'var(--font-primary)' }}>
              ₹{analytics?.readyForPayout?.toLocaleString() || '0'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, marginTop: '4px' }}>
              Available for instant withdrawal
            </div>
          </div>
        </div>

        {/* Platform Share & Quick Withdrawal Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Platform Streaming Breakdown */}
          <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              Platform Stream Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {analytics?.platformBreakdown?.map((plat, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>{plat.name}</span>
                    <span style={{ color: '#64748b' }}>
                      {plat.percentage}% ({plat.streams?.toLocaleString()} streams)
                    </span>
                  </div>
                  <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${plat.percentage}%`,
                      height: '100%',
                      background: plat.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Bank Payout Card */}
          <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              Direct Bank Withdrawal
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Vusic Records offers the lowest minimum payout threshold in the industry: <strong>just ₹10</strong>.
            </p>

            <form onSubmit={handleWithdraw}>
              <div className="form-group">
                <label className="form-label">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  min="10"
                  placeholder="Enter amount (min ₹10)"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Transfer to: <strong>{bankDetails.upiId || bankDetails.accountNumber || 'Registered Bank Account'}</strong>
              </div>

              {withdrawMessage && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: '#d1fae5',
                  color: '#059669',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  {withdrawMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={withdrawing}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                {withdrawing ? 'Processing Transfer...' : 'Withdraw to Bank Account'} <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* My Releases Table */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                My Distributed Releases
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.82rem' }}>
                Tracks submitted to global stores & mobile caller tune networks
              </p>
            </div>
            <button
              onClick={() => setActivePage('upload')}
              className="btn btn-outline-red btn-sm"
            >
              + Upload Song
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
              Loading releases...
            </div>
          ) : releases.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎵</div>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>You have not submitted any releases yet.</p>
              <button onClick={() => setActivePage('upload')} className="btn btn-primary btn-sm">
                Submit Your First Song
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.85rem',
                minWidth: '650px'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', background: '#f8fafc' }}>
                    <th style={{ padding: '10px 12px' }}>Release</th>
                    <th style={{ padding: '10px 12px' }}>Genre & Label</th>
                    <th style={{ padding: '10px 12px' }}>ISRC Code</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                    <th style={{ padding: '10px 12px' }}>Streams</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {releases.map((rel) => {
                    const isThisPlaying = currentTrack?._id === rel._id && isPlaying;
                    return (
                      <tr key={rel._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={rel.coverArtUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80'}
                              alt={rel.title}
                              style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{rel.title}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{rel.primaryArtist}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '12px', color: '#475569' }}>
                          <div>{rel.genre}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{rel.labelName}</div>
                        </td>

                        <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#7c3aed', fontWeight: 600 }}>
                          {rel.isrc}
                        </td>

                        <td style={{ padding: '12px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: rel.status === 'Live in Stores' ? '#d1fae5' : '#fef3c7',
                            color: rel.status === 'Live in Stores' ? '#065f46' : '#92400e'
                          }}>
                            {rel.status}
                          </span>
                        </td>

                        <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>
                          {rel.totalStreams?.toLocaleString() || '0'}
                        </td>

                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                              onClick={() => playTrack(rel)}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#fee2e2',
                                border: '1px solid #fecaca',
                                color: 'var(--primary-red)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                              title="Play Track"
                            >
                              {isThisPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
                            </button>

                            <button
                              onClick={() => handleDeleteRelease(rel._id, rel.title)}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#f1f5f9',
                                border: '1px solid #e2e8f0',
                                color: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                              title="Takedown Release"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bank & Payout Settings */}
        <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
            Bank Account & UPI Payout Details
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
            Where should we deposit your streaming and caller tune royalties every month?
          </p>

          {bankSuccess && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '6px',
              background: '#d1fae5',
              color: '#059669',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.25rem'
            }}>
              ✓ Bank details saved successfully!
            </div>
          )}

          <form onSubmit={handleSaveBank}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Account Holder Name</label>
                <input
                  type="text"
                  value={bankDetails.accountHolder}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                  className="form-input"
                  placeholder="Full name as in bank"
                />
              </div>

              <div className="form-group">
                <label className="form-label">UPI ID (Google Pay, PhonePe, Paytm)</label>
                <input
                  type="text"
                  value={bankDetails.upiId}
                  onChange={(e) => setBankDetails({ ...bankDetails, upiId: e.target.value })}
                  className="form-input"
                  placeholder="e.g. artist@okhdfcbank"
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="form-input"
                  placeholder="e.g. HDFC Bank, SBI"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  className="form-input"
                  placeholder="Bank Account Number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                  className="form-input"
                  placeholder="e.g. HDFC0001234"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingBank}
              className="btn btn-secondary"
            >
              {savingBank ? 'Saving...' : 'Save Bank Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
