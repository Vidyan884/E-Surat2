import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2, ChevronRight, AlertCircle } from 'lucide-react';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    unit: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter.';
    }

    // Register-only validations
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nama lengkap wajib diisi.';
      }
      if (!formData.unit) {
        newErrors.unit = 'Pilih unit / departemen.';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Konfirmasi password wajib diisi.';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Password tidak cocok.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onLogin();
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side — Branding */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <Building2 size={24} />
            </div>
            <div className="auth-brand-text">
              <h1>UNIA</h1>
              <p>Electronic Letter System</p>
            </div>
          </div>

          <div className="auth-hero">
            <h2 className="auth-hero-title">
              Sistem Administrasi<br />
              Surat Menyurat<br />
              <span className="auth-hero-accent">Terintegrasi</span>
            </h2>
            <p className="auth-hero-desc">
              Platform terpadu untuk mengelola seluruh alur korespondensi, 
              disposisi, dan produk hukum di lingkungan Universitas Nasional 
              Indonesia secara digital.
            </p>
          </div>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-dot"></div>
              <span>Tracking surat real-time</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-dot"></div>
              <span>Tanda tangan digital</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-dot"></div>
              <span>Harmonisasi produk hukum</span>
            </div>
          </div>

          <div className="auth-left-footer">
            <p>© 2024 UNIA. All rights reserved.</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="auth-decor-circle auth-decor-1"></div>
        <div className="auth-decor-circle auth-decor-2"></div>
        <div className="auth-decor-circle auth-decor-3"></div>
        <div className="auth-grid-overlay"></div>
      </div>

      {/* Right Side — Form */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          {/* Toggle */}
          <div className="auth-toggle">
            <button 
              className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setErrors({}); }}
            >
              Masuk
            </button>
            <button 
              className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setErrors({}); }}
            >
              Daftar
            </button>
            <div className={`auth-toggle-slider ${isLogin ? 'left' : 'right'}`}></div>
          </div>

          {/* Form Header */}
          <div className="auth-form-header">
            <h2>{isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}</h2>
            <p>{isLogin 
              ? 'Masuk ke akun Anda untuk mengakses sistem persuratan.' 
              : 'Daftarkan diri Anda untuk mulai menggunakan E-Surat.'}</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name — Register only */}
            {!isLogin && (
              <div className="auth-field">
                <label className="auth-label">Nama Lengkap</label>
                <div className={`auth-input-wrapper ${errors.name ? 'error' : ''}`}>
                  <User size={18} className="auth-input-icon" />
                  <input 
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="auth-input"
                  />
                </div>
                {errors.name && <span className="auth-error"><AlertCircle size={13} /> {errors.name}</span>}
              </div>
            )}

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <div className={`auth-input-wrapper ${errors.email ? 'error' : ''}`}>
                <Mail size={18} className="auth-input-icon" />
                <input 
                  type="email"
                  placeholder="nama@unia.ac.id"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="auth-input"
                />
              </div>
              {errors.email && <span className="auth-error"><AlertCircle size={13} /> {errors.email}</span>}
            </div>

            {/* Unit — Register only */}
            {!isLogin && (
              <div className="auth-field">
                <label className="auth-label">Unit / Departemen</label>
                <div className={`auth-input-wrapper ${errors.unit ? 'error' : ''}`}>
                  <Building2 size={18} className="auth-input-icon" />
                  <select 
                    value={formData.unit}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    className="auth-input auth-select"
                  >
                    <option value="">Pilih unit...</option>
                    <option value="rektorat">Rektorat</option>
                    <option value="fasilkom">Fakultas Ilmu Komputer</option>
                    <option value="ft">Fakultas Teknik</option>
                    <option value="fh">Fakultas Hukum</option>
                    <option value="hrd">HRD</option>
                    <option value="biro-hukum">Biro Hukum</option>
                  </select>
                </div>
                {errors.unit && <span className="auth-error"><AlertCircle size={13} /> {errors.unit}</span>}
              </div>
            )}

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className={`auth-input-wrapper ${errors.password ? 'error' : ''}`}>
                <Lock size={18} className="auth-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isLogin ? 'Masukkan password' : 'Buat password (min. 8 karakter)'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="auth-input"
                />
                <button 
                  type="button" 
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="auth-error"><AlertCircle size={13} /> {errors.password}</span>}
            </div>

            {/* Confirm Password — Register only */}
            {!isLogin && (
              <div className="auth-field">
                <label className="auth-label">Konfirmasi Password</label>
                <div className={`auth-input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
                  <Lock size={18} className="auth-input-icon" />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="auth-input"
                  />
                  <button 
                    type="button" 
                    className="auth-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="auth-error"><AlertCircle size={13} /> {errors.confirmPassword}</span>}
              </div>
            )}

            {/* Remember & Forgot — Login only */}
            {isLogin && (
              <div className="auth-options">
                <label className="auth-checkbox-label">
                  <input type="checkbox" className="auth-checkbox" />
                  <span className="auth-checkmark"></span>
                  Ingat saya
                </label>
                <a href="#" className="auth-forgot" onClick={(e) => e.preventDefault()}>
                  Lupa password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="auth-submit-btn">
              <span>{isLogin ? 'Masuk ke Dashboard' : 'Daftarkan Akun'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>atau</span>
          </div>

          {/* SSO Button */}
          <button className="auth-sso-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Masuk dengan Google SSO</span>
          </button>

          {/* Switch */}
          <p className="auth-switch-text">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button 
              className="auth-switch-btn"
              onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
            >
              {isLogin ? 'Daftar sekarang' : 'Masuk'}
              <ChevronRight size={14} />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
