import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import { useAuth } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import AuthPage from './views/AuthPage'
import LandingPage from './views/LandingPage'
import MainDashboard from './views/MainDashboard'
import SuratMasuk from './views/SuratMasuk'
import SuratDetail from './views/SuratDetail'
import SuratKeluar from './views/SuratKeluar'
import SuratKeluarDetail from './views/SuratKeluarDetail'
import ArsipDigital from './views/ArsipDigital'
import ProdukHukum from './views/ProdukHukum'
import UserManagement from './views/UserManagement'
import UserDetail from './views/UserDetail'
import PersetujuanAkhir from './views/PersetujuanAkhir'
import BuatProdukHukum from './views/BuatProdukHukum'
import BuatSuratMasuk from './views/BuatSuratMasuk'
import BuatSuratKeluar from './views/BuatSuratKeluar'
import HarmonisasiReview from './views/HarmonisasiReview'
import TrackingPage from './views/TrackingPage'
import RoleConfig from './views/RoleConfig'
import SystemLogs from './views/SystemLogs'
import BHDashboard from './views/BHDashboard'
import BHPengaturan from './views/BHPengaturan'
import Skeleton from './components/Skeleton'

function App() {
  const { user, token, role, logout, isLoading: authLoading } = useAuth();
  const isAuthenticated = !!token;
  // Fallback for mock components
  const setRole = () => console.warn('setRole disabled');
  
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Map path to tab name for Breadcrumb and Sidebar active state
  const pathToTab = (path) => {
    if (path === '/') return 'dashboard';
    return path.substring(1);
  };

  const activeTab = pathToTab(location.pathname);

  const handleSetActiveTab = (tab) => {
    setIsLoading(true);
    const path = tab === 'dashboard' ? '/' : `/${tab}`;
    navigate(path);
    setSidebarOpen(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // Simulate loading with brief delay on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle role switching by navigating to the appropriate dashboard
  useEffect(() => {
    if (role === 'biro-hukum' && !['bh-dashboard', 'bh-produk-hukum', 'buat-produk-hukum', 'bh-harmonisasi', 'harmonisasi-review', 'bh-arsip-digital', 'bh-pengaturan', 'persetujuan-akhir'].includes(activeTab)) {
      handleSetActiveTab('bh-dashboard');
    } else if (role === 'legal' && !['dashboard', 'regulations', 'decrees', 'harmonization', 'digital-archive', 'persetujuan-akhir'].includes(activeTab)) {
      handleSetActiveTab('dashboard'); // Assuming legal dashboard is just 'dashboard' or 'regulations'
    } else if (role === 'admin' && ['bh-dashboard', 'bh-produk-hukum', 'buat-produk-hukum', 'bh-harmonisasi', 'bh-arsip-digital', 'bh-pengaturan'].includes(activeTab)) {
      handleSetActiveTab('dashboard');
    }
  }, [role]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setSidebarOpen(false);
  };

  // Public pages (no sidebar/header)
  if (!isAuthenticated) {
    if (activeTab === 'login') {
      return (
        <ToastProvider>
          <AuthPage onLogin={() => { navigate('/'); }} />
        </ToastProvider>
      );
    } else if (activeTab === 'tracking') {
      return (
        <ToastProvider>
          <TrackingPage setActiveTab={handleSetActiveTab} onLogout={handleLogout} />
        </ToastProvider>
      );
    } else {
      return (
        <ToastProvider>
          <LandingPage onNavigate={handleSetActiveTab} />
        </ToastProvider>
      );
    }
  }

  // Tracking page for authenticated users (if they somehow navigate there)
  if (activeTab === 'tracking') {
    return (
      <ToastProvider>
        <TrackingPage setActiveTab={handleSetActiveTab} onLogout={handleLogout} />
      </ToastProvider>
    );
  }

  const getSkeletonType = () => {
    if (['dashboard', 'bh-dashboard'].includes(activeTab)) return 'dashboard';
    if (['surat-detail', 'surat-keluar-detail', 'user-detail', 'harmonisasi-review', 'buat-produk-hukum', 'buat-surat-masuk', 'buat-surat-keluar'].includes(activeTab)) return 'detail';
    return 'table';
  };

  return (
    <ToastProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800">
        
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2999] md:hidden transition-opacity" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
        
        <Sidebar activeTab={activeTab} setActiveTab={handleSetActiveTab} onLogout={handleLogout} isOpen={sidebarOpen} role={role} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header activeTab={activeTab} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} role={role} setRole={setRole} />
          
          <main className="flex-1 overflow-y-auto bg-slate-50 relative" ref={scrollRef}>
            <Breadcrumb activeTab={activeTab} setActiveTab={handleSetActiveTab} />
            
            <div className="transition-all duration-300">
              {isLoading ? (
                <Skeleton type={getSkeletonType()} />
              ) : (
                <Routes>
                  <Route path="/" element={<MainDashboard setActiveTab={handleSetActiveTab} />} />
                  <Route path="/surat-masuk" element={<SuratMasuk setActiveTab={handleSetActiveTab} />} />
                  <Route path="/surat-detail" element={<SuratDetail setActiveTab={handleSetActiveTab} />} />
                  <Route path="/surat-keluar" element={<SuratKeluar setActiveTab={handleSetActiveTab} />} />
                  <Route path="/surat-keluar-detail" element={<SuratKeluarDetail setActiveTab={handleSetActiveTab} />} />
                  <Route path="/user-management" element={<UserManagement setActiveTab={handleSetActiveTab} />} />
                  <Route path="/user-detail" element={<UserDetail setActiveTab={handleSetActiveTab} />} />
                  <Route path="/role-config" element={<RoleConfig />} />
                  <Route path="/system-logs" element={<SystemLogs />} />
                  <Route path="/persetujuan-akhir" element={<PersetujuanAkhir setActiveTab={handleSetActiveTab} />} />
                  <Route path="/bh-dashboard" element={<BHDashboard setActiveTab={handleSetActiveTab} />} />
                  <Route path="/buat-produk-hukum" element={<BuatProdukHukum setActiveTab={handleSetActiveTab} />} />
                  <Route path="/buat-surat-masuk" element={<BuatSuratMasuk setActiveTab={handleSetActiveTab} />} />
                  <Route path="/buat-surat-keluar" element={<BuatSuratKeluar setActiveTab={handleSetActiveTab} />} />
                  <Route path="/harmonisasi-review" element={<HarmonisasiReview setActiveTab={handleSetActiveTab} />} />
                  <Route path="/bh-pengaturan" element={<BHPengaturan />} />
                  <Route path="/bh-arsip-digital" element={<ArsipDigital />} />
                  <Route path="/digital-archive" element={<ArsipDigital />} />
                  <Route path="*" element={
                    <div className="p-5 text-emerald-800">
                      <h2 className="text-xl font-bold">Halaman {activeTab} sedang dalam pengembangan</h2>
                    </div>
                  } />
                </Routes>
              )}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}

export default App
