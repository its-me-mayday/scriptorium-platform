import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Send, 
  Trash2, 
  Archive,
  User,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import './Inbox.css';

const Inbox = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [messages] = useState([
    { 
      id: 1, 
      sender: 'Studio Rossi', 
      subject: 'Order for 20 pacchi carta A4', 
      body: 'Buongiorno, vorremmo ordinare 20 pacchi di carta A4 Navigator 80g. Potete confermare la disponibilità per lunedì?',
      time: '10:12', 
      channel: 'WhatsApp',
      status: 'new' 
    },
    { 
      id: 2, 
      sender: 'Officina Verde', 
      subject: 'Inquiry: Toner HP 305A', 
      body: 'Avete disponibilità per i toner HP 305A Black? Ce ne servirebbero 3 pezzi entro fine settimana.',
      time: '09:45', 
      channel: 'Telegram',
      status: 'pending' 
    },
    { 
      id: 3, 
      sender: 'Marco Bianchi', 
      subject: 'Order Confirmation', 
      body: 'L\'ordine è giunto a destinazione, grazie mille per la celerità. Alla prossima!',
      time: '09:30', 
      channel: 'Email',
      status: 'completed' 
    },
  ]);

  const selectedMessage = messages.find(m => m.id === selectedId);

  const handleSimulateIncoming = async () => {
    const text = prompt("Inserisci il corpo della missiva simulata:");
    if (!text) return;

    try {
      const response = await fetch('http://localhost:8000/api/inbox/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'Test Mercante',
          subject: 'Simulation Test',
          body: text,
          channel: 'WhatsApp',
          status: 'new'
        })
      });

      if (response.ok) {
        alert("Missiva inviata con successo al Scriptorium!");
        // In a real app, we would refresh the list here
      } else {
        alert("Errore nell'invio della missiva.");
      }
    } catch (error) {
      console.error(error);
      alert("Errore di connessione al backend.");
    }
  };

  return (
    <div className="inbox-module animate-fade-in">
      <div className="inbox-sidebar glass-minimal">
        <div className="inbox-header">
          <h1>Inbox</h1>
          <div className="header-actions">
            <button className="btn-icon-v2" onClick={handleSimulateIncoming} title="Simula Ingressso">
              <Sparkles size={18} />
            </button>
            <button className="btn-icon-v2">
              <Plus size={18} />
            </button>
          </div>
        </div>
        
        <div className="inbox-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search messages..." />
        </div>

        <div className="message-list-minimal">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`msg-preview ${selectedId === msg.id ? 'active' : ''}`}
              onClick={() => setSelectedId(msg.id)}
            >
              <div className="msg-preview-header">
                <span className="msg-sender">{msg.sender}</span>
                <span className="msg-time">{msg.time}</span>
              </div>
              <p className="msg-subject">{msg.subject}</p>
              <div className="msg-preview-footer">
                <span className={`status-tag ${msg.status}`}>{msg.status}</span>
                <span className="msg-channel">{msg.channel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="inbox-detail">
        {selectedMessage ? (
          <>
            <div className="detail-header glass">
              <div className="detail-user-info">
                <div className="user-avatar-large">
                  <User size={20} />
                </div>
                <div>
                  <h3>{selectedMessage.sender}</h3>
                  <p className="text-secondary">via {selectedMessage.channel}</p>
                </div>
              </div>
              <div className="detail-actions">
                <button className="btn-icon-v2"><Archive size={18} /></button>
                <button className="btn-icon-v2"><Trash2 size={18} /></button>
                <button className="btn-premium">
                  <Sparkles size={16} />
                  <span>Generate Draft</span>
                </button>
              </div>
            </div>

            <div className="detail-body">
              <div className="message-content glass-minimal">
                <div className="content-meta">
                  <span className="content-date">Today, {selectedMessage.time}</span>
                </div>
                <h2 className="content-subject">{selectedMessage.subject}</h2>
                <p className="content-text">{selectedMessage.body}</p>
              </div>

              <div className="reply-area glass-minimal">
                <textarea placeholder="Write a reply..."></textarea>
                <div className="reply-footer">
                  <button className="btn-outline">
                    <span>Discard</span>
                  </button>
                  <button className="btn-premium">
                    <Send size={16} />
                    <span>Send Missive</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-selection">
            <MessageSquare size={48} className="text-muted" />
            <p>Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
