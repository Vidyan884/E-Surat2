import React, { useState } from 'react';
import { ZoomOut, ZoomIn, Printer, CheckCircle, FileEdit, XCircle, GraduationCap, ArrowLeft } from 'lucide-react';
import { useToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

const SuratKeluarDetail = ({ setActiveTab }) => {
  const { addToast } = useToast();
  const [showRejectModal, setShowRejectModal] = useState(false);

  return (
    <>
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-80px)] overflow-hidden">
      {/* Left Column: PDF Viewer */}
      <div className="w-full lg:w-3/5 xl:w-2/3 h-full flex flex-col overflow-hidden bg-slate-50/50 rounded-2xl border border-slate-200">
        <div className="p-4 bg-white border-b border-slate-200 shadow-sm shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors" 
              onClick={() => setActiveTab('surat-masuk')}
            >
              <ArrowLeft size={16} />
              Kembali
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">Draft</span>
            <span className="text-xs font-mono font-medium text-slate-500">No: UNIA/FT/2023/10/045</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <button className="text-slate-400 hover:text-emerald-600 transition-colors"><ZoomOut size={16} /></button>
            <span className="text-xs font-bold text-slate-600 w-10 text-center">100%</span>
            <button className="text-slate-400 hover:text-emerald-600 transition-colors"><ZoomIn size={16} /></button>
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            <button className="text-slate-600 hover:text-emerald-600 transition-colors"><Printer size={16} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative bg-slate-200/50 flex justify-center">
          <div className="w-full max-w-[800px] bg-white shadow-lg min-h-[900px] rounded border border-slate-300 p-12 lg:p-16 relative">
            {/* Kop Surat */}
            <div className="flex items-center border-b-[3px] border-black pb-6 mb-8 gap-6">
              <div className="w-20 h-20 rounded-full shrink-0 flex items-center justify-center">
                <GraduationCap size={48} className="text-slate-500" />
              </div>
              <div className="flex-1 text-center pr-26">
                <h1 className="font-serif font-bold text-xl tracking-wide uppercase text-slate-800 leading-snug">UNIVERSITAS NUSANTARA<br />ILMU ADMINISTRASI</h1>
                <p className="font-serif text-sm mt-1 text-slate-800 font-bold">Fakultas Teknologi Informasi</p>
                <p className="font-serif text-xs text-slate-500 mt-1">Jl. Pendidikan No. 123, Jakarta 10110 | Telp: (021) 555-0123 | Email: info@unia.ac.id</p>
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-serif">
                <div className="space-y-1">
                  <div className="flex"><span className="w-20">Nomor</span><span>: UNIA/FT/2023/10/045</span></div>
                  <div className="flex"><span className="w-20">Lampiran</span><span>: 1 (Satu) Berkas</span></div>
                  <div className="flex items-start"><span className="w-20 shrink-0">Hal</span><span>: Permohonan Persetujuan<br/>Kegiatan Seminar Nasional</span></div>
                </div>
                <div className="text-right">
                  Jakarta, 24 Oktober 2023
                </div>
              </div>

              <div className="pt-8 space-y-1 text-sm font-serif">
                <p>Yth. Wakil Rektor Bidang Akademik<br />
                Universitas Nusantara Ilmu Administrasi<br />
                di Tempat</p>
              </div>

              <div className="pt-6 space-y-4 text-sm font-serif leading-relaxed text-justify">
                <p className="indent-8">Dengan hormat,</p>

                <p className="indent-8">
                  Sehubungan dengan program kerja tahunan Fakultas Teknologi Informasi untuk meningkatkan kompetensi mahasiswa dan dosen di bidang kecerdasan buatan, kami berencana menyelenggarakan Seminar Nasional dengan tema "Masa Depan AI dalam Administrasi Publik".
                </p>

                <p className="indent-8">
                  Kegiatan ini direncanakan akan diselenggarakan pada:
                </p>

                <div className="pl-12 space-y-1 my-4">
                  <div className="flex"><span className="w-28">Hari, Tanggal</span><span>: Rabu, 15 November 2023</span></div>
                  <div className="flex"><span className="w-28">Waktu</span><span>: 08:00 - 15:00 WIB</span></div>
                  <div className="flex"><span className="w-28">Tempat</span><span>: Auditorium Utama UNIA</span></div>
                </div>

                <p className="indent-8">
                  Oleh karena itu, kami mengajukan permohonan persetujuan dan dukungan dana untuk penyelenggaraan kegiatan tersebut. Rincian anggaran dan susunan acara telah kami lampirkan bersama surat ini.
                </p>
              </div>
            </div>
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
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200">BS</div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-slate-800">Budi Santoso</h4>
                <p className="text-xs text-slate-500">Dekan Fakultas Teknologi Informasi</p>
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
                  <h5 className="text-sm font-bold text-slate-800">Dibuat oleh Pengonsep</h5>
                  <p className="text-xs text-slate-500">24 Okt 2023, 09:15 WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-3 h-3 rounded-full bg-slate-300 mt-1 ring-4 ring-white shrink-0"></div>
                <div className="flex flex-col">
                  <h5 className="text-sm font-bold text-slate-800">Menunggu Verifikasi Anda</h5>
                  <p className="text-xs text-slate-500">24 Okt 2023, 09:30 WIB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">CATATAN PERBAIKAN / PESAN</label>
            <textarea 
              className="w-full h-full min-h-[120px] bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none" 
              placeholder="Tambahkan catatan jika surat perlu direvisi atau ditolak..."
            ></textarea>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 flex flex-col gap-3 shrink-0 bg-slate-50/50 rounded-b-2xl">
          <button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5" 
            onClick={() => { addToast('Surat berhasil disetujui dan diteruskan.', 'success'); setTimeout(() => setActiveTab('surat-keluar'), 1200); }}
          >
            <CheckCircle size={18} />
            Setujui & Teruskan
          </button>
          <div className="flex items-center gap-3">
            <button 
              className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center justify-center gap-2 shadow-sm" 
              onClick={() => addToast('Revisi telah dikirim ke pembuat surat.', 'warning')}
            >
              <FileEdit size={16} />
              Kirim Revisi
            </button>
            <button 
              className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-all flex items-center justify-center gap-2 shadow-sm" 
              onClick={() => setShowRejectModal(true)}
            >
              <XCircle size={16} />
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={showRejectModal}
      onClose={() => setShowRejectModal(false)}
      onConfirm={() => { addToast('Surat telah ditolak.', 'error'); setTimeout(() => setActiveTab('surat-keluar'), 1200); }}
      title="Tolak Surat?"
      message="Anda yakin ingin menolak surat ini? Pembuat surat akan mendapat notifikasi penolakan."
      confirmText="Ya, Tolak"
      type="danger"
    />
    </>
  );
};

export default SuratKeluarDetail;
