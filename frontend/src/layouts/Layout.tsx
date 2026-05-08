import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`app-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main className="main-content animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
