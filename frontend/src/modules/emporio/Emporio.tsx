import React from 'react';
import { Warehouse, Package, Truck, ClipboardList } from 'lucide-react';

const Emporio = () => {
  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Emporio</h1>
          <p className="text-secondary">Gestione magazzino, giacenze e liste di prelievo.</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="glass stat-card">
          <p className="stat-label">Ordini da Preparare</p>
          <h3 className="stat-value">5</h3>
        </div>
        <div className="glass stat-card">
          <p className="stat-label">Prodotti Sotto Scorta</p>
          <h3 className="stat-value">12</h3>
        </div>
        <div className="glass stat-card">
          <p className="stat-label">Consegne Oggi</p>
          <h3 className="stat-value">8</h3>
        </div>
      </div>

      <div className="glass section-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <Warehouse size={48} color="var(--accent-gold)" style={{ margin: '0 auto 1.5rem' }} />
        <h3>Magazzino in fase di configurazione</h3>
        <p className="text-secondary">Le funzionalità di picking e tracking spedizioni saranno disponibili a breve.</p>
      </div>
    </div>
  );
};

export default Emporio;
