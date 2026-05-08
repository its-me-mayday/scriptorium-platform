import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Sparkles, 
  PenTool, 
  Users, 
  BookOpen, 
  History, 
  ShieldCheck, 
  Warehouse,
  ChevronRight,
  Settings,
  LogOut,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const SidebarItem = ({ icon: Icon, label, path, badge = 0, description }: any) => {
  const location = useLocation();
  const active = location.pathname === path;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="sidebar-item-wrapper" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <Link to={path} className={`sidebar-item ${active ? 'active' : ''}`}>
        <div className="sidebar-item-content">
          <div className="icon-wrapper">
            <Icon size={20} />
          </div>
          <span>{label}</span>
        </div>
        <div className="sidebar-item-right">
          {badge > 0 && <span className="sidebar-badge">{badge}</span>}
          <Info size={14} className="info-trigger" />
        </div>
      </Link>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="sidebar-tooltip glass"
          >
            <p className="tooltip-title">{label}</p>
            <p className="tooltip-desc">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
          <div className="logo-icon-medieval">
            <img src="/Users/lucamaggio/.gemini/antigravity/brain/51016cb2-3910-4ed0-a9c3-5cb4f17cf695/scriptorium_logo_1778237020468.png" alt="S" className="logo-img" />
          </div>
          <div className="logo-text-wrapper">
            <h1 className="logo-text">Scriptorium</h1>
            <span className="logo-subtitle">Anno Domini MMXXVI</span>
          </div>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="nav-section-title">Dominio Core</p>
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            path="/" 
            description="La visione d'insieme dello Scriptorium: ordini, messaggi e statistiche vitali."
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Messaggero" 
            path="/messaggero" 
            badge={5} 
            description="Il crocevia dove giungono le missive da ogni canale: WhatsApp, Telegram ed Email."
          />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Flusso di Lavoro</p>
          <SidebarItem 
            icon={Sparkles} 
            label="Scriba" 
            path="/scriba" 
            description="L'assistente alchemico che traduce il linguaggio naturale in bozze d'ordine strutturate."
          />
          <SidebarItem 
            icon={PenTool} 
            label="Calamaio" 
            path="/calamaio" 
            badge={2} 
            description="L'editor di validazione: dove l'operatore appone il sigillo di conferma sulle bozze."
          />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Gestione Scriptorium</p>
          <SidebarItem 
            icon={Users} 
            label="Archivio" 
            path="/archivio" 
            description="Il grande registro dei clienti e dei mercanti, con lo storico completo di ogni interazione."
          />
          <SidebarItem 
            icon={BookOpen} 
            label="Tomo" 
            path="/tomo" 
            description="Il catalogo sacro delle merci e dei prodotti, inclusi alias e varianti."
          />
          <SidebarItem 
            icon={Warehouse} 
            label="Emporio" 
            path="/emporio" 
            description="Il magazzino delle scorte, la gestione del picking e la logistica delle spedizioni."
          />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Annali e Ordine</p>
          <SidebarItem 
            icon={History} 
            label="Cronica" 
            path="/cronica" 
            description="La pergamena infinita del tempo: ogni azione viene registrata per l'eternità."
          />
          <SidebarItem 
            icon={ShieldCheck} 
            label="Gilda" 
            path="/gilda" 
            description="Il consiglio dei maestri: gestione del team, ruoli e permessi d'accesso."
          />
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">LM</div>
          <div className="user-info">
            <p className="user-name">Luca Maggio</p>
            <p className="user-role">Gran Maestro</p>
          </div>
        </div>
        <div className="footer-actions">
          <Settings size={18} className="footer-icon" />
          <LogOut size={18} className="footer-icon" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
