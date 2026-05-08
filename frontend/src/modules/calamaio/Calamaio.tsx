import React, { useState } from 'react';
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
  ChevronLeft
} from 'lucide-react';
import './Calamaio.css';

const Calamaio = () => {
  const [selectedId, setSelectedId] = useState<string | null>('DFT-001');
  
  const [drafts] = useState([
    { 
      id: 'DFT-001', 
      customer: 'Studio Rossi', 
      date: '08/05/2026', 
      confidence: 0.88,
      originalText: 'Saluti, necessitiamo di 20 risme di carta Navigator 80g e 2 toner HP 305A Black.',
      items: [
        { id: 1, name: 'Carta A4 Navigator 80g', qty: 20, price: 5.50, confidence: 0.95 },
        { id: 2, name: 'Toner HP 305A Black', qty: 2, price: 65.00, confidence: 0.82 }
      ]
    },
    { 
      id: 'DFT-002', 
      customer: 'Farmacia Centrale', 
      date: '08/05/2026', 
      confidence: 0.94,
      originalText: 'Ciao! Mi servirebbe 1 confezione di penne BIC blu, grazie.',
      items: [
        { id: 3, name: 'Penne BIC Cristal Blu (box 50)', qty: 1, price: 12.00, confidence: 0.98 }
      ]
    },
    { 
      id: 'DFT-003', 
      customer: 'Ristorante Da Mario', 
      date: '07/05/2026', 
      confidence: 0.65,
      originalText: 'Potete portarmi "il solito"? L\'altra volta era perfetto.',
      items: [
        { id: 4, name: 'Tovaglioli 2 veli 33x33', qty: 10, price: 2.50, confidence: 0.45 },
        { id: 5, name: 'Detergente Piatti 5L', qty: 2, price: 8.00, confidence: 0.75 }
      ]
    }
  ]);

  const selectedDraft = drafts.find(d => d.id === selectedId);

  return (
    <div className="calamaio-module animate-slide-up">
      {/* Sidebar: Draft Selection */}
      <div className="calamaio-sidebar glass-minimal">
        <div className="sidebar-header-v2">
          <h2 className="serif-title">Pending Vault</h2>
          <span className="badge-count">{drafts.length}</span>
        </div>
        
        <div className="draft-list-v2">
          {drafts.map(draft => (
            <div 
              key={draft.id} 
              className={`draft-item-v2 ${selectedId === draft.id ? 'active' : ''}`}
              onClick={() => setSelectedId(draft.id)}
            >
              <div className="draft-info-header">
                <span className="d-id">{draft.id}</span>
                <div className="confidence-dot" style={{ opacity: draft.confidence }}></div>
              </div>
              <p className="d-customer">{draft.customer}</p>
              <div className="draft-footer">
                <span>{draft.date}</span>
                <span>€ {(draft.items.reduce((acc, item) => acc + (item.qty * item.price), 0)).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Validation Workspace */}
      <div className="calamaio-workspace">
        {selectedDraft ? (
          <>
            <header className="workspace-header">
              <div className="w-info">
                <h1>Validation: {selectedDraft.id}</h1>
                <p>Assigned to <strong>Luca Maggio</strong> • <span className="text-secondary">{selectedDraft.customer}</span></p>
              </div>
              <div className="w-actions">
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
                  <span className="source-tag">WhatsApp</span>
                </div>
                <div className="panel-content source-text">
                  "{selectedDraft.originalText}"
                </div>
                <div className="panel-footer-ai">
                  <Sparkles size={14} color="var(--accent-primary)" />
                  <span>Scriba extracted {selectedDraft.items.length} items from this missive.</span>
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
                  <span>Price</span>
                  <span>Total</span>
                  <span>AI</span>
                  <span></span>
                </div>

                <div className="editor-items">
                  {selectedDraft.items.map(item => (
                    <div key={item.id} className="editor-row">
                      <div className="col-product">
                        <input type="text" defaultValue={item.name} />
                        {item.confidence < 0.7 && <AlertCircle size={12} className="warning-icon" />}
                      </div>
                      <div className="col-qty">
                        <input type="number" defaultValue={item.qty} />
                      </div>
                      <div className="col-price">
                        <input type="text" defaultValue={`€ ${item.price.toFixed(2)}`} />
                      </div>
                      <div className="col-total">
                        € {(item.qty * item.price).toFixed(2)}
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
                  ))}
                </div>

                <div className="editor-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>€ {(selectedDraft.items.reduce((acc, item) => acc + (item.qty * item.price), 0)).toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>€ {(selectedDraft.items.reduce((acc, item) => acc + (item.qty * item.price), 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-selection-v3">
            <PenTool size={48} className="text-muted" />
            <p>Select a pending draft to start validation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calamaio;
