import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Music, Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage = ({ setActivePage }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('artist@vusicrecords.com');
    setPassword('vusic123');
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="glass-card" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          {/* Logo & Heading */}
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
              Artist & Label Login
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
              Sign in to your Vusic Records Distribution Studio
            </p>
          </div>

          {/* Quick Demo Login Pill */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#334155' }}>
              ⚡ <strong>Instant Demo Account:</strong>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="btn btn-sm btn-outline-red"
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              Fill Credentials
            </button>
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
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="name@artist.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontWeight: 700 }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <ArrowRight size={16} />
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
            Don't have an artist account yet?{' '}
            <button
              onClick={() => setActivePage('register')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-red)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
