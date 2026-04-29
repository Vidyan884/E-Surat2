import React from 'react';
import { Building2, Hash, Calendar, ClipboardList, X, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '../components/Toast';

const SuratDetail = ({ setActiveTab }) => {
  const { addToast } = useToast();

  const handleKirimDisposisi = () => {
    addToast('Disposisi berhasil dikirim ke Wakil Rektor I.', 'success');
    setTimeout(() => setActiveTab('surat-masuk'), 1200);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Left Column: Letter Preview */}
      <div className="w-full lg:w-3/5 xl:w-2/3 h-full flex flex-col overflow-hidden bg-slate-50/50 rounded-2xl border border-slate-200">
        <div className="p-4 md:p-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button 
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
              onClick={() => setActiveTab('surat-masuk')}
            >
              <ArrowLeft size={16} />
              Kembali
            </button>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200">SURAT MASUK</span>
              <span className="text-xs font-medium text-slate-500">Diterima: 12 Okt 2023</span>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 leading-tight">Undangan Rapat Koordinasi Nasional APTISI 2023</h2>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Building2 size={14} className="text-slate-400" />
              <span className="truncate max-w-[200px] md:max-w-none">Kementerian Pendidikan dan Kebudayaan</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Hash size={14} className="text-slate-400" />
              <span>124/B.1/KU/2023</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Calendar size={14} className="text-slate-400" />
              <span>10 Okt 2023</span>
            </div>
          </div>
        </div>

        {/* PDF Document Mock */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative bg-slate-200/50 flex justify-center">
          <div className="w-full max-w-[800px] bg-white shadow-lg min-h-[900px] rounded border border-slate-300 p-12 lg:p-16 relative">
            {/* Kop Surat Mock */}
            <div className="flex items-center border-b-[3px] border-black pb-6 mb-8 gap-6">
              <div className="w-20 h-20 bg-slate-200 rounded-full shrink-0 flex items-center justify-center opacity-70">
                {/* Logo placeholder */}
              </div>
              <div className="flex-1 text-center pr-26">
                <h3 className="font-serif font-bold text-xl tracking-wide uppercase text-slate-800 leading-snug">Kementerian Pendidikan<br/>Kebudayaan, Riset, dan Teknologi</h3>
                <p className="font-serif text-sm mt-1 text-slate-600">Jl. Jenderal Sudirman Senayan, Jakarta 10270</p>
                <p className="font-serif text-xs text-slate-500 mt-0.5">Telepon (021) 5711144, Laman: www.kemdikbud.go.id</p>
              </div>
            </div>
            
            {/* Content Mock with Skeleton lines */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-serif">
                <div className="space-y-1">
                  <div className="flex"><span className="w-16">Nomor</span><span>: 124/B.1/KU/2023</span></div>
                  <div className="flex"><span className="w-16">Sifat</span><span>: Segera</span></div>
                  <div className="flex"><span className="w-16">Lampiran</span><span>: 1 (satu) berkas</span></div>
                  <div className="flex"><span className="w-16">Hal</span><span className="font-bold">: Undangan Rapat Koordinasi Nasional APTISI 2023</span></div>
                </div>
                <div className="text-right">
                  10 Oktober 2023
                </div>
              </div>

              <div className="pt-8 space-y-1 text-sm font-serif">
                <p>Yth. Rektor/Pimpinan Perguruan Tinggi</p>
                <p>Di tempat</p>
              </div>

              <div className="pt-6 space-y-4 text-sm font-serif leading-relaxed text-justify indent-8">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-[85%]"></div>
                
                <div className="h-4 bg-slate-200 rounded w-full mt-6"></div>
                <div className="h-4 bg-slate-200 rounded w-[90%]"></div>
                <div className="h-4 bg-slate-200 rounded w-[60%]"></div>
              </div>

              <div className="flex justify-end pt-16">
                <div className="w-64 text-center text-sm font-serif">
                  <p>Direktur Jenderal,</p>
                  <div className="h-24 w-full flex items-center justify-center opacity-30 mt-2 mb-2">
                    <span className="font-signature text-3xl text-slate-400">Ttd.</span>
                  </div>
                  <p className="font-bold underline">Prof. Ir. Nizam, M.Sc., DIC, Ph.D., IPU, Asean Eng.</p>
                  <p>NIP. 196107061987101001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Disposition Form */}
      <div className="w-full lg:w-2/5 xl:w-1/3 h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <ClipboardList size={20} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-none mb-1">Lembar Disposisi</h3>
            <p className="text-xs text-slate-500 font-medium">Instruksi penerusan surat masuk</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-slate-800 tracking-wider">SIFAT DISPOSISI</label>
            <div className="flex rounded-xl p-1 bg-slate-100/80 border border-slate-200/60">
              <button className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all">Sangat Segera</button>
              <button className="flex-1 py-1.5 text-xs font-bold rounded-lg text-emerald-700 bg-white shadow-sm border border-slate-200 transition-all">Segera</button>
              <button className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all">Biasa</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 tracking-wider">DITERUSKAN KEPADA</label>
            <div className="min-h-[46px] bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-wrap gap-2 items-center focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50 transition-all cursor-text">
              <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-semibold group">
                Wakil Rektor I
                <button className="text-emerald-600 hover:text-red-500 hover:bg-white rounded-full p-0.5 transition-colors"><X size={12} /></button>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-semibold group">
                Dekan Fakultas Tarbiyah
                <button className="text-emerald-600 hover:text-red-500 hover:bg-white rounded-full p-0.5 transition-colors"><X size={12} /></button>
              </div>
              <input type="text" placeholder="Ketik tujuan..." className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 py-0.5" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Gunakan koma atau enter untuk menambah tujuan.</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 tracking-wider">INSTRUKSI / CATATAN PIMPINAN</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none min-h-[120px]" 
              placeholder="Tuliskan instruksi atau arahan untuk tindak lanjut surat ini..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-800 tracking-wider">INSTRUKSI CEPAT</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-medium text-slate-600 transition-colors">Tindak lanjuti</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-medium text-slate-600 transition-colors">Wakili / Hadiri</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-medium text-slate-600 transition-colors">Siapkan bahan</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-medium text-slate-600 transition-colors">Untuk diketahui</button>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50 rounded-b-2xl">
          <button 
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-200 transition-colors"
            onClick={() => setActiveTab('surat-masuk')}
          >
            Batal
          </button>
          <button 
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
            onClick={handleKirimDisposisi}
          >
            <Send size={16} className="-mt-0.5" />
            Kirim Disposisi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuratDetail;
