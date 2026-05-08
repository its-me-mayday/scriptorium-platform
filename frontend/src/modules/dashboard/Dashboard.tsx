import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import './Dashboard.css';

const StatCard = ({ icon: Icon, label, value, trend, color, path }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
  >
    <Link to={path} className="glass stat-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div className="stat-header">
        <div className={`stat-icon-bg ${color}`}>
          <Icon size={20} className="stat-icon" />
        </div>
        <div className="stat-trend">
          <ArrowUpRight size={14} />
          <span>{trend}</span>
        </div>
      </div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <div>
          <h1 className="scriptorium-font">Pace e Bene, Luca</h1>
          <p className="medieval-detail">Scriba et Magister dello Scriptorium</p>
        </div>
        <div className="header-date glass">
          <Clock size={16} color="var(--accent-gold)" />
          <span>Anno Domini MMXXVI — VIII Maggio</span>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard 
          icon={ShoppingBag} 
          label="Ordini del Giorno" 
          value="24" 
          trend="+12%" 
          color="gold" 
          path="/calamaio"
        />
        <StatCard 
          icon={MessageCircle} 
          label="Missive Nuove" 
          value="15" 
          trend="+5%" 
          color="blue" 
          path="/messaggero"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Bozze da Sigillare" 
          value="8" 
          trend="-2%" 
          color="green" 
          path="/calamaio"
        />
        <StatCard 
          icon={Clock} 
          label="In Cammino" 
          value="12" 
          trend="+18%" 
          color="purple" 
          path="/cronica"
        />
      </div>

      <div className="dashboard-grid">
        <section className="glass section-card recent-messages">
          <div className="section-header">
            <h3><MessageCircle size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Messaggero — Ultime Missive</h3>
            <Link to="/messaggero" className="btn-text">Sfoglia Archivio</Link>
          </div>
          <div className="message-list">
            {[
              { id: 1, sender: 'Studio Rossi', body: 'Saluti, necessitiamo di 20 risme di carta...', time: '10:12', channel: 'WhatsApp' },
              { id: 2, sender: 'Officina Verde', body: 'Avete in deposito i toner per HP?', time: '09:45', channel: 'Telegram' },
              { id: 3, sender: 'Marco Bianchi', body: 'L\'ordine è giunto a destinazione, grazie.', time: '09:30', channel: 'Email' },
            ].map(msg => (
              <Link key={msg.id} to="/messaggero" className="message-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="message-info">
                  <p className="message-sender">{msg.sender}</p>
                  <p className="message-body">{msg.body}</p>
                </div>
                <div className="message-meta">
                  <span className="message-time">{msg.time}</span>
                  <span className={`channel-tag ${msg.channel.toLowerCase()}`}>{msg.channel}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="glass section-card drafts-validation">
          <div className="section-header">
            <h3><PenTool size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Calamaio — Bozze Pendenti</h3>
            <Link to="/calamaio" className="btn-text">Valida Bozze</Link>
          </div>
          <div className="draft-list">
             {[
              { id: 1, customer: 'Studio Rossi', items: 3, total: '€ 145.00', confidence: 0.88 },
              { id: 2, customer: 'Farmacia Centrale', items: 1, total: '€ 45.00', confidence: 0.94 },
              { id: 3, customer: 'Ristorante Da Mario', items: 5, total: '€ 320.00', confidence: 0.65 },
            ].map(draft => (
              <Link key={draft.id} to="/calamaio" className="draft-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="draft-details">
                  <p className="draft-customer">{draft.customer}</p>
                  <p className="draft-meta">{draft.items} pergamene • {draft.total}</p>
                </div>
                <div className="draft-actions">
                  <div className="confidence-indicator">
                    <div className="confidence-bar" style={{ width: `${draft.confidence * 100}%` }}></div>
                  </div>
                  <div className="btn-icon">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
