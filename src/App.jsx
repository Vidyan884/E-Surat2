import React, { useState, useEffect, useRef } from 'react'
import { ToastProvider } from './components/Toast'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import AuthPage from './components/AuthPage'
import MainDashboard from './components/MainDashboard'
import SuratMasuk from './components/SuratMasuk'
import SuratDetail from './components/SuratDetail'
import SuratKeluar from './components/SuratKeluar'
import SuratKeluarDetail from './components/SuratKeluarDetail'
import ArsipDigital from './components/ArsipDigital'
import ProdukHukum from './components/ProdukHukum'
import UserManagement from './components/UserManagement'
import UserDetail from './components/UserDetail'
import PersetujuanAkhir from './components/PersetujuanAkhir'
import BuatProdukHukum from './components/BuatProdukHukum'
import HarmonisasiReview from './components/HarmonisasiReview'
import TrackingPage from './components/TrackingPage'
import RoleConfig from './components/RoleConfig'
import SystemLogs from './components/SystemLogs'
import BHDashboard from './components/BHDashboard'
import BHPengaturan from './components/BHPengaturan'
import Skeleton from './components/Skeleton'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pageKey, setPageKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);

  const handleSetActiveTab = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setPageKey(prev => prev + 1);
    setSidebarOpen(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // Simulate loading with brief delay
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading, pageKey]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setSidebarOpen(false);
  };

  // Auth page
  if (!isAuthenticated) {
    return (
      <ToastProvider>
        <AuthPage onLogin={() => setIsAuthenticated(true)} />
      </ToastProvider>
    );
  }

  // Public pages (no sidebar/header)
  if (activeTab === 'tracking') {
    return (
      <ToastProvider>
        <TrackingPage setActiveTab={handleSetActiveTab} onLogout={handleLogout} />
      </ToastProvider>
    );
  }

  const getSkeletonType = () => {
    if (['dashboard', 'bh-dashboard'].includes(activeTab)) return 'dashboard';
    if (['surat-detail', 'surat-keluar-detail', 'user-detail', 'harmonisasi-review', 'buat-produk-hukum'].includes(activeTab)) return 'detail';
    return 'table';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <MainDashboard setActiveTab={handleSetActiveTab} />;
      case 'surat-masuk': return <SuratMasuk setActiveTab={handleSetActiveTab} />;
      case 'surat-detail': return <SuratDetail setActiveTab={handleSetActiveTab} />;
      case 'surat-keluar': return <SuratKeluar setActiveTab={handleSetActiveTab} />;
      case 'surat-keluar-detail': return <SuratKeluarDetail setActiveTab={handleSetActiveTab} />;
      case 'user-management': return <UserManagement setActiveTab={handleSetActiveTab} />;
      case 'user-detail': return <UserDetail setActiveTab={handleSetActiveTab} />;
      case 'role-config': return <RoleConfig />;
      case 'system-logs': return <SystemLogs />;
      case 'persetujuan-akhir': return <PersetujuanAkhir setActiveTab={handleSetActiveTab} />;
      case 'bh-dashboard': return <BHDashboard setActiveTab={handleSetActiveTab} />;
      case 'buat-produk-hukum': return <BuatProdukHukum setActiveTab={handleSetActiveTab} />;
      case 'harmonisasi-review': return <HarmonisasiReview setActiveTab={handleSetActiveTab} />;
      case 'bh-pengaturan': return <BHPengaturan />;
      case 'bh-arsip-digital': case 'digital-archive': return <ArsipDigital />;
      case 'tracking': return <TrackingPage />;
      default: return (
        <div style={{ padding: '20px' }}>
          <h2>Halaman {activeTab} sedang dalam pengembangan</h2>
        </div>
      );
    }
  };

  return (
    <ToastProvider>
      <div className="app-container">
        <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />
        <Sidebar activeTab={activeTab} setActiveTab={handleSetActiveTab} onLogout={handleLogout} isOpen={sidebarOpen} />
        <div className="main-content">
          <Header activeTab={activeTab} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="dashboard-scroll-area" ref={scrollRef}>
            <Breadcrumb activeTab={activeTab} setActiveTab={handleSetActiveTab} />
            <div key={pageKey} className="page-transition">
              {isLoading ? <Skeleton type={getSkeletonType()} /> : renderContent()}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}

export default App
