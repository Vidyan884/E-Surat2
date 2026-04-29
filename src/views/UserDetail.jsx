import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, RotateCcw, Save,
  Mail as MailIcon, Send, Scale, Lock
} from 'lucide-react';

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
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm w-max">
        <a 
          href="#" 
          className="hover:text-emerald-600 transition-colors"
          onClick={(e) => { e.preventDefault(); setActiveTab('user-management'); }}
        >
          User Management
        </a>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-800 font-bold">Dr. Budi Santoso</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">User Detail & Access Control</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Manage granular permissions across the electronic letter system.</p>
        </div>
        <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm">
            <RotateCcw size={16} />
            Reset
          </button>
          <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 shrink-0 lg:sticky top-24">
          {/* User Profile Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Dr. Budi Santoso"
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-50 shadow-md"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight mb-1">Dr. Budi Santoso, M.Si.</h2>
            <p className="text-sm font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 mb-4">NIP: 197508122005011002</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-200 text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></span>
              Active
            </div>

            <div className="w-full flex flex-col gap-4 text-left border-t border-slate-100 pt-6">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Faculty/Department</span>
                <span className="text-sm font-semibold text-slate-800">Fakultas Ilmu Komputer</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Position</span>
                <span className="text-sm font-semibold text-slate-800">Dekan</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</span>
                <span className="text-sm font-semibold text-slate-800">b.santoso@unia.ac.id</span>
              </div>
            </div>
          </div>

          {/* Assigned Roles Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Assigned Roles</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 rounded-lg shadow-sm">Dean Level Signatory</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg shadow-sm">Department Head View</span>
            </div>
          </div>
        </div>

        {/* Right Column - Access Control Matrix */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Access Control Matrix</h2>
              <p className="text-sm text-slate-500">Enable or disable specific features for this user.</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Section: Surat Masuk */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 transition-all">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  onClick={() => toggleSection('suratMasuk')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200 shadow-sm">
                      <MailIcon size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Surat Masuk (Incoming Letters)</span>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${sections.suratMasuk ? 'rotate-180' : ''}`} />
                </button>
                {sections.suratMasuk && (
                  <div className="p-4 pt-0 bg-white border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${permissions.viewLetters ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.viewLetters}
                          onChange={() => togglePermission('viewLetters')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.viewLetters ? 'text-emerald-800' : 'text-slate-700'}`}>View Letters</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">Can read incoming letters routed to their department.</span>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${permissions.registerLetters ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.registerLetters}
                          onChange={() => togglePermission('registerLetters')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.registerLetters ? 'text-emerald-800' : 'text-slate-700'}`}>Register Letters</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">Can index new incoming physical letters into the system.</span>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer md:col-span-2 ${permissions.archiveLetters ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.archiveLetters}
                          onChange={() => togglePermission('archiveLetters')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.archiveLetters ? 'text-emerald-800' : 'text-slate-700'}`}>Archive Letters</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">Can move letters to permanent cold storage.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Surat Keluar */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 transition-all">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  onClick={() => toggleSection('suratKeluar')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm">
                      <Send size={16} className="-ml-0.5 -mt-0.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Surat Keluar (Outgoing Letters)</span>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${sections.suratKeluar ? 'rotate-180' : ''}`} />
                </button>
                {sections.suratKeluar && (
                  <div className="p-4 pt-0 bg-white border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${permissions.draftDocuments ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.draftDocuments}
                          onChange={() => togglePermission('draftDocuments')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.draftDocuments ? 'text-emerald-800' : 'text-slate-700'}`}>Draft Documents</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">Can create initial drafts for outgoing correspondence.</span>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${permissions.signDocuments ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.signDocuments}
                          onChange={() => togglePermission('signDocuments')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.signDocuments ? 'text-emerald-800' : 'text-slate-700'}`}>Sign Documents</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">Authorized to apply digital signature (TTE) to finalized drafts.</span>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer md:col-span-2 ${permissions.bypassVerification ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.bypassVerification}
                          onChange={() => togglePermission('bypassVerification')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.bypassVerification ? 'text-emerald-800' : 'text-slate-700'}`}>Bypass Verification</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">Can skip multi-tier verification process (Admin only).</span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Produk Hukum */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 transition-all">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  onClick={() => toggleSection('produkHukum')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200 shadow-sm">
                      <Scale size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Produk Hukum (Legal Documents)</span>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${sections.produkHukum ? 'rotate-180' : ''}`} />
                </button>
                {sections.produkHukum && (
                  <div className="p-4 pt-0 bg-white border-t border-slate-100">
                    <div className="flex flex-col gap-3 mt-4">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${permissions.accessLegalModule ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={permissions.accessLegalModule}
                          onChange={() => togglePermission('accessLegalModule')}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold leading-none mb-1.5 ${permissions.accessLegalModule ? 'text-emerald-800' : 'text-slate-700'}`}>Access Legal Module</span>
                          <span className="text-xs font-medium text-slate-500 leading-relaxed">View university decrees and rectorate regulations.</span>
                        </div>
                      </label>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-200 bg-amber-50">
                        <Lock size={16} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-amber-800 leading-relaxed">Requires Legal Bureau authorization to unlock this section completely.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
