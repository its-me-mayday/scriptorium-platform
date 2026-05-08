import React from 'react';
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
  LogOut
} from 'lucide-react';
import './Sidebar.css';

const SidebarItem = ({ icon: Icon, label, path, badge = 0 }: any) => {
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <Link to={path} className={`sidebar-item ${active ? 'active' : ''}`}>
      <div className="sidebar-item-content">
        <Icon size={20} />
        <span>{label}</span>
      </div>
      {badge > 0 && <span className="sidebar-badge">{badge}</span>}
      {active && <ChevronRight size={16} className="sidebar-chevron" />}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">S</div>
          <h1 className="logo-text">Scriptorium</h1>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="nav-section-title">Core</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" />
          <SidebarItem icon={MessageSquare} label="Messaggero" path="/messaggero" badge={5} />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Workflow</p>
          <SidebarItem icon={Sparkles} label="Scriba" path="/scriba" />
          <SidebarItem icon={PenTool} label="Calamaio" path="/calamaio" badge={2} />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Management</p>
          <SidebarItem icon={Users} label="Archivio" path="/archivio" />
          <SidebarItem icon={BookOpen} label="Tomo" path="/tomo" />
          <SidebarItem icon={Warehouse} label="Emporio" path="/emporio" />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">System</p>
          <SidebarItem icon={History} label="Cronica" path="/cronica" />
          <SidebarItem icon={ShieldCheck} label="Gilda" path="/gilda" />
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">LM</div>
          <div className="user-info">
            <p className="user-name">Luca Maggio</p>
            <p className="user-role">Administrator</p>
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
