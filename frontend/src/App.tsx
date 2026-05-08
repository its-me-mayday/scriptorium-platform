import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import Inbox from './modules/inbox/Inbox';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messaggero" element={<Inbox />} />
          <Route path="/scriba" element={<div>Scriba</div>} />
          <Route path="/calamaio" element={<div>Calamaio</div>} />
          <Route path="/archivio" element={<div>Archivio</div>} />
          <Route path="/tomo" element={<div>Tomo</div>} />
          <Route path="/emporio" element={<div>Emporio</div>} />
          <Route path="/cronica" element={<div>Cronica</div>} />
          <Route path="/gilda" element={<div>Gilda</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
