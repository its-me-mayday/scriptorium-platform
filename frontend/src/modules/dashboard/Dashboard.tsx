import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';
import './Dashboard.css';

const StatCard = ({ icon: Icon, label, value, trend, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="stat-card-v3"
  >
    <div className="card-inner">
      <div className="stat-header-v3">
        <div className="stat-icon-v3">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div className="stat-trend-v3">
          <TrendingUp size={12} />
          <span>{trend}</span>
        </div>
      </div>
      <div className="stat-body-v3">
        <p className="stat-label-v3">{label}</p>
        <h3 className="stat-value-v3">{value}</h3>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-v3 animate-slide-up">
      <header className="page-header-v3">
        <div className="welcome-text">
          <h1 className="serif-title">L'Assemblea dello Scriptorium</h1>
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
        <StatCard icon={ShoppingBag} label="Total Orders" value="1,284" trend="+12.5%" delay={0.1} />
        <StatCard icon={MessageCircle} label="Missives" value="24" trend="+8.2%" delay={0.2} />
        <StatCard icon={CheckCircle2} label="Validated" value="95%" trend="+2.4%" delay={0.3} />
        <StatCard icon={Clock} label="Avg Delay" value="14h" trend="-4.1%" delay={0.4} />
      </div>

      <div className="content-grid-v3">
        <section className="dashboard-section-v3 card-layered">
          <div className="section-header-v3">
            <h2 className="serif-title">Recent Activity</h2>
            <Link to="/cronica" className="view-all-link">
              <span>Timeline</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="activity-list-v3">
            {[
              { id: 1, user: 'Marco', action: 'convalidated draft', target: 'DFT-092', time: '12m ago', color: '#818cf8' },
              { id: 2, user: 'Scriba', action: 'generated proposal', target: 'Studio Rossi', time: '45m ago', color: '#4ade80' },
              { id: 3, user: 'System', action: 'synchronized catalog', target: 'Shopify v2', time: '2h ago', color: '#fb7185' },
            ].map(item => (
              <div key={item.id} className="activity-item-v3">
                <div className="user-initial" style={{ background: item.color }}>{item.user[0]}</div>
                <div className="activity-content-v3">
                  <p><strong>{item.user}</strong> {item.action} <span>{item.target}</span></p>
                  <span className="activity-time-v3">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section-v3 card-layered">
          <div className="section-header-v3">
            <h2 className="serif-title">Inbound Channels</h2>
            <span className="text-muted">Last 24 hours</span>
          </div>
          <div className="channels-grid-v3">
            {[
              { name: 'WhatsApp', volume: '65%', color: '#25D366' },
              { name: 'Telegram', volume: '20%', color: '#0088cc' },
              { name: 'Direct Email', volume: '15%', color: '#fb7185' },
            ].map(channel => (
              <div key={channel.name} className="channel-bar-v3">
                <div className="channel-info-v3">
                  <span>{channel.name}</span>
                  <span>{channel.volume}</span>
                </div>
                <div className="progress-bg-v3">
                  <div className="progress-fill-v3" style={{ width: channel.volume, background: channel.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
