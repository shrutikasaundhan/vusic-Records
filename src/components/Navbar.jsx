import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Music, 
  Menu, 
  X, 
  Upload, 
  Disc, 
  LogOut, 
  ChevronDown, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Curated, collision-free navigation items
  const navLinks = [
    { id: 'distribution', label: 'Distribution' },
    { id: 'stores', label: 'Stores' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'artists', label: 'Artists' },
    { id: 'contact', label: 'A&R Pitch' },
  ];

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setActivePage('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #eef2f6',
      boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        maxWidth: '1240px',
        position: 'relative'
      }}>
        {/* Brand Logo - Fixed Left with dedicated breathing room */}
        <div 
          onClick={handleLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0,
            paddingRight: '1rem'
          }}
          title="Vusic Records Home"
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF2E4D 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 10px rgba(255, 46, 77, 0.25)',
            flexShrink: 0
          }}>
            <Music size={22} color="#ffffff" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '1.38rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#0f172a',
              lineHeight: 1.15
            }}>
              <span>VUSIC</span>
              <span style={{ color: 'var(--primary-red)' }}>RECORDS</span>
            </div>
            <div style={{
              fontSize: '0.64rem',
              fontWeight: 600,
              color: '#64748b',
              letterSpacing: '0.07em',
              textTransform: 'uppercase'
            }}>
              Digital Music Distribution
            </div>
          </div>
        </div>

        {/* Sophisticated Desktop Navigation Links - Centered & Spacious */}
        <nav style={{
          display: 'none',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: '0 1.5rem'
        }} className="desktop-nav">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#475569',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                transition: 'all 0.15s ease',
                outline: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0f172a';
                e.currentTarget.style.background = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.background = 'none';
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions / Auth Area - Fixed Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  color: '#0f172a',
                  cursor: 'pointer',
                  fontSize: '0.88rem'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED, #FF2E4D)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}>
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {user?.artistOrLabelName || user?.name || 'Studio'}
                </span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  width: '210px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  padding: '6px',
                  zIndex: 1100
                }}>
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{user?.email}</div>
                  </div>

                  <button
                    onClick={() => {
                      setActivePage('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'none',
                      border: 'none',
                      color: '#334155',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                  >
                    <Disc size={15} /> Studio Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setActivePage('upload');
                      setUserDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'none',
                      border: 'none',
                      color: '#334155',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                  >
                    <Upload size={15} /> Upload Music
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      setActivePage('home');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      borderTop: '1px solid #f1f5f9',
                      marginTop: '4px'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                  >
                    <LogOut size={15} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setActivePage('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#334155',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '8px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0f172a';
                e.target.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#334155';
                e.target.style.background = 'none';
              }}
              id="desktop-login-btn"
            >
              Sign In
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => setActivePage(isAuthenticated ? 'upload' : 'register')}
            className="btn btn-primary btn-sm"
            style={{ 
              fontWeight: 700, 
              padding: '0.58rem 1.35rem', 
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isAuthenticated ? (
              <>
                <Upload size={14} /> Upload Music
              </>
            ) : (
              <>
                Distribute Music <ArrowRight size={14} />
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0f172a',
                fontSize: '0.98rem',
                fontWeight: 600,
                textAlign: 'left',
                padding: '0.4rem 0',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}

          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.75rem' }}>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => { setActivePage('login'); setMobileMenuOpen(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setActivePage('register'); setMobileMenuOpen(false); }}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  Distribute Music
                </button>
              </>
            ) : (
              <button
                onClick={() => { setActivePage('dashboard'); setMobileMenuOpen(false); }}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 920px) {
          .desktop-nav { display: flex !important; }
          #desktop-login-btn { display: inline-block !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
