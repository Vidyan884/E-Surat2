import React, { useState, useEffect } from 'react';
import { Building2, Hash, Calendar, ClipboardList, X, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

const SuratDetail = ({ setActiveTab }) => {
  const { addToast } = useToast();
  const { token } = useAuth();
  
  const [surat, setSurat] = useState(null);
  const [users, setUsers] = useState([]);
  const [kopSurat, setKopSurat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [disposisiForm, setDisposisiForm] = useState({
    sifat: 'Segera',
    penerimaId: '',
    arahan: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suratRes, usersRes, kopRes] = await Promise.all([
          fetch('/api/surat-masuk', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/users', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/templates/kop/active', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);
        
        if (suratRes.ok && usersRes.ok) {
          const suratList = await suratRes.json();
          // Find first Menunggu Disposisi or just use the first available
          const targetSurat = suratList.find(s => s.status === 'Menunggu Disposisi') || suratList[0];
          setSurat(targetSurat);
          setUsers(await usersRes.json());
        }
        
        if (kopRes.ok) {
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
  }, [token]);

  const handleKirimDisposisi = async () => {
    if (!disposisiForm.penerimaId || !disposisiForm.arahan) {
      addToast('Tujuan penerima dan instruksi harus diisi!', 'error');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/surat-masuk/${surat.id}/disposisi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          penerimaId: disposisiForm.penerimaId,
          arahan: `[${disposisiForm.sifat}] ${disposisiForm.arahan}`
        })
      });

      if (response.ok) {
        addToast('Disposisi berhasil dikirim!', 'success');
        setTimeout(() => setActiveTab('surat-masuk'), 1200);
      } else {
        throw new Error('Failed to send disposisi');
      }
    } catch (err) {
      addToast('Gagal mengirim disposisi', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Memuat detail surat...</div>;
  if (!surat) return <div className="p-8 text-center text-slate-500">Tidak ada surat yang dapat ditampilkan.</div>;

  const dateObj = new Date(surat.tanggal);
  const tanggalStr = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

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
              <span className="text-xs font-medium text-slate-500">Diterima: {tanggalStr}</span>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 leading-tight">{surat.perihal}</h2>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Building2 size={14} className="text-slate-400" />
              <span className="truncate max-w-[200px] md:max-w-none">{surat.asal}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Hash size={14} className="text-slate-400" />
              <span>{surat.noSurat}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Calendar size={14} className="text-slate-400" />
              <span>{tanggalStr}</span>
            </div>
          </div>
        </div>

        {/* PDF Document Mock */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative bg-slate-200/50 flex justify-center">
          <div className="w-full max-w-[800px] bg-white shadow-lg min-h-[900px] rounded border border-slate-300 p-12 lg:p-16 relative">
            {/* Kop Surat Mock */}
            <div className="flex items-center border-b-[3px] border-black pb-6 mb-8 gap-6">
              <div className="w-20 h-20 bg-slate-200 rounded-full shrink-0 flex items-center justify-center opacity-70 overflow-hidden">
                {kopSurat && kopSurat.logoUrl ? (
                  <img src={kopSurat.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-slate-400 font-bold">LOGO</div>
                )}
              </div>
              <div className="flex-1 text-center pr-26">
                <h3 className="font-serif font-bold text-xl tracking-wide uppercase text-slate-800 leading-snug whitespace-pre-line">
                  {kopSurat ? kopSurat.namaInstitusi : 'Kementerian Pendidikan\nKebudayaan, Riset, dan Teknologi'}
                </h3>
                <p className="font-serif text-sm mt-1 text-slate-600">
                  {kopSurat ? kopSurat.alamat : 'Jl. Jenderal Sudirman Senayan, Jakarta 10270'}
                </p>
                <p className="font-serif text-xs text-slate-500 mt-0.5">
                  {kopSurat ? `${kopSurat.kontak}${kopSurat.website ? `, Laman: ${kopSurat.website}` : ''}` : 'Telepon (021) 5711144, Laman: www.kemdikbud.go.id'}
                </p>
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
              {['Sangat Segera', 'Segera', 'Biasa'].map(s => (
                <button 
                  key={s}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${disposisiForm.sifat === s ? 'text-emerald-700 bg-white shadow-sm border border-slate-200 font-bold' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                  onClick={() => setDisposisiForm({ ...disposisiForm, sifat: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 tracking-wider">DITERUSKAN KEPADA</label>
            <div className="relative">
              <select 
                value={disposisiForm.penerimaId}
                onChange={(e) => setDisposisiForm({ ...disposisiForm, penerimaId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Pilih pejabat / pegawai tujuan...</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.roles?.map(r => r.name).join(', ') || 'Tanpa Role'})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 tracking-wider">INSTRUKSI / CATATAN PIMPINAN</label>
            <textarea 
              value={disposisiForm.arahan}
              onChange={(e) => setDisposisiForm({ ...disposisiForm, arahan: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none min-h-[120px]" 
              placeholder="Tuliskan instruksi atau arahan untuk tindak lanjut surat ini..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-800 tracking-wider">INSTRUKSI CEPAT</label>
            <div className="flex flex-wrap gap-2">
              {['Tindak lanjuti', 'Wakili / Hadiri', 'Siapkan bahan', 'Untuk diketahui'].map(ins => (
                <button 
                  key={ins}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-medium text-slate-600 transition-colors"
                  onClick={() => setDisposisiForm({ ...disposisiForm, arahan: disposisiForm.arahan ? `${disposisiForm.arahan}\n- ${ins}` : `- ${ins}` })}
                >
                  {ins}
                </button>
              ))}
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
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50"
            onClick={handleKirimDisposisi}
            disabled={isSubmitting}
          >
            <Send size={16} className="-mt-0.5" />
            {isSubmitting ? 'Mengirim...' : 'Kirim Disposisi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuratDetail;
