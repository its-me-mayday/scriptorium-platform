import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  MessageCircle,
  ChevronRight,
  Info,
  Sparkles,
  Save,
  ChevronLeft,
  FileSearch,
  Mail,
  Phone,
  History
} from 'lucide-react';
import api from '../../services/api';
import './Calamaio.css';
import Modal from '../../components/Modal';

const Calamaio = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const fetchDrafts = async () => {
    try {
      const response = await api.get('drafts/');
      setDrafts(response.data);
      if (response.data.length > 0 && !selectedId) {
        setSelectedId(response.data[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drafts:", error);
      setLoading(false);
    }
  };

  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);

  const handleDiscardDraft = () => {
    if (!selectedId) return;
    setIsDiscardModalOpen(true);
  };

  const confirmDiscard = async () => {
    try {
      await api.delete(`drafts/${selectedId}/`);
      setSelectedId(null);
      setIsDiscardModalOpen(false);
      fetchDrafts();
    } catch (error) {
      alert("Errore nello scarto della bozza.");
    }
  };

  const handleTakeCharge = async () => {
    if (!selectedId) return;
    try {
      await api.patch(`drafts/${selectedId}/`, { status: 'processing' });
      fetchDrafts();
    } catch (error) {
      alert("Errore nella presa in carico.");
    }
  };

  const handleFinalize = () => {
    if (!selectedId) return;
    setIsFinalizeModalOpen(true);
  };

  const confirmFinalize = async () => {
    try {
      await api.patch(`drafts/${selectedId}/`, { status: 'completed' });
      setSelectedId(null);
      setIsFinalizeModalOpen(false);
      fetchDrafts();
    } catch (error) {
      alert("Errore nella chiusura dell'ordine.");
    }
  };

  const [isEditingMerchant, setIsEditingMerchant] = useState(false);
  const [merchantForm, setMerchantForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchDrafts();
  }, []);

  const selectedDraft = drafts.find(d => d.id === selectedId);

  useEffect(() => {
    if (selectedDraft?.customer_details) {
      setMerchantForm({
        name: selectedDraft.customer_details.name || '',
        email: selectedDraft.customer_details.email || '',
        phone: selectedDraft.customer_details.phone || ''
      });
    }
  }, [selectedDraft]);

  const handleUpdateMerchant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDraft?.customer) return;
    try {
      await api.put(`customers/${selectedDraft.customer}/`, merchantForm);
      setIsEditingMerchant(false);
      fetchDrafts();
    } catch (error) {
      alert("Errore nell'aggiornamento del mercante.");
    }
  };

  if (loading) return <div className="loading-v3">Preparando il calamaio...</div>;

  return (
    <div className={`calamaio-module animate-slide-up ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar: Draft Selection */}
      <div className="calamaio-sidebar glass-minimal">
        <div className="sidebar-header-v2">
          {!isSidebarCollapsed && <h2 className="serif-title">Scrigno delle Bozze</h2>}
          <button className="btn-collapse-internal" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        <div className="draft-list-v2">
          {drafts.length === 0 ? (
            <div className="empty-state-v2">
              <p>Nessuna bozza da validare.</p>
            </div>
          ) : (
            drafts.map(draft => (
              <div 
                key={draft.id} 
                className={`draft-item-v2 ${selectedId === draft.id ? 'active' : ''}`}
                onClick={() => setSelectedId(draft.id)}
              >
                <div className="draft-info-header">
                  <span className="d-id">{isSidebarCollapsed ? draft.id : `CAL-${draft.id.toString().padStart(3, '0')}`}</span>
                  <div className="confidence-dot" style={{ background: draft.confidence > 0.8 ? '#10b981' : '#f59e0b' }}></div>
                </div>
                {!isSidebarCollapsed && <p className="d-customer">{draft.customer_details?.name || draft.message_details?.sender || 'Mercante Ignoto'}</p>}
                {!isSidebarCollapsed && (
                  <div className="draft-footer">
                    <span>{new Date(draft.created_at).toLocaleDateString()}</span>
                    <span>{draft.items?.length || 0} elementi</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main: Validation Workspace */}
      <div className="calamaio-workspace">
        {selectedDraft ? (
          <>
            <header className="workspace-header">
              <div className="w-info">
                <h1>Calamaio: CAL-{selectedDraft.id.toString().padStart(3, '0')}</h1>
                <p>In gestione a: <strong>Luca Maggio</strong></p>
              </div>
              <div className="w-actions">
                <button className="btn-icon-v2 danger" onClick={handleDiscardDraft} title="Scarta Analisi">
                  <Trash2 size={16} />
                </button>
                
                {selectedDraft.status === 'pending' ? (
                  <button className="btn-premium" onClick={handleTakeCharge}>
                    <Sparkles size={16} />
                    <span>Prendi in Carico</span>
                  </button>
                ) : (
                  <>
                    <button className="btn-outline" onClick={() => alert("Apertura canale di comunicazione con il cliente...")}>
                      <MessageCircle size={16} />
                      <span>Contatta Cliente</span>
                    </button>
                    <button className="btn-premium" onClick={handleFinalize}>
                      <CheckCircle size={16} />
                      <span>Ultima & Archivia</span>
                    </button>
                  </>
                )}
              </div>
            </header>

            <div className="workspace-vertical-flow">
              {/* Merchant Banner (New) */}
              <div className="merchant-banner-v4 card-layered animate-fade-in">
                {!isEditingMerchant ? (
                  <div className="m-banner-content">
                    <div className="m-avatar">
                      {(selectedDraft.customer_details?.name || '?').substring(0,2).toUpperCase()}
                    </div>
                    <div className="m-details">
                      <div className="m-main">
                        <h3>{selectedDraft.customer_details?.name || 'Mercante non identificato'}</h3>
                        <span className={`m-badge ${selectedDraft.customer ? 'verified' : 'new'}`}>
                          {selectedDraft.customer ? 'Mercante Registrato' : 'Identificazione Fallita'}
                        </span>
                      </div>
                      <div className="m-contact">
                        <span><Mail size={12} /> {selectedDraft.customer_details?.email || 'No email'}</span>
                        <span><Phone size={12} /> {selectedDraft.customer_details?.phone || 'No phone'}</span>
                      </div>
                    </div>
                    <button className="btn-outline-small" onClick={() => setIsEditingMerchant(true)}>
                      <PenTool size={14} />
                      <span>Modifica Anagrafica</span>
                    </button>
                  </div>
                ) : (
                  <form className="m-banner-edit" onSubmit={handleUpdateMerchant}>
                    <input 
                      type="text" 
                      placeholder="Nome Mercante"
                      value={merchantForm.name}
                      onChange={e => setMerchantForm({...merchantForm, name: e.target.value})}
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Email"
                      value={merchantForm.email}
                      onChange={e => setMerchantForm({...merchantForm, email: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Telefono"
                      value={merchantForm.phone}
                      onChange={e => setMerchantForm({...merchantForm, phone: e.target.value})}
                    />
                    <div className="edit-actions">
                      <button type="button" className="btn-icon-v2 danger" onClick={() => setIsEditingMerchant(false)}><XCircle size={16}/></button>
                      <button type="submit" className="btn-icon-v2 success"><CheckCircle size={16}/></button>
                    </div>
                  </form>
                )}
              </div>

              {/* Source Message */}
              <div className="workspace-source-v4 glass-minimal">
                <div className="panel-header">
                  <h3><MessageCircle size={14} /> Messaggio Originale</h3>
                  <span className="source-tag-v4">{selectedDraft.message_details?.channel}</span>
                </div>
                <div className="panel-content-v4 source-text">
                  "{selectedDraft.message_details?.body}"
                </div>
              </div>

              {/* Items Editor */}
              <div className="workspace-editor-v4-rich">
                <div className="editor-internal-nav">
                  <div className="nav-assignment-info">
                    <label>Stato Lavorazione</label>
                    <div className={`status-pill-v4 ${selectedDraft.status}`}>
                      {selectedDraft.status === 'processing' ? 'In Lavorazione' : 'In Attesa'}
                    </div>
                  </div>
                  <h3>Elementi ({selectedDraft.items?.length || 0})</h3>
                  <div className="nav-items-list">
                    {selectedDraft.items?.map((item: any, idx: number) => (
                      <a href={`#item-${item.id}`} key={item.id} className="nav-dot-link">
                        <span className="dot-idx">{idx + 1}</span>
                        <span className="dot-label">{item.product_details?.name || item.raw_product_name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="editor-focus-area">
                  <div className="panel-header">
                    <h3><PenTool size={14} /> Analisi Calamaio</h3>
                    <button className="btn-text-action"><Plus size={14} /> Aggiungi Elemento</button>
                  </div>
                  
                  <div className="items-focus-list">
                    {selectedDraft.items && selectedDraft.items.length > 0 ? (
                      selectedDraft.items.map((item: any, idx: number) => (
                        <div id={`item-${item.id}`} key={item.id} className="item-card-focus card-layered animate-slide-up">
                          <div className="card-top-v4">
                            <div className="item-number-v4">#{idx + 1}</div>
                            <div className="product-id-pill">SKU: {item.product_details?.sku || 'AUTO-ID'}</div>
                            <div className={`confidence-badge-v4 ${item.confidence > 0.8 ? 'high' : 'low'}`}>
                              <Sparkles size={10} />
                              {Math.round(item.confidence * 100)}% Sicuro
                            </div>
                          </div>
                          
                          <div className="card-body-focus">
                            <div className="product-main-input">
                              <label>Elemento Identificato</label>
                              <input 
                                type="text" 
                                className="input-mega-v4"
                                defaultValue={item.product_details?.name || item.raw_product_name} 
                              />
                            </div>
                            
                            <div className="details-row-focus">
                              <div className="input-group-focus">
                                <label>Quantità</label>
                                <input type="number" defaultValue={item.quantity} />
                              </div>
                              <div className="input-group-focus">
                                <label>Unità</label>
                                <input type="text" defaultValue={item.unit || ''} />
                              </div>
                              <div className="input-group-focus">
                                <label>Note</label>
                                <input type="text" defaultValue={item.reason || ''} />
                              </div>
                            </div>
                          </div>

                          <div className="card-actions-focus">
                            <button className="btn-icon-v2 danger"><Trash2 size={14} /></button>
                            <button className="btn-premium-small"><Save size={14} /> Salva</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-items-v2">
                        <p>Nessun elemento identificato.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-selection-v3">
            <FileSearch size={48} className="text-muted" />
            <p>Seleziona una bozza dallo Scrigno per iniziare</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={confirmDiscard}
        type="danger"
        title="Scarta Analisi"
        message="Sei sicuro di voler scartare questa analisi? I dati estratti verranno persi, ma il messaggio originale rimarrà nell'Inbox."
        confirmText="Sì, Scarta"
      />

      <Modal 
        isOpen={isFinalizeModalOpen}
        onClose={() => setIsFinalizeModalOpen(false)}
        onConfirm={confirmFinalize}
        type="question"
        title="Ultima Ordine"
        message="Hai revisionato tutti gli elementi? L'ordine verrà archiviato e rimosso dal workspace del Calamaio."
        confirmText="Sì, Conferma Tutto"
      />
    </div>
  );
};

export default Calamaio;
