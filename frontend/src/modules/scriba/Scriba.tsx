import React from 'react';
import { Sparkles, Zap, BrainCircuit } from 'lucide-react';

const Scriba = () => {
  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Scriba</h1>
          <p className="text-secondary">L'assistente intelligente che interpreta i desideri dei clienti.</p>
        </div>
      </header>

      <div className="glass section-card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <div className="stat-icon-bg gold" style={{ width: '80px', height: '80px', margin: '0 auto 2rem' }}>
          <Sparkles size={40} />
        </div>
        <h2 style={{ marginBottom: '1rem' }}>In attesa di messaggi da analizzare</h2>
        <p className="text-secondary" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
          Scriba monitora costantemente il Messaggero. Quando riceve una richiesta, 
          estrae automaticamente prodotti, quantità e intenti per creare una bozza.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Zap size={20} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.9rem' }}>Analisi istantanea</span>
          </div>
          <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BrainCircuit size={20} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.9rem' }}>NLU Avanzato</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scriba;
