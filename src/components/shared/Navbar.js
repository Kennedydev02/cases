// Location: src/components/shared/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, 
  FiUserPlus, 
  FiLogOut, 
  FiBell, 
  FiSettings 
} from 'react-icons/fi';

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <h1 style={styles.brandText}>Asylum Case Manager</h1>
        </div>

        <div style={styles.menu}>
          <Link 
            to="/" 
            className="nav-link"
            style={{
              ...styles.menuItem,
              ...(location.pathname === '/' ? styles.activeMenuItem : {})
            }}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/register" 
            className="nav-link"
            style={{
              ...styles.menuItem,
              ...(location.pathname === '/register' ? styles.activeMenuItem : {})
            }}
          >
            <FiUserPlus />
            <span>New Client</span>
          </Link>
        </div>

        <div style={styles.actions}>
          <button style={styles.iconButton}>
            <FiBell />
          </button>
          <button style={styles.iconButton}>
            <FiSettings />
          </button>
          <div style={styles.divider} />
          <div style={styles.profile}>
            <div style={styles.avatar}>
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
            <button 
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'var(--surface)',
    borderBottom: '1px solid #e2e8f0',
    padding: '0.75rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  brandText: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
  },
  menu: {
    display: 'flex',
    gap: '0.5rem',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activeMenuItem: {
    backgroundColor: '#f1f5f9',
    color: 'var(--primary)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e2e8f0',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: 'none',
    background: 'none',
    color: 'var(--danger)',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default Navbar;