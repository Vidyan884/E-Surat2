import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, RotateCcw, Save,
  Mail as MailIcon, Send, Scale, Lock
} from 'lucide-react';
import './UserDetail.css';

const UserDetail = ({ setActiveTab }) => {
  const [sections, setSections] = useState({
    suratMasuk: true,
    suratKeluar: true,
    produkHukum: true,
  });

  const [permissions, setPermissions] = useState({
    viewLetters: true,
    registerLetters: true,
    archiveLetters: false,
    draftDocuments: true,
    signDocuments: true,
    bypassVerification: false,
    accessLegalModule: false,
  });

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const togglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ud-container">
      {/* Breadcrumb */}
      <div className="ud-breadcrumb">
        <a 
          href="#" 
          className="ud-breadcrumb-link"
          onClick={(e) => { e.preventDefault(); setActiveTab('user-management'); }}
        >
          User Management
        </a>
        <ChevronRight size={14} className="ud-breadcrumb-sep" />
        <span className="ud-breadcrumb-current">Dr. Budi Santoso</span>
      </div>

      {/* Page Header */}
      <div className="ud-page-header">
        <h1 className="ud-title">User Detail & Access Control</h1>
        <div className="ud-header-actions">
          <button className="ud-btn-reset">
            <RotateCcw size={14} />
            Reset
          </button>
          <button className="ud-btn-save">
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="ud-content-grid">
        {/* Left Column */}
        <div className="ud-left-col">
          {/* User Profile Card */}
          <div className="ud-profile-card">
            <div className="ud-profile-photo-wrap">
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Dr. Budi Santoso"
                className="ud-profile-photo"
              />
            </div>
            <h2 className="ud-profile-name">Dr. Budi Santoso, M.Si.</h2>
            <p className="ud-profile-nip">NIP: 197508122005011002</p>
            <div className="ud-status-badge active">
              <span className="ud-status-dot"></span>
              Active
            </div>

            <div className="ud-profile-details">
              <div className="ud-detail-item">
                <span className="ud-detail-label">Faculty/Department</span>
                <span className="ud-detail-value">Fakultas Ilmu Komputer</span>
              </div>
              <div className="ud-detail-item">
                <span className="ud-detail-label">Position</span>
                <span className="ud-detail-value">Dekan</span>
              </div>
              <div className="ud-detail-item">
                <span className="ud-detail-label">Email</span>
                <span className="ud-detail-value">b.santoso@unia.ac.id</span>
              </div>
            </div>
          </div>

          {/* Assigned Roles Card */}
          <div className="ud-roles-card">
            <h3 className="ud-roles-title">Assigned Roles</h3>
            <div className="ud-roles-list">
              <span className="ud-role-badge">Dean Level Signatory</span>
              <span className="ud-role-badge">Department Head View</span>
            </div>
          </div>
        </div>

        {/* Right Column - Access Control Matrix */}
        <div className="ud-right-col">
          <div className="ud-acm-card">
            <h2 className="ud-acm-title">Access Control Matrix</h2>
            <p className="ud-acm-subtitle">Manage granular permissions across the electronic letter system.</p>

            {/* Section: Surat Masuk */}
            <div className="ud-acm-section">
              <button 
                className="ud-acm-section-header"
                onClick={() => toggleSection('suratMasuk')}
              >
                <div className="ud-acm-section-left">
                  <div className="ud-acm-section-icon surat-masuk">
                    <MailIcon size={16} />
                  </div>
                  <span className="ud-acm-section-name">Surat Masuk (Incoming Letters)</span>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`ud-acm-chevron ${sections.suratMasuk ? 'open' : ''}`}
                />
              </button>
              {sections.suratMasuk && (
                <div className="ud-acm-permissions-grid">
                  <label className="ud-permission-item">
                    <input 
                      type="checkbox" 
                      checked={permissions.viewLetters}
                      onChange={() => togglePermission('viewLetters')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">View Letters</span>
                      <span className="ud-permission-desc">Can read incoming letters routed to their department.</span>
                    </div>
                  </label>
                  <label className="ud-permission-item">
                    <input 
                      type="checkbox" 
                      checked={permissions.registerLetters}
                      onChange={() => togglePermission('registerLetters')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">Register Letters</span>
                      <span className="ud-permission-desc">Can index new incoming physical letters into the system.</span>
                    </div>
                  </label>
                  <label className="ud-permission-item full-width">
                    <input 
                      type="checkbox" 
                      checked={permissions.archiveLetters}
                      onChange={() => togglePermission('archiveLetters')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">Archive Letters</span>
                      <span className="ud-permission-desc">Can move letters to permanent cold storage.</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Section: Surat Keluar */}
            <div className="ud-acm-section">
              <button 
                className="ud-acm-section-header"
                onClick={() => toggleSection('suratKeluar')}
              >
                <div className="ud-acm-section-left">
                  <div className="ud-acm-section-icon surat-keluar">
                    <Send size={16} />
                  </div>
                  <span className="ud-acm-section-name">Surat Keluar (Outgoing Letters)</span>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`ud-acm-chevron ${sections.suratKeluar ? 'open' : ''}`}
                />
              </button>
              {sections.suratKeluar && (
                <div className="ud-acm-permissions-grid">
                  <label className="ud-permission-item">
                    <input 
                      type="checkbox" 
                      checked={permissions.draftDocuments}
                      onChange={() => togglePermission('draftDocuments')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">Draft Documents</span>
                      <span className="ud-permission-desc">Can create initial drafts for outgoing correspondence.</span>
                    </div>
                  </label>
                  <label className="ud-permission-item">
                    <input 
                      type="checkbox" 
                      checked={permissions.signDocuments}
                      onChange={() => togglePermission('signDocuments')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">Sign Documents</span>
                      <span className="ud-permission-desc">Authorized to apply digital signature (TTE) to finalized drafts.</span>
                    </div>
                  </label>
                  <label className="ud-permission-item full-width">
                    <input 
                      type="checkbox" 
                      checked={permissions.bypassVerification}
                      onChange={() => togglePermission('bypassVerification')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">Bypass Verification</span>
                      <span className="ud-permission-desc">Can skip multi-tier verification process (Admin only).</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Section: Produk Hukum */}
            <div className="ud-acm-section">
              <button 
                className="ud-acm-section-header"
                onClick={() => toggleSection('produkHukum')}
              >
                <div className="ud-acm-section-left">
                  <div className="ud-acm-section-icon produk-hukum">
                    <Scale size={16} />
                  </div>
                  <span className="ud-acm-section-name">Produk Hukum (Legal Documents)</span>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`ud-acm-chevron ${sections.produkHukum ? 'open' : ''}`}
                />
              </button>
              {sections.produkHukum && (
                <div className="ud-acm-permissions-grid">
                  <label className="ud-permission-item full-width">
                    <input 
                      type="checkbox" 
                      checked={permissions.accessLegalModule}
                      onChange={() => togglePermission('accessLegalModule')}
                      className="ud-checkbox"
                    />
                    <div className="ud-permission-text">
                      <span className="ud-permission-name">Access Legal Module</span>
                      <span className="ud-permission-desc">View university decrees and rectorate regulations.</span>
                    </div>
                  </label>
                  <div className="ud-acm-notice">
                    <Lock size={14} className="ud-acm-notice-icon" />
                    <span>Requires Legal Bureau authorization to unlock this section.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
