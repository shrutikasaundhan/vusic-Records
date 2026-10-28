import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Music, ArrowRight } from 'lucide-react';

export const RegisterPage = ({ setActivePage }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    artistOrLabelName: '',
    role: 'artist',
    plan: 'Artist Unlimited'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="glass-card" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF2E4D 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 4px 12px rgba(255, 46, 77, 0.25)'
            }}>
              <Music size={24} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
              Create Artist / Label Account
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
              Start distributing your music to 150+ stores and collecting royalties
            </p>
          </div>

          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '6px',
              marginBottom: '1.25rem',
              fontSize: '0.85rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your legal name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Artist or Label Name *</label>
                <input
                  type="text"
                  name="artistOrLabelName"
                  required
                  placeholder="e.g. Aaryan Sharma"
                  value={formData.artistOrLabelName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Choose a strong password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Account Type</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="artist">Individual Artist</option>
                  <option value="label">Record Label / Producer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Distribution Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Artist Unlimited">Artist Unlimited (₹3,999/yr)</option>
                  <option value="Pay Per Release">Pay Per Release (₹599/song)</option>
                  <option value="PRO Label">PRO Label (₹5,499)</option>
                  <option value="Limitless Label">Limitless Label (₹9,999/yr)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontWeight: 700 }}
            >
              {loading ? 'Setting Up Studio...' : 'Complete Registration'} <ArrowRight size={16} />
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #e2e8f0',
            fontSize: '0.85rem',
            color: '#64748b'
          }}>
            Already have an account?{' '}
            <button
              onClick={() => setActivePage('login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-red)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
