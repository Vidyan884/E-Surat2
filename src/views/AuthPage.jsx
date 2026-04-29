import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = ({ onLogin }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'NIS/NIDN wajib diisi.';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        await login(formData.username, formData.password);
        onLogin();
      } catch (err) {
        setErrors({ submit: err.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side — Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-950 relative overflow-hidden flex-col justify-between p-12 xl:p-16 text-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-700/30 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-800/40 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg overflow-hidden p-1">
              <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">UNIA</h1>
              <p className="text-xs text-emerald-200 uppercase tracking-widest font-semibold">Electronic Letter System</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto mb-16">
          <h2 className="text-4xl xl:text-5xl font-bold leading-[1.15] mb-6">
            Sistem Administrasi<br />
            Surat Menyurat<br />
            <span className="text-emerald-400">Terintegrasi</span>
          </h2>
          <p className="text-emerald-100 text-lg max-w-md leading-relaxed mb-10 opacity-90">
            Platform terpadu untuk mengelola seluruh alur korespondensi, 
            disposisi, dan produk hukum di lingkungan Universitas Nasional 
            Indonesia secara digital.
          </p>

          <div className="flex flex-col gap-4">
            {['Tracking surat real-time', 'Tanda tangan digital', 'Harmonisasi produk hukum'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-emerald-50">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-emerald-400/60 font-medium">
          <p>© 2026 UNIA. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-slate-50 relative">
        {/* Mobile Header (Shows only on small screens) */}
        <div className="absolute top-8 left-8 flex items-center gap-2 lg:hidden">
           <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center overflow-hidden p-0.5">
              <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
           </div>
           <span className="font-bold text-emerald-900">UNIA E-Surat</span>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Selamat Datang</h2>
            <p className="text-slate-500">Masuk ke akun Anda untuk mengakses sistem persuratan.</p>
            {errors.submit && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                <AlertCircle size={16} /> {errors.submit}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NIS/NIDN */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">NIS / NIDN</label>
              <div className={`flex items-center px-4 py-3 bg-white rounded-xl border transition-all ${
                errors.username 
                  ? 'border-red-300 ring-4 ring-red-50' 
                  : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50'
              }`}>
                <Mail size={18} className={`shrink-0 mr-3 ${errors.username ? 'text-red-400' : 'text-slate-400'}`} />
                <input 
                  type="text"
                  placeholder="Masukkan NIS atau NIDN"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder:text-slate-400"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} /> {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Password</label>
              <div className={`flex items-center px-4 py-3 bg-white rounded-xl border transition-all ${
                errors.password 
                  ? 'border-red-300 ring-4 ring-red-50' 
                  : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50'
              }`}>
                <Lock size={18} className={`shrink-0 mr-3 ${errors.password ? 'text-red-400' : 'text-slate-400'}`} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder:text-slate-400"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-emerald-600 focus:outline-none transition-colors shrink-0 ml-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 rounded border border-slate-300 bg-white group-hover:border-emerald-500 transition-colors">
                  <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                  <div className="absolute inset-0 bg-emerald-600 rounded scale-0 peer-checked:scale-100 transition-transform"></div>
                  <svg className="w-3 h-3 text-white absolute scale-0 peer-checked:scale-100 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-slate-600 font-medium">Ingat saya</span>
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full mt-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-emerald-600/40 hover:-translate-y-0.5'}`}
            >
              {isLoading ? 'Memproses...' : 'Masuk ke Dashboard'}
              <ArrowRight size={18} />
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
