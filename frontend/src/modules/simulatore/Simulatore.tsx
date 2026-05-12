import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  Mail, 
  Terminal, 
  Zap, 
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';
import './Simulatore.css';
import Modal from '../../components/Modal';

const Simulatore = () => {
  const [channel, setChannel] = useState('WhatsApp');
  const [sender, setSender] = useState('');
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender || !text) return;

    setIsSending(true);

    try {
      await api.post('inbox/messages/webhook/', {
        channel,
        sender,
        text
      });
      setModalMessage('La missiva è stata consegnata con successo allo Scriptorium!');
      setIsSuccessModalOpen(true);
      setSender('');
      setText('');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Errore nell\'invio della simulazione.';
      setModalMessage(`Errore: ${errorMsg}`);
      setIsErrorModalOpen(true);
      console.error("Simulator Error Details:", error.response?.data?.details);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="simulatore-module animate-fade-in">
      <header className="module-header">
        <div className="title-group">
          <div className="status-badge">
            <Terminal size={14} />
            <span>Developer Sandbox</span>
          </div>
          <h1 className="serif-title">Omnichannel Simulator</h1>
          <p className="text-secondary">Simula flussi di dati reali senza interfacce esterne</p>
        </div>
      </header>

      <div className="simulator-grid">
        <div className="simulator-form card-layered glass-minimal">
          <div className="panel-header">
            <h3><Zap size={16} /> Configura Missiva</h3>
          </div>
          <form onSubmit={handleSimulate}>
            <div className="form-group">
              <label>Canale di Origine</label>
              <div className="channel-picker">
                <button 
                  type="button"
                  className={`channel-btn ${channel === 'WhatsApp' ? 'active' : ''}`}
                  onClick={() => setChannel('WhatsApp')}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </button>
                <button 
                  type="button"
                  className={`channel-btn ${channel === 'Telegram' ? 'active' : ''}`}
                  onClick={() => setChannel('Telegram')}
                >
                  <Send size={16} />
                  <span>Telegram</span>
                </button>
                <button 
                  type="button"
                  className={`channel-btn ${channel === 'Email' ? 'active' : ''}`}
                  onClick={() => setChannel('Email')}
                >
                  <Mail size={16} />
                  <span>Email</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Mittente (Nome o Email)</label>
              <div className="input-with-icon">
                <User size={16} />
                <input 
                  type="text" 
                  placeholder="Es: Studio Rossi o mercante@gmail.com"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Corpo del Messaggio</label>
              <textarea 
                placeholder="Scrivi qui il testo che Claude dovrà interpretare..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-premium w-full" disabled={isSending}>
              <Zap size={18} />
              <span>{isSending ? 'Inviando...' : 'Invia allo Scriptorium'}</span>
            </button>
          </form>
        </div>

        <div className="simulator-info">
          <div className="info-card glass-minimal">
            <h3><ShieldCheck size={18} /> Come Funziona</h3>
            <p>Questo strumento bypassa i server di Meta, Telegram o Gmail e inietta i dati direttamente nel **Webhook Universale** dello Scriptorium.</p>
            <ul>
              <li><strong>Canale</strong>: Definisce l'estetica e l'icona nell'Inbox.</li>
              <li><strong>Mittente</strong>: Verrà usato per creare la Conversazione.</li>
              <li><strong>Testo</strong>: È la "materia prima" per l'Alchimista Scriba (Claude).</li>
            </ul>
          </div>
          <div className="info-card glass-minimal code-preview">
            <h3><Terminal size={18} /> JSON Payload</h3>
            <pre>
{`{
  "channel": "${channel}",
  "sender": "${sender || '...'}",
  "text": "${text || '...'}"
}`}
            </pre>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        type="info"
        title="Simulazione Riuscita"
        message={modalMessage}
        confirmText="Ottimo"
      />

      <Modal 
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        type="warning"
        title="Errore di Alchimia"
        message={modalMessage}
        confirmText="Verifica Dati"
      />
    </div>
  );
};

export default Simulatore;
