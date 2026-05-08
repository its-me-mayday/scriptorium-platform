import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  MoreVertical,
  X,
  Send,
  User,
  Hash
} from 'lucide-react';
import './Inbox.css';

const Inbox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Studio Rossi', body: 'Ciao, mi mandi 20 pacchi di carta A4 e 5 toner come l\'altra volta?', time: '10:12', channel: 'WhatsApp', status: 'new' },
    { id: 2, sender: 'Officina Verde', body: 'Avete disponibilità per i toner HP?', time: '09:45', channel: 'Telegram', status: 'analyzing' },
    { id: 3, sender: 'Marco Bianchi', body: 'Ordine confermato per lunedì, grazie!', time: '09:30', channel: 'Email', status: 'converted' },
  ]);

  return (
    <div className="inbox-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Messaggero</h1>
          <p className="medieval-detail">Il crocevia delle missive e delle richieste esterne.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Nuova Missiva</span>
        </button>
      </header>

      <div className="inbox-toolbar glass">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Cerca tra i messaggi..." />
        </div>
        <div className="toolbar-actions">
          <button className="btn-secondary">
            <Filter size={18} />
            <span>Filtra</span>
          </button>
        </div>
      </div>

      <div className="inbox-content">
        <div className="glass message-grid">
          <div className="message-list-header">
            <span>Mittente</span>
            <span>Contenuto</span>
            <span>Canale</span>
            <span>Stato</span>
            <span>Azione</span>
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className="message-row">
              <div className="col-sender">
                <div className="avatar-small">{msg.sender[0]}</div>
                <span>{msg.sender}</span>
              </div>
              <div className="col-body">
                <p>{msg.body}</p>
                <span className="time">{msg.time}</span>
              </div>
              <div className="col-channel">
                <span className={`channel-tag ${msg.channel.toLowerCase()}`}>{msg.channel}</span>
              </div>
              <div className="col-status">
                <span className={`status-badge ${msg.status}`}>{msg.status}</span>
              </div>
              <div className="col-actions">
                <button className="btn-icon">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Message Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass modal-content"
            >
              <div className="modal-header">
                <h3>Inserimento Manuale</h3>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label><User size={14} /> Cliente</label>
                  <input type="text" placeholder="Nome cliente o contatto..." />
                </div>
                <div className="form-group">
                  <label><Hash size={14} /> Canale di origine</label>
                  <select>
                    <option>WhatsApp</option>
                    <option>Telefono</option>
                    <option>Telegram</option>
                    <option>Manuale</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><MessageSquare size={14} /> Messaggio ricevuto</label>
                  <textarea placeholder="Copia qui il testo del messaggio..." rows={5}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button className="btn-primary">
                  <Send size={16} />
                  <span>Crea Messaggio</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inbox;
