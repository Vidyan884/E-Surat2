import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ZoomOut, ZoomIn, Printer, CheckCircle, FileEdit, XCircle, GraduationCap, ArrowLeft } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const SuratKeluarDetail = ({ setActiveTab }) => {
  const { addToast } = useToast();
  const { token, role, user } = useAuth();
  const location = useLocation();
  const suratId = location.state?.suratId;
  
  const [surat, setSurat] = useState(null);
  const [kopSurat, setKopSurat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!suratId) {
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const [suratRes, kopRes] = await Promise.all([
          fetch(`/api/surat-keluar/${suratId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/templates/kop/active', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);
        
        let fetchedSurat = null;
        if (suratRes.ok) {
          fetchedSurat = await suratRes.json();
          setSurat(fetchedSurat);
        }
        
        if (fetchedSurat && fetchedSurat.kopSurat) {
          setKopSurat(fetchedSurat.kopSurat);
        } else if (kopRes.ok) {
          const kopData = await kopRes.json();
          if (kopData.id) setKopSurat(kopData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [suratId, token]);

  const handleUpdateStatus = async (status, successMessage) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/surat-keluar/${suratId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        addToast(successMessage, 'success');
        setTimeout(() => setActiveTab('surat-keluar'), 1200);
      } else {
        throw new Error('Gagal update status');
      }
    } catch (err) {
      addToast('Terjadi kesalahan', 'error');
      setIsSubmitting(false);
    }
  };

  const handleDeleteSurat = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/surat-keluar/${suratId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        addToast('Surat berhasil dihapus.', 'success');
        setTimeout(() => setActiveTab('surat-keluar'), 1200);
      } else {
        throw new Error('Gagal menghapus surat');
      }
    } catch (err) {
      addToast('Terjadi kesalahan', 'error');
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Memuat detail surat...</div>;
  if (!surat) return <div className="p-8 text-center text-slate-500">Surat tidak ditemukan. Silakan kembali ke daftar surat.</div>;

  const dateObj = new Date(surat.tanggal);
  const tanggalStr = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const waktuStr = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  return (
    <>
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-80px)] overflow-hidden">
      {/* Left Column: PDF Viewer */}
      <div className="w-full lg:w-3/5 xl:w-2/3 h-full flex flex-col overflow-hidden bg-slate-50/50 rounded-2xl border border-slate-200">
        <div className="p-4 bg-white border-b border-slate-200 shadow-sm shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors" 
              onClick={() => setActiveTab('surat-keluar')}
            >
              <ArrowLeft size={16} />
              Kembali
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">{surat.status}</span>
            <span className="text-xs font-mono font-medium text-slate-500">No: {surat.noSurat || 'Belum Ada'}</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <button className="text-slate-400 hover:text-emerald-600 transition-colors"><ZoomOut size={16} /></button>
            <span className="text-xs font-bold text-slate-600 w-10 text-center">100%</span>
            <button className="text-slate-400 hover:text-emerald-600 transition-colors"><ZoomIn size={16} /></button>
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            <button className="text-slate-600 hover:text-emerald-600 transition-colors"><Printer size={16} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative bg-slate-200/50">
          <div className="w-full max-w-[800px] mx-auto bg-white shadow-lg min-h-[900px] h-max rounded border border-slate-300 p-12 lg:p-16 relative flex flex-col">
            {/* Kop Surat */}
            {kopSurat?.isImageOnly && kopSurat?.logoUrl ? (
              <div className="-mx-12 lg:-mx-16 -mt-12 lg:-mt-16 mb-8 rounded-t overflow-hidden">
                <img src={kopSurat.logoUrl} alt="Kop Surat" className="w-full h-auto object-cover block" />
              </div>
            ) : (
              <div className="flex items-center border-b-[3px] border-black pb-6 mb-8 gap-6">
                <div className="w-20 h-20 bg-slate-200 rounded-full shrink-0 flex items-center justify-center opacity-70 overflow-hidden">
                  {kopSurat && kopSurat.logoUrl ? (
                    <img src={kopSurat.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <GraduationCap size={48} className="text-slate-500" />
                  )}
                </div>
                <div className="flex-1 text-center pr-26">
                  <h3 className="font-serif font-bold text-xl tracking-wide uppercase text-slate-800 leading-snug whitespace-pre-line">
                    {kopSurat ? kopSurat.namaInstitusi : 'Kementerian Pendidikan\nKebudayaan, Riset, dan Teknologi'}
                  </h3>
                  <p className="font-serif text-sm mt-1 text-slate-800 font-bold">
                    {kopSurat ? kopSurat.alamat : 'Jl. Jenderal Sudirman Senayan, Jakarta'}
                  </p>
                  <p className="font-serif text-xs text-slate-500 mt-1">
                    {kopSurat ? `${kopSurat.kontak} | ${kopSurat.website || ''}` : 'Telp: (021) 5711144 | www.kemdikbud.go.id'}
                  </p>
                </div>
              </div>
            )}

            {/* Letter Body */}
            <div className="space-y-4">
              {['tugas', 'keterangan'].includes(surat.kategori?.toLowerCase()) ? (
                <>
                  <div className="flex justify-end text-sm font-serif mb-6">{tanggalStr}</div>
                  <div className="pt-2 space-y-4 text-sm font-serif leading-relaxed text-justify">
                    {surat.isiSurat ? (
                       <div className="whitespace-pre-wrap break-words">{surat.isiSurat}</div>
                    ) : (
                       <p className="text-slate-400 italic text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">Isi dokumen belum tersedia.</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm font-serif">
                    <div className="space-y-1">
                      <div className="flex"><span className="w-20">Nomor</span><span>: {surat.noSurat || '-'}</span></div>
                      <div className="flex"><span className="w-20">Sifat</span><span>: {surat.sifat}</span></div>
                      <div className="flex items-start"><span className="w-20 shrink-0">Hal</span><span>: {surat.perihal}</span></div>
                    </div>
                    <div className="text-right">
                      {tanggalStr}
                    </div>
                  </div>

                  <div className="pt-8 space-y-1 text-sm font-serif">
                    <p>Yth. {surat.tujuan}<br />
                    di Tempat</p>
                  </div>

                  <div className="pt-6 space-y-4 text-sm font-serif leading-relaxed text-justify">
                    {surat.isiSurat ? (
                       <div className="whitespace-pre-wrap indent-8 break-words">{surat.isiSurat}</div>
                    ) : (
                       <p className="text-slate-400 italic text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">Isi dokumen belum tersedia.</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Attachment Banner */}
            {surat.attachment && (
              <div className="mt-auto pt-12">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Printer size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Lampiran Dokumen Tambahan</p>
                      <p className="text-xs text-slate-500 font-medium">{surat.attachment}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 text-sm font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
                    Unduh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Verifikasi Panel */}
      <div className="w-full lg:w-2/5 xl:w-1/3 h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div className="p-5 border-b border-slate-100 shrink-0">
          <h2 className="font-bold text-lg text-slate-800 mb-1">Verifikasi Dokumen</h2>
          <p className="text-xs text-slate-500 font-medium">Review dan tindak lanjuti draft surat ini.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">PENGIRIM DRAFT</label>
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200">
                {surat.author?.name ? surat.author.name.charAt(0) : 'U'}
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-slate-800">{surat.author?.name || 'Unknown User'}</h4>
                <p className="text-xs text-slate-500">{surat.author?.roles?.[0]?.name || 'Staf'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">RIWAYAT STATUS</label>
            <div className="flex flex-col gap-4 relative pl-3">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200 z-0"></div>
              
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 ring-4 ring-white shrink-0"></div>
                <div className="flex flex-col">
                  <h5 className="text-sm font-bold text-slate-800">Draft Dibuat</h5>
                  <p className="text-xs text-slate-500">{tanggalStr}, {waktuStr}</p>
                </div>
              </div>
              {surat.status !== 'Draft' && (
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 ring-4 ring-white shrink-0"></div>
                  <div className="flex flex-col">
                    <h5 className="text-sm font-bold text-slate-800">Status Saat Ini: {surat.status}</h5>
                    <p className="text-xs text-slate-500">Menunggu tindak lanjut</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {(role === 'pimpinan' || role === 'pimpinan-unit' || role === 'admin' || role === 'admin-pusat') && surat.status === 'Review' && (
            <div className="flex flex-col gap-2 flex-1 mt-2">
              <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">CATATAN PERBAIKAN / PESAN</label>
              <textarea 
                className="w-full h-full min-h-[120px] bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none" 
                placeholder="Tambahkan catatan jika surat perlu direvisi atau ditolak..."
              ></textarea>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-100 flex flex-col gap-3 shrink-0 bg-slate-50/50 rounded-b-2xl">
          {surat.status !== 'Selesai' && (
            <>
              {/* Tombol Edit dan Hapus (Khusus Pembuat) */}
              {surat.authorId === user?.id && ['Draft', 'Perlu Perbaikan', 'Review'].includes(surat.status) && (
                <div className="flex items-center gap-3">
                  <button 
                    className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50" 
                    onClick={() => setActiveTab('buat-surat-keluar', { editSuratId: suratId })}
                    disabled={isSubmitting}
                  >
                    <FileEdit size={16} />
                    Edit Draf
                  </button>
                  <button 
                    className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50" 
                    onClick={() => setShowDeleteModal(true)}
                    disabled={isSubmitting}
                  >
                    <XCircle size={16} />
                    Hapus
                  </button>
                </div>
              )}

              {/* Tombol Pengajuan (Khusus Pembuat) */}
              {surat.authorId === user?.id && ['Draft', 'Perlu Perbaikan'].includes(surat.status) && (
                <button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 mt-1" 
                  onClick={() => handleUpdateStatus('Review', 'Surat berhasil diajukan untuk direview.')}
                  disabled={isSubmitting}
                >
                  <CheckCircle size={18} />
                  Ajukan Review
                </button>
              )}

              {/* Tombol Persetujuan / Penolakan (Khusus Verifikator: Admin/Pimpinan) */}
              {(role === 'pimpinan' || role === 'pimpinan-unit' || role === 'admin' || role === 'admin-pusat') && surat.status === 'Review' && (
                <div className="flex flex-col gap-3 mt-1">
                  <button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50" 
                    onClick={() => handleUpdateStatus('Selesai', 'Surat berhasil disetujui.')}
                    disabled={isSubmitting}
                  >
                    <CheckCircle size={18} />
                    Setujui & Selesaikan
                  </button>
                  <div className="flex items-center gap-3">
                    <button 
                      className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50" 
                      onClick={() => handleUpdateStatus('Perlu Perbaikan', 'Catatan revisi telah dikirim.')}
                      disabled={isSubmitting}
                    >
                      <FileEdit size={16} />
                      Kirim Revisi
                    </button>
                    <button 
                      className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50" 
                      onClick={() => setShowRejectModal(true)}
                      disabled={isSubmitting}
                    >
                      <XCircle size={16} />
                      Tolak
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={showRejectModal}
      onClose={() => setShowRejectModal(false)}
      onConfirm={() => { 
        setShowRejectModal(false);
        handleUpdateStatus('Perlu Perbaikan', 'Surat telah ditolak.'); 
      }}
      title="Tolak Surat?"
      message="Anda yakin ingin menolak surat ini? Pembuat surat akan mendapat notifikasi penolakan (Status: Perlu Perbaikan)."
      confirmText="Ya, Tolak"
      type="danger"
    />

    <ConfirmModal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={() => { 
        setShowDeleteModal(false);
        handleDeleteSurat(); 
      }}
      title="Hapus Surat?"
      message="Anda yakin ingin menghapus permanen surat ini? Tindakan ini tidak dapat dibatalkan."
      confirmText="Ya, Hapus"
      type="danger"
    />
    </>
  );
};

export default SuratKeluarDetail;
