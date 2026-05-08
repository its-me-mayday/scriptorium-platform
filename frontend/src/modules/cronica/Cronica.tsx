import React from 'react';
import { History, CheckCircle2, Clock, Truck, PackageCheck, AlertTriangle } from 'lucide-react';

const Cronica = () => {
  const events = [
    { id: 1, time: '10:24', date: '08/05/2026', type: 'Confermato', desc: 'Ordine #1024 confermato da Marco', icon: CheckCircle2, color: 'var(--success)' },
    { id: 2, time: '10:20', date: '08/05/2026', type: 'Modifica', desc: 'Marco ha corretto il prodotto toner nella bozza DFT-001', icon: Clock, color: 'var(--warning)' },
    { id: 3, time: '10:13', date: '08/05/2026', type: 'Bozza', desc: 'Scriba ha generato una bozza per Studio Rossi', icon: PackageCheck, color: 'var(--accent-gold)' },
    { id: 4, time: '10:12', date: '08/05/2026', type: 'Messaggio', desc: 'Messaggio ricevuto da WhatsApp (Studio Rossi)', icon: History, color: 'var(--info)' },
  ];

  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Cronica</h1>
          <p className="text-secondary">Timeline storica degli eventi e audit trail.</p>
        </div>
      </header>

      <div className="glass section-card">
        <div className="timeline-list">
          {events.map((event) => (
            <div key={event.id} className="timeline-item" style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', position: 'relative' }}>
              <div className="timeline-marker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: event.color, padding: '0.5rem', borderRadius: '50%', color: 'var(--bg-main)', display: 'flex' }}>
                  <event.icon size={18} />
                </div>
                {event.id !== events.length && <div style={{ width: '2px', flex: 1, background: 'var(--border-color)', marginTop: '0.5rem' }}></div>}
              </div>
              <div className="timeline-content" style={{ paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{event.type}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.time} • {event.date}</span>
                </div>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cronica;
