import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Archive, 
  Trash2, 
  Sparkles, 
  Send,
  MoreVertical,
  ChevronRight,
  MessageSquare,
  Clock,
  Circle
} from 'lucide-react';
import api from '../../services/api';
import './Inbox.css';

import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

const getChannelIcon = (channel: string) => {
  switch (channel.toLowerCase()) {
    case 'whatsapp': return <MessageSquare size={14} color="#25D366" />;
    case 'telegram': return <Send size={14} color="#0088cc" />;
    case 'email': return <Clock size={14} color="#ea4335" />;
    default: return <MessageSquare size={14} />;
  }
};

const Inbox = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await api.get('inbox/messages/');
      const sorted = response.data.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setMessages(sorted);
      if (sorted.length > 0 && !selectedId) {
        setSelectedId(sorted[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSimulateIncoming = async () => {
    const text = prompt("Inserisci il corpo della missiva simulata:");
    if (!text) return;

    try {
      await api.post('inbox/messages/webhook/', {
        sender: 'Test Mercante',
        channel: 'WhatsApp',
        text: text
      });
      fetchMessages();
    } catch (error) {
      alert("Errore nell'invio della missiva.");
    }
  };

  const handleGenerateDraft = async () => {
    if (!selectedMessage) return;
    
    setIsGenerating(true);
    
    // Simula l'elaborazione dell'Alchimista Scriba
    setTimeout(async () => {
      try {
        // In una versione reale, qui chiameremmo un endpoint AI che restituisce il JSON della bozza
        await api.post('drafts/', {
          message: selectedMessage.id,
          status: 'pending',
          confidence: 0.85
        });
        
        setIsGenerating(false);
        navigate('/calamaio');
      } catch (error) {
        console.error(error);
        setIsGenerating(false);
        alert("Scriba ha incontrato un errore nell'interpretazione.");
      }
    }, 1500);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteMessage = async () => {
    if (!selectedId) return;
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`inbox/messages/${selectedId}/`);
      setSelectedId(null);
      setIsDeleteModalOpen(false);
      fetchMessages();
    } catch (error) {
      setIsDeleteModalOpen(false);
      setErrorMessage("Errore nella distruzione della missiva.");
      setIsErrorModalOpen(true);
    }
  };

  const selectedMessage = messages.find(m => m.id === selectedId);

  if (loading) return <div className="loading-v3">Attingendo dati dal Scriptorium...</div>;

  return (
    <div className="inbox-module animate-fade-in">
      {isGenerating && (
        <div className="scriba-overlay">
          <div className="scriba-loader">
            <Sparkles size={48} className="animate-pulse" />
            <h2 className="serif-title">Scriba sta analizzando la missiva...</h2>
            <p>L'Alchimista sta estraendo i dati per il Calamaio.</p>
          </div>
        </div>
      )}
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
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search messages..." />
        </div>

        <div className="message-list">
          {messages.length === 0 ? (
            <div className="empty-state">Nessuna missiva ricevuta.</div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message-preview ${selectedId === msg.id ? 'active' : ''} ${msg.status === 'new' ? 'unread' : ''}`}
                onClick={() => setSelectedId(msg.id)}
              >
                <div className="msg-header">
                  <div className="sender-group">
                    {getChannelIcon(msg.channel)}
                    <span className="msg-sender">{msg.sender}</span>
                  </div>
                  <span className="msg-time">{new Date(msg.received_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="msg-body">{msg.body}</div>
                <div className="msg-footer">
                  <span className={`status-tag ${msg.status}`}>{msg.status}</span>
                  <span className="channel-tag">{msg.channel}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="inbox-detail glass-minimal">
        {selectedMessage ? (
          <>
            <div className="detail-header">
              <div className="sender-profile">
                <div className="profile-avatar">
                  {selectedMessage.sender[0]}
                </div>
                <div className="sender-info">
                  <h2>{selectedMessage.sender}</h2>
                  <div className="channel-meta">
                    {getChannelIcon(selectedMessage.channel)}
                    <span>via {selectedMessage.channel}</span>
                  </div>
                </div>
              </div>
              <div className="detail-actions">
                <button className="btn-icon-v2"><Archive size={18} /></button>
                <button className="btn-icon-v2" onClick={handleDeleteMessage}><Trash2 size={18} /></button>
                <button className="btn-premium" onClick={handleGenerateDraft}>
                  <Sparkles size={16} />
                  <span>Analisi Scriba</span>
                </button>
              </div>
            </div>

            <div className="detail-body">
              <div className="message-content glass-minimal">
                <div className="content-meta">
                  <span className="content-date">{new Date(selectedMessage.received_at).toLocaleString()}</span>
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
            <p>Seleziona una missiva per leggerne il contenuto</p>
          </div>
        )}
      </div>

      {/* Custom Confirmation Modals */}
      <Modal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        type="danger"
        title="Distruzione Missiva"
        message="Sei sicuro di voler distruggere questa missiva? L'azione è irreversibile e il messaggio verrà rimosso per sempre dallo Scriptorium."
        confirmText="Sì, Distruggi"
      />

      <Modal 
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        type="warning"
        title="Attenzione"
        message={errorMessage}
        confirmText="Ho Capito"
      />
    </div>
  );
};

export default Inbox;
