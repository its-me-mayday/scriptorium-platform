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
  FileSearch
} from 'lucide-react';
import api from '../../services/api';
import './Calamaio.css';

const Calamaio = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleDiscardDraft = async () => {
    if (!selectedId) return;
    if (!confirm("Sei sicuro di voler scartare questa analisi? Il messaggio originale resterà nell'Inbox.")) return;

    try {
      await api.delete(`drafts/${selectedId}/`);
      setSelectedId(null);
      fetchDrafts();
    } catch (error) {
      alert("Errore nello scarto della bozza.");
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const selectedDraft = drafts.find(d => d.id === selectedId);

  if (loading) return <div className="loading-v3">Preparando il calamaio...</div>;

  return (
    <div className="calamaio-module animate-slide-up">
      {/* Sidebar: Draft Selection */}
      <div className="calamaio-sidebar glass-minimal">
        <div className="sidebar-header-v2">
          <h2 className="serif-title">Pending Vault</h2>
          <span className="badge-count">{drafts.length}</span>
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
                  <span className="d-id">DFT-{draft.id.toString().padStart(3, '0')}</span>
                  <div className="confidence-dot" style={{ background: draft.confidence > 0.8 ? '#10b981' : '#f59e0b' }}></div>
                </div>
                <p className="d-customer">{draft.message_details?.sender || 'Unknown Merchant'}</p>
                <div className="draft-footer">
                  <span>{new Date(draft.created_at).toLocaleDateString()}</span>
                  <span>{draft.items?.length || 0} items</span>
                </div>
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
                <h1>Validation: DFT-{selectedDraft.id.toString().padStart(3, '0')}</h1>
                <p>Assigned to <strong>Luca Maggio</strong> • <span className="text-secondary">{selectedDraft.message_details?.sender}</span></p>
              </div>
              <div className="w-actions">
                <button className="btn-icon-v2" onClick={handleDiscardDraft} title="Scarta Analisi">
                  <Trash2 size={16} />
                </button>
                <button className="btn-outline">
                  <MessageCircle size={16} />
                  <span>Ask Customer</span>
                </button>
                <button className="btn-premium">
                  <CheckCircle size={16} />
                  <span>Approve & Seal</span>
                </button>
              </div>
            </header>

            <div className="workspace-grid">
              {/* Left: Source of Truth */}
              <div className="workspace-source glass-minimal">
                <div className="panel-header">
                  <h3><MessageCircle size={14} /> Original Message</h3>
                  <span className="source-tag">{selectedDraft.message_details?.channel}</span>
                </div>
                <div className="panel-content source-text">
                  "{selectedDraft.message_details?.body}"
                </div>
                <div className="panel-footer-ai">
                  <Sparkles size={14} color="var(--accent-primary)" />
                  <span>Scriba extracted {selectedDraft.items?.length || 0} items from this missive.</span>
                </div>
              </div>

              {/* Right: Draft Editor */}
              <div className="workspace-editor card-layered">
                <div className="panel-header">
                  <h3><PenTool size={14} /> Draft Details</h3>
                  <button className="btn-text-action"><Plus size={14} /> Add Item</button>
                </div>
                
                <div className="editor-table-header">
                  <span>Product</span>
                  <span>Qty</span>
                  <span>AI Conf.</span>
                  <span>Actions</span>
                </div>

                <div className="editor-items">
                  {selectedDraft.items && selectedDraft.items.length > 0 ? (
                    selectedDraft.items.map((item: any) => (
                      <div key={item.id} className="editor-row">
                        <div className="col-product">
                          <input type="text" defaultValue={item.product_name || item.raw_product_name} />
                          {item.confidence < 0.7 && <AlertCircle size={12} className="warning-icon" />}
                        </div>
                        <div className="col-qty">
                          <input type="number" defaultValue={item.quantity} />
                        </div>
                        <div className="col-ai">
                          <div className="mini-conf-bar">
                            <div className="fill" style={{ width: `${item.confidence * 100}%` }}></div>
                          </div>
                        </div>
                        <div className="col-actions">
                          <button className="btn-icon-small"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-items-v2">
                      <p>Scriba non ha identificato prodotti certi. Aggiungili manualmente.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-selection-v3">
            <FileSearch size={48} className="text-muted" />
            <p>Seleziona una bozza pendente per iniziare la validazione</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calamaio;
