import React from 'react';
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

const SidebarItem = ({ icon: Icon, label, active = false, badge = 0 }: any) => (
  <div className={`sidebar-item ${active ? 'active' : ''}`}>
    <div className="sidebar-item-content">
      <Icon size={20} />
      <span>{label}</span>
    </div>
    {badge > 0 && <span className="sidebar-badge">{badge}</span>}
    {active && <ChevronRight size={16} className="sidebar-chevron" />}
  </div>
);

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">S</div>
          <h1 className="logo-text">Scriptorium</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="nav-section-title">Core</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={MessageSquare} label="Messaggero" badge={5} />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Workflow</p>
          <SidebarItem icon={Sparkles} label="Scriba" />
          <SidebarItem icon={PenTool} label="Calamaio" badge={2} />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Management</p>
          <SidebarItem icon={Users} label="Archivio" />
          <SidebarItem icon={BookOpen} label="Tomo" />
          <SidebarItem icon={Warehouse} label="Emporio" />
        </div>

        <div className="nav-section">
          <p className="nav-section-title">System</p>
          <SidebarItem icon={History} label="Cronica" />
          <SidebarItem icon={ShieldCheck} label="Gilda" />
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
