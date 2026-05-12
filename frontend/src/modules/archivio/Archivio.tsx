import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Users,
  Activity,
  Sparkles,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Archivio.css';

const CustomerCard = ({ customer, onSeeCronica }: any) => (
  <div className="card-layered customer-card-v2 animate-slide-up">
    <div className="customer-card-header">
      <div className="customer-avatar-v2" style={{ 
        background: `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
        boxShadow: '0 4px 15px var(--accent-primary-glow)'
      }}>
        {customer.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)}
      </div>
      <div className="customer-meta-v2">
        <h3>{customer.name}</h3>
        <span className="customer-id-v2">ID-{customer.id.toString().padStart(4, '0')}</span>
      </div>
      <button className="btn-icon-v2">
        <MoreVertical size={16} />
      </button>
    </div>
    
    <div className="customer-contact-v2">
      <div className="contact-item">
        <Mail size={14} />
        <span>{customer.email || 'Email non censita'}</span>
      </div>
      <div className="contact-item">
        <Phone size={14} />
        <span>{customer.phone || 'Nessun recapito'}</span>
      </div>
      <div className="contact-item">
        <MapPin size={14} />
        <span>{customer.city || 'Ubicazione Ignota'}</span>
      </div>
    </div>

    <div className="customer-stats-v2">
      <div className="c-stat">
        <span className="label">Ordini Totali</span>
        <span className="value">0</span>
      </div>
      <div className="c-stat">
        <span className="label">LTV Stimato</span>
        <span className="value">€ 0</span>
      </div>
    </div>

    <div className="customer-footer-v2">
      <button className="btn-text-action" onClick={onSeeCronica}>
        <span>Vedi Cronica</span>
        <ArrowUpRight size={14} />
      </button>
      <div className="status-indicator-v2">
        <div className="dot active"></div>
        <span>{customer.email && customer.phone ? 'Mercante Attivo' : 'Profilo Parziale'}</span>
      </div>
    </div>
  </div>
);

const Archivio = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get('customers/list/');
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleUpdateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    try {
      await api.put(`customers/${editingCustomer.id}/`, editingCustomer);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      alert("Errore nell'aggiornamento del mercante.");
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.city && c.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [customers, searchTerm]);

  const stats = useMemo(() => ({
    total: customers.length,
    active: customers.filter(c => c.email && c.phone).length,
    new: customers.filter(c => c.created_at && new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
  }), [customers]);

  return (
    <div className="archivio-module animate-fade-in">
      <header className="module-header">
        <div>
          <h1 className="serif-title">Archivio Mercanti</h1>
          <p className="text-secondary">Il sacro registro degli alleati e dei clienti dello Scriptorium.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">
            <Download size={16} />
            <span>Esporta Registro</span>
          </button>
          <button className="btn-premium">
            <UserPlus size={18} />
            <span>Nuovo Mercante</span>
          </button>
        </div>
      </header>

      <section className="archivio-stats-row">
        <div className="stat-card-mini glass-minimal">
          <div className="s-icon"><Users size={20} /></div>
          <div className="s-info">
            <span className="s-label">Totale Mercanti</span>
            <span className="s-value">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card-mini glass-minimal">
          <div className="s-icon active"><Activity size={20} /></div>
          <div className="s-info">
            <span className="s-label">Mercanti Attivi</span>
            <span className="s-value">{stats.active}</span>
          </div>
        </div>
        <div className="stat-card-mini glass-minimal">
          <div className="s-icon ai"><Sparkles size={20} /></div>
          <div className="s-info">
            <span className="s-label">Identificati da Scriba</span>
            <span className="s-value">{stats.new}</span>
          </div>
        </div>
      </section>

      <div className="archivio-toolbar glass-minimal">
        <div className="search-box-v2">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Cerca per nome, email o città..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className="btn-outline-small">
            <Filter size={14} />
            <span>Filtri Avanzati</span>
          </button>
        </div>
      </div>

      <div className="customer-grid-v2">
        {loading ? (
          <div className="loading-v3">Consultazione del registro...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="empty-state-v4 card-layered">
            <div className="empty-icon-glow">
              <Search size={48} />
            </div>
            <h3>Nessun Mercante trovato</h3>
            <p>Non abbiamo trovato corrispondenze per "{searchTerm}" nel registro.</p>
            <button className="btn-outline" onClick={() => setSearchTerm('')}>Pulisci Ricerca</button>
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="customer-card-wrapper">
              <CustomerCard 
                customer={customer} 
                onSeeCronica={() => navigate(`/cronica?merchant=${customer.id}`)} 
              />
              <button 
                className="btn-edit-overlay" 
                onClick={() => setEditingCustomer(customer)}
              >
                Modifica Profilo
              </button>
            </div>
          ))
        )}
      </div>

      {editingCustomer && (
        <div className="modal-overlay-v2 animate-fade-in">
          <div className="modal-content-v2 card-layered animate-slide-up">
            <h2 className="serif-title">Modifica Mercante</h2>
            <form onSubmit={handleUpdateCustomer}>
              <div className="form-group-v2">
                <label>Nome / Ragione Sociale</label>
                <input 
                  type="text" 
                  value={editingCustomer.name} 
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-row-v2">
                <div className="form-group-v2">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={editingCustomer.email || ''} 
                    onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                  />
                </div>
                <div className="form-group-v2">
                  <label>Telefono</label>
                  <input 
                    type="text" 
                    value={editingCustomer.phone || ''} 
                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group-v2">
                <label>Città</label>
                <input 
                  type="text" 
                  value={editingCustomer.city || ''} 
                  onChange={(e) => setEditingCustomer({...editingCustomer, city: e.target.value})}
                />
              </div>
              <div className="modal-footer-v2">
                <button type="button" className="btn-outline" onClick={() => setEditingCustomer(null)}>Annulla</button>
                <button type="submit" className="btn-premium">Salva Modifiche</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archivio;
