import React from 'react';
import { 
  History, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  AlertTriangle,
  User,
  ArrowRight,
  FilterX
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import './Cronica.css';

const Cronica = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const merchantId = searchParams.get('merchant');

  const events = [
    { id: 1, time: '14:24', date: 'Oggi', type: 'Confermato', desc: 'Ordine CAL-042 confermato da Luca Maggio', icon: CheckCircle2, color: '#10b981', user: 'LM', merchantId: '1' },
    { id: 2, time: '14:20', date: 'Oggi', type: 'Modifica', desc: 'Aggiornamento quantità prodotto: Rotoli Carta Politenata (+2)', icon: Clock, color: '#f59e0b', user: 'MR', merchantId: '1' },
    { id: 3, time: '12:13', date: 'Oggi', type: 'Scriba AI', desc: 'Bozza generata automaticamente per Studio Rossi', icon: Sparkles, color: 'var(--accent-primary)', user: 'AI', merchantId: '2' },
    { id: 4, time: '10:12', date: 'Oggi', type: 'Messaggio', desc: 'Nuova missiva ricevuta via WhatsApp da Cliente Gre & Mu', icon: MessageSquare, color: '#6366f1', user: 'SYS', merchantId: '3' },
    { id: 5, time: '18:45', date: 'Ieri', type: 'Sistema', desc: 'Nuovo membro della Gilda invitato: Alessio Verdi', icon: User, color: '#94a3b8', user: 'LM', merchantId: null },
  ];

  const filteredEvents = merchantId 
    ? events.filter(e => e.merchantId === merchantId)
    : events;

  return (
    <div className="cronica-module animate-fade-in">
      <header className="module-header">
        <div>
          <h1 className="serif-title">La Cronica</h1>
          <p className="text-secondary">Il registro eterno delle azioni compiute nello Scriptorium.</p>
        </div>
        {merchantId && (
          <div className="filter-badge-active card-layered">
            <Sparkles size={14} className="text-accent" />
            <span>Audit Mercante ID-{merchantId.padStart(4, '0')}</span>
            <button className="btn-clear-filter" onClick={() => setSearchParams({})}>
              <FilterX size={14} />
            </button>
          </div>
        )}
      </header>

      <div className="cronica-timeline-v2 glass-minimal">
        <div className="timeline-v2-container">
          {filteredEvents.length === 0 ? (
            <div className="empty-state-v4">
              <History size={48} className="text-muted" />
              <h3>Cronica Vuota</h3>
              <p>Nessuna azione registrata per questo Mercante.</p>
              <button className="btn-outline" onClick={() => setSearchParams({})}>Torna alla Cronica Universale</button>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="timeline-v2-item animate-slide-up">
                <div className="timeline-v2-marker">
                  <div className="marker-dot" style={{ backgroundColor: event.color }}>
                    <event.icon size={14} />
                  </div>
                  <div className="marker-line"></div>
                </div>
                
                <div className="timeline-v2-card card-layered">
                  <div className="card-v2-header">
                    <div className="event-type-badge" style={{ color: event.color, borderColor: `${event.color}40` }}>
                      {event.type}
                    </div>
                    <span className="event-time">{event.date}, {event.time}</span>
                  </div>
                  
                  <p className="event-desc">{event.desc}</p>
                  
                  <div className="event-footer">
                    <div className="event-user">
                      <div className="u-avatar">{event.user}</div>
                      <span>Autore: {event.user === 'AI' ? 'Scriba' : event.user === 'SYS' ? 'Sistema' : event.user}</span>
                    </div>
                    <button className="btn-detail-link">
                      <span>Dettagli</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cronica;
