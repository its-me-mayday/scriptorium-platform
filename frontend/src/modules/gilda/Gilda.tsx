import React from 'react';
import { ShieldCheck, User, Users, Key } from 'lucide-react';

const Gilda = () => {
  const users = [
    { id: 1, name: 'Luca Maggio', role: 'Admin', email: 'luca@scriptorium.it' },
    { id: 2, name: 'Marco Rossi', role: 'Operatore', email: 'marco@scriptorium.it' },
    { id: 3, name: 'Giulia Bianchi', role: 'Magazzino', email: 'giulia@scriptorium.it' },
  ];

  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Gilda</h1>
          <p className="text-secondary">Gestione del team, ruoli e permessi di accesso.</p>
        </div>
      </header>

      <div className="glass message-grid">
        <div className="message-list-header" style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 80px' }}>
          <span>Nome Utente</span>
          <span>Ruolo</span>
          <span>Email</span>
          <span>Azione</span>
        </div>
        {users.map((user) => (
          <div key={user.id} className="message-row" style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 80px' }}>
            <div className="col-sender">
              <div className="avatar-small"><User size={14} /></div>
              <span>{user.name}</span>
            </div>
            <div className="col-body">
              <span className="status-badge new">{user.role}</span>
            </div>
            <div className="col-body">{user.email}</div>
            <div className="col-actions">
              <button className="btn-icon"><Key size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gilda;
