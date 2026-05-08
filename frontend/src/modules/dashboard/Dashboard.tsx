import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import api from '../../services/api';
import './Dashboard.css';

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
  <div className="stat-card-v3 card-layered animate-slide-up">
    <div className="stat-header">
      <div className="stat-icon" style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={20} />
      </div>
      <div className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
        {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{Math.abs(trend)}%</span>
      </div>
    </div>
    <div className="stat-body">
      <span className="stat-title">{title}</span>
      <h2 className="stat-value">{value}</h2>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    customers: 0,
    messages: 0,
    conversion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, customers, messages] = await Promise.all([
          api.get('orders/'),
          api.get('customers/list/'),
          api.get('inbox/messages/')
        ]);

        setStats({
          orders: orders.data.length,
          customers: customers.data.length,
          messages: messages.data.length,
          conversion: messages.data.length > 0 ? Math.round((orders.data.length / messages.data.length) * 100) : 0
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-v3">
      <header className="dashboard-header-v3">
        <div className="header-content">
          <h1 className="serif-title">Overview</h1>
          <p>Governance and performance overview for Anno Domini MMXXVI</p>
        </div>
        <div className="page-actions-v3">
          <button className="btn-outline">Download Annali</button>
          <button className="btn-premium">
            <Plus size={18} />
            <span>Nuovo Ordine</span>
          </button>
        </div>
      </header>

      <div className="stats-grid-v3">
        <StatCard title="Total Orders" value={stats.orders} trend={12} icon={ShoppingBag} color="#818cf8" />
        <StatCard title="Active Merchants" value={stats.customers} trend={5} icon={Users} color="#10b981" />
        <StatCard title="Missives Received" value={stats.messages} trend={-2} icon={MessageSquare} color="#f59e0b" />
        <StatCard title="AI Conversion" value={`${stats.conversion}%`} trend={8} icon={Sparkles} color="#ec4899" />
      </div>

      <div className="dashboard-content-v3">
        <div className="content-main-v3 card-layered">
          <div className="panel-header">
            <h3>Recent Activities</h3>
            <button className="btn-text-action">View All</button>
          </div>
          <div className="activity-list-v3">
            {loading ? (
              <div className="loading-v3">Consultando i registri...</div>
            ) : (
              <div className="empty-state-v2">
                <Clock size={32} className="text-muted" />
                <p>Nessun'attività recente registrata.</p>
              </div>
            )}
          </div>
        </div>

        <div className="content-side-v3 card-layered">
          <div className="panel-header">
            <h3>Inventory Status</h3>
          </div>
          <div className="inventory-summary-v3">
            <p className="text-muted" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              Carica i primi prodotti nell'Emporio per visualizzare lo stato dell'inventario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
