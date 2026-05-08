import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import Inbox from './modules/inbox/Inbox';
import Archivio from './modules/archivio/Archivio';
import Tomo from './modules/tomo/Tomo';
import Scriba from './modules/scriba/Scriba';
import Calamaio from './modules/calamaio/Calamaio';
import Cronica from './modules/cronica/Cronica';
import Emporio from './modules/emporio/Emporio';
import Gilda from './modules/gilda/Gilda';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messaggero" element={<Inbox />} />
          <Route path="/scriba" element={<Scriba />} />
          <Route path="/calamaio" element={<Calamaio />} />
          <Route path="/archivio" element={<Archivio />} />
          <Route path="/tomo" element={<Tomo />} />
          <Route path="/emporio" element={<Emporio />} />
          <Route path="/cronica" element={<Cronica />} />
          <Route path="/gilda" element={<Gilda />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
