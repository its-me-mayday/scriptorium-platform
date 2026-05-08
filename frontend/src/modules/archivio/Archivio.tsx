import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import api from '../../services/api';
import './Archivio.css';

const CustomerCard = ({ customer }: any) => (
  <div className="card-layered customer-card-v2 animate-slide-up">
    <div className="customer-card-header">
      <div className="customer-avatar-v2">
        {customer.name.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div className="customer-meta-v2">
        <h3>{customer.name}</h3>
        <span className="customer-id-v2">ID: {customer.id.toString().padStart(4, '0')}</span>
      </div>
      <button className="btn-icon-v2">
        <MoreVertical size={16} />
      </button>
    </div>
    
    <div className="customer-contact-v2">
      <div className="contact-item">
        <Mail size={14} />
        <span>{customer.email}</span>
      </div>
      <div className="contact-item">
        <Phone size={14} />
        <span>{customer.phone || 'N/A'}</span>
      </div>
      <div className="contact-item">
        <MapPin size={14} />
        <span>{customer.city || 'Private Location'}</span>
      </div>
    </div>

    <div className="customer-stats-v2">
      <div className="c-stat">
        <span className="label">Total Orders</span>
        <span className="value">0</span>
      </div>
      <div className="c-stat">
        <span className="label">LTV</span>
        <span className="value">€ 0</span>
      </div>
    </div>

    <div className="customer-footer-v2">
      <button className="btn-text-action">
        <span>View History</span>
        <ArrowUpRight size={14} />
      </button>
      <div className="status-indicator-v2">
        <div className="dot active"></div>
        <span>Active Merchant</span>
      </div>
    </div>
  </div>
);

const Archivio = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('customers/list/');
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="archivio-module">
      <header className="module-header">
        <div>
          <h1 className="serif-title">Archivio Mercanti</h1>
          <p className="text-secondary">The great register of merchants and customers of the Scriptorium.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">Export List</button>
          <button className="btn-premium">
            <UserPlus size={18} />
            <span>New Merchant</span>
          </button>
        </div>
      </header>

      <div className="archivio-toolbar glass-minimal">
        <div className="search-box-v2">
          <Search size={18} />
          <input type="text" placeholder="Search by name, email or city..." />
        </div>
        <div className="filter-group">
          <button className="btn-outline-small">
            <Filter size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="customer-grid-v2">
        {loading ? (
          <div className="loading-v3">Caricamento mercanti...</div>
        ) : customers.length === 0 ? (
          <div className="empty-state-v2 card-layered">
            <UserPlus size={48} className="text-muted" />
            <p>Il registro è vuoto. Aggiungi il tuo primo mercante.</p>
          </div>
        ) : (
          customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        )}
      </div>
    </div>
  );
};

export default Archivio;
