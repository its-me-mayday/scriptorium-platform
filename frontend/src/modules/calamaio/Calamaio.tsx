import React from 'react';
import { PenTool, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

const Calamaio = () => {
  const drafts = [
    { id: 'DFT-001', customer: 'Studio Rossi', date: '08/05/2026', total: '€ 145.00', confidence: 0.88, status: 'pending' },
    { id: 'DFT-002', customer: 'Farmacia Centrale', date: '08/05/2026', total: '€ 45.00', confidence: 0.94, status: 'pending' },
    { id: 'DFT-003', customer: 'Ristorante Da Mario', date: '07/05/2026', total: '€ 320.00', confidence: 0.65, status: 'clarification' },
  ];

  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Calamaio</h1>
          <p className="text-secondary">Revisione e conferma delle bozze d'ordine generate da Scriba.</p>
        </div>
      </header>

      <div className="glass message-grid">
        <div className="message-list-header" style={{ gridTemplateColumns: '120px 1.5fr 1fr 100px 150px 120px' }}>
          <span>ID Bozza</span>
          <span>Cliente</span>
          <span>Data</span>
          <span>Totale</span>
          <span>Affidabilità AI</span>
          <span>Azione</span>
        </div>
        {drafts.map((draft) => (
          <div key={draft.id} className="message-row" style={{ gridTemplateColumns: '120px 1.5fr 1fr 100px 150px 120px' }}>
            <div className="col-body" style={{ fontWeight: 600 }}>{draft.id}</div>
            <div className="col-sender">
              <span>{draft.customer}</span>
            </div>
            <div className="col-body">{draft.date}</div>
            <div className="col-body">{draft.total}</div>
            <div className="col-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="confidence-indicator" style={{ width: '60px' }}>
                  <div className="confidence-bar" style={{ width: `${draft.confidence * 100}%` }}></div>
                </div>
                <span style={{ fontSize: '0.75rem' }}>{Math.round(draft.confidence * 100)}%</span>
              </div>
            </div>
            <div className="col-actions" style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-icon" title="Revisiona">
                <PenTool size={16} />
              </button>
              <button className="btn-icon" title="Conferma">
                <CheckCircle size={16} color="var(--success)" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calamaio;
