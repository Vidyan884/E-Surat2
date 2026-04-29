import React, { useState } from 'react';
import { 
  Plus, Shield, Edit3, Trash2, 
  ChevronDown, ChevronRight, Check, X, Search
} from 'lucide-react';

const rolesData = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all administrative privileges',
    users: 2,
    color: '#10b981', // emerald-500
    permissions: {
      'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
      'Surat Keluar': ['Draft', 'Sign', 'Bypass Verification'],
      'User Management': ['View', 'Create', 'Edit', 'Delete'],
      'Produk Hukum': ['Access', 'Create', 'Harmonize'],
      'System': ['View Logs', 'Configure Roles', 'Backup'],
    },
  },
  {
    id: 2,
    name: 'Admin Persuratan',
    description: 'Manages incoming and outgoing correspondence',
    users: 5,
    color: '#047857', // emerald-700
    permissions: {
      'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
      'Surat Keluar': ['Draft', 'Sign'],
      'User Management': [],
      'Produk Hukum': [],
      'System': ['View Logs'],
    },
  },
  {
    id: 3,
    name: 'Reviewer',
    description: 'Reviews and verifies documents before approval',
    users: 8,
    color: '#8b5cf6', // violet-500
    permissions: {
      'Surat Masuk': ['View'],
      'Surat Keluar': ['Draft'],
      'User Management': [],
      'Produk Hukum': ['Access'],
      'System': [],
    },
  },
  {
    id: 4,
    name: 'Dean Level Signatory',
    description: 'Authorized to sign documents at faculty dean level',
    users: 4,
    color: '#0ea5e9', // sky-500
    permissions: {
      'Surat Masuk': ['View', 'Dispose'],
      'Surat Keluar': ['Draft', 'Sign'],
      'User Management': [],
      'Produk Hukum': ['Access'],
      'System': [],
    },
  },
  {
    id: 5,
    name: 'Staff',
    description: 'Basic access for general staff members',
    users: 24,
    color: '#64748b', // slate-500
    permissions: {
      'Surat Masuk': ['View'],
      'Surat Keluar': [],
      'User Management': [],
      'Produk Hukum': [],
      'System': [],
    },
  },
  {
    id: 6,
    name: 'Department Head View',
    description: 'Read-only access to department-level documents',
    users: 6,
    color: '#059669', // emerald-600
    permissions: {
      'Surat Masuk': ['View'],
      'Surat Keluar': ['Draft'],
      'User Management': [],
      'Produk Hukum': ['Access'],
      'System': [],
    },
  },
];

const allPermissions = {
  'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
  'Surat Keluar': ['Draft', 'Sign', 'Bypass Verification'],
  'User Management': ['View', 'Create', 'Edit', 'Delete'],
  'Produk Hukum': ['Access', 'Create', 'Harmonize'],
  'System': ['View Logs', 'Configure Roles', 'Backup'],
};

const RoleConfig = () => {
  const [selectedRole, setSelectedRole] = useState(rolesData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState(
    Object.keys(allPermissions).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const filteredRoles = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModule = (module) => {
    setExpandedModules(prev => ({ ...prev, [module]: !prev[module] }));
  };

  const hasPermission = (module, perm) => {
    return selectedRole.permissions[module]?.includes(perm) || false;
  };

  const totalPerms = Object.values(selectedRole.permissions).flat().length;
  const totalAvailable = Object.values(allPermissions).flat().length;

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Role Configuration</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Define access levels and permission sets for system roles.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <Plus size={18} />
            Create New Role
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Panel — Role List */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 shrink-0 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm lg:sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden">
          <div className="relative flex-shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
            />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-1 pb-1">
            {filteredRoles.map(role => (
              <div 
                key={role.id}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all group ${selectedRole.id === role.id ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: role.color }}
                  ></div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold leading-tight mb-0.5 ${selectedRole.id === role.id ? 'text-emerald-900' : 'text-slate-800'}`}>{role.name}</span>
                    <span className="text-xs font-semibold text-slate-500">{role.users} users</span>
                  </div>
                </div>
                <ChevronRight size={18} className={`${selectedRole.id === role.id ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-500 transition-colors'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Role Detail */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Role Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm shrink-0"
                style={{ backgroundColor: `${selectedRole.color}15`, color: selectedRole.color, borderColor: `${selectedRole.color}30` }}
              >
                <Shield size={24} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-1">{selectedRole.name}</h2>
                <p className="text-sm font-medium text-slate-500">{selectedRole.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all bg-white shadow-sm" title="Edit Role">
                <Edit3 size={18} />
              </button>
              <button className="p-2 rounded-xl text-red-500 hover:text-white hover:bg-red-600 border border-red-200 transition-all bg-red-50 shadow-sm" title="Delete Role">
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-white">
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <span className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{selectedRole.users}</span>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned Users</span>
            </div>
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <span className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{totalPerms}</span>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Active Permissions</span>
            </div>
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <span className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">{Object.keys(allPermissions).length}</span>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Modules Access</span>
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="p-6 md:p-8 flex flex-col gap-6 bg-slate-50/50 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Permission Matrix</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full shadow-sm">{totalPerms} / {totalAvailable} enabled</span>
            </div>

            <div className="flex flex-col gap-4">
              {Object.entries(allPermissions).map(([module, perms]) => {
                const activeCount = selectedRole.permissions[module]?.length || 0;
                const progressPercentage = (activeCount / perms.length) * 100;
                return (
                  <div key={module} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all">
                    <button 
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors focus:outline-none"
                      onClick={() => toggleModule(module)}
                    >
                      <div className="flex items-center gap-3 w-1/2 min-w-[200px]">
                        <ChevronDown 
                          size={18} 
                          className={`text-slate-400 transition-transform ${expandedModules[module] ? 'rotate-180' : ''}`}
                        />
                        <span className="text-sm font-bold text-slate-800">{module}</span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {activeCount}/{perms.length}
                        </span>
                      </div>
                      <div className="w-1/3 max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                        <div 
                          className={`h-full transition-all duration-500 ${activeCount === perms.length ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </button>
                    {expandedModules[module] && (
                      <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {perms.map(perm => {
                            const enabled = hasPermission(module, perm);
                            return (
                              <div key={perm} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${enabled ? 'bg-white border-emerald-200 shadow-sm' : 'bg-transparent border-transparent opacity-60'}`}>
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${enabled ? 'bg-emerald-500 border-emerald-600 text-white shadow-inner' : 'bg-slate-100 border-slate-300 text-slate-300'}`}>
                                  {enabled ? <Check size={12} /> : <X size={12} />}
                                </div>
                                <span className={`text-sm font-bold ${enabled ? 'text-slate-800' : 'text-slate-500'}`}>{perm}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-end gap-3">
            <button className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-100 transition-colors">Reset Changes</button>
            <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">Save Configuration</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleConfig;
