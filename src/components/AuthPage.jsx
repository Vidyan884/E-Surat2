import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2, ChevronRight, AlertCircle } from 'lucide-react';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
          {/* Form Header */}
          <div className="auth-form-header">
            <h2>Selamat Datang Kembali</h2>
            <p>Masuk ke akun Anda untuk mengakses sistem persuratan.</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
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

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className={`auth-input-wrapper ${errors.password ? 'error' : ''}`}>
                <Lock size={18} className="auth-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
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

            {/* Remember & Forgot */}
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

            {/* Submit Button */}
            <button type="submit" className="auth-submit-btn">
              <span>Masuk ke Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default AuthPage;
