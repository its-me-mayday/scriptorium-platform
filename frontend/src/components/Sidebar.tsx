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
  Settings,
  Search,
  ChevronLeft,
  Menu
} from 'lucide-react';
import './Sidebar.css';

const SidebarItem = ({ icon: Icon, label, path, badge = 0, isCollapsed }: any) => {
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <Link to={path} className={`sidebar-item ${active ? 'active' : ''}`} title={isCollapsed ? label : ''}>
      <div className="item-content">
        <Icon size={18} strokeWidth={active ? 2.5 : 2} />
        {!isCollapsed && <span className="item-label">{label}</span>}
      </div>
      {!isCollapsed && badge > 0 && (
        <div className="item-meta">
          <span className="item-badge">{badge}</span>
        </div>
      )}
    </Link>
  );
};

const Sidebar = ({ isCollapsed, onToggle }: any) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="brand-link">
          <div className="brand-icon">
            <span className="serif-title">S</span>
          </div>
          {!isCollapsed && (
            <div className="brand-text">
              <h1>Scriptorium</h1>
              <p>Omnichannel Hub</p>
            </div>
          )}
        </Link>
        <button className="collapse-toggle" onClick={onToggle}>
          {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-action">
          <div className="search-pill">
            <Search size={14} />
            <span>Search...</span>
            <kbd>⌘K</kbd>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-group">
          {!isCollapsed && <label>Core</label>}
          <SidebarItem icon={LayoutDashboard} label="Overview" path="/" isCollapsed={isCollapsed} />
          <SidebarItem icon={MessageSquare} label="Messages" path="/messaggero" badge={5} isCollapsed={isCollapsed} />
          <SidebarItem icon={Sparkles} label="Scriba AI" path="/scriba" isCollapsed={isCollapsed} />
          <SidebarItem icon={PenTool} label="Validations" path="/calamaio" badge={2} isCollapsed={isCollapsed} />
        </div>

        <div className="nav-group">
          {!isCollapsed && <label>Management</label>}
          <SidebarItem icon={Users} label="Customers" path="/archivio" isCollapsed={isCollapsed} />
          <SidebarItem icon={BookOpen} label="Inventory" path="/tomo" isCollapsed={isCollapsed} />
          <SidebarItem icon={Warehouse} label="Warehouse" path="/emporio" isCollapsed={isCollapsed} />
        </div>

        <div className="nav-group">
          {!isCollapsed && <label>System</label>}
          <SidebarItem icon={History} label="Audit Trail" path="/cronica" isCollapsed={isCollapsed} />
          <SidebarItem icon={ShieldCheck} label="Team" path="/gilda" isCollapsed={isCollapsed} />
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-v2">
          {!isCollapsed ? (
            <>
              <div className="user-info">
                <p className="user-name">Luca Maggio</p>
                <p className="user-role">Administrator</p>
              </div>
              <div className="user-actions">
                <Settings size={16} />
              </div>
            </>
          ) : (
            <Settings size={18} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
