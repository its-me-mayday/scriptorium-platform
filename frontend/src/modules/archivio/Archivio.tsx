import React from 'react';
import { Search, Filter, Plus, UserPlus, MoreVertical } from 'lucide-react';

const Archivio = () => {
  const customers = [
    { id: 1, name: 'Studio Rossi', email: 'ordini@studiorossi.it', phone: '+39 02 123456', city: 'Milano', orders: 12 },
    { id: 2, name: 'Officina Verde', email: 'info@officinaverde.com', phone: '+39 06 987654', city: 'Roma', orders: 5 },
    { id: 3, name: 'Farmacia Centrale', email: 'farmacia@centrale.it', phone: '+39 011 554433', city: 'Torino', orders: 24 },
  ];

  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Archivio</h1>
          <p className="text-secondary">Anagrafica clienti e storico relazioni.</p>
        </div>
        <button className="btn-primary">
          <UserPlus size={18} />
          <span>Nuovo Cliente</span>
        </button>
      </header>

      <div className="inbox-toolbar glass">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Cerca clienti..." />
        </div>
        <div className="toolbar-actions">
          <button className="btn-secondary">
            <Filter size={18} />
            <span>Filtra</span>
          </button>
        </div>
      </div>

      <div className="glass message-grid">
        <div className="message-list-header" style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 100px 80px' }}>
          <span>Cliente</span>
          <span>Email</span>
          <span>Telefono</span>
          <span>Città</span>
          <span>Ordini</span>
          <span>Azione</span>
        </div>
        {customers.map((customer) => (
          <div key={customer.id} className="message-row" style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 100px 80px' }}>
            <div className="col-sender">
              <div className="avatar-small">{customer.name[0]}</div>
              <span>{customer.name}</span>
            </div>
            <div className="col-body">{customer.email}</div>
            <div className="col-body">{customer.phone}</div>
            <div className="col-body">{customer.city}</div>
            <div className="col-body">{customer.orders}</div>
            <div className="col-actions">
              <button className="btn-icon">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archivio;
