import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Brain, 
  Cpu, 
  Activity, 
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';
import './Scriba.css';

const Scriba = () => {
  const [stats, setStats] = useState({
    totalProcessed: 0,
    avgConfidence: 0,
    successRate: 0
  });
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchScribaData = async () => {
      try {
        const drafts = await api.get('drafts/');
        const total = drafts.data.length;
        const avg = drafts.data.length > 0 
          ? drafts.data.reduce((acc: number, d: any) => acc + d.confidence, 0) / total 
          : 0;
        
        setStats({
          totalProcessed: total,
          avgConfidence: Math.round(avg * 100),
          successRate: 94 // Mocked for now
        });

        // Use drafts as logs of what Scriba has done
        setLogs(drafts.data.slice(0, 10).map((d: any) => ({
          id: d.id,
          time: new Date(d.created_at).toLocaleTimeString(),
          action: 'Extraction Successful',
          details: `Identified ${d.items?.length || 0} items for ${d.message_details?.sender}`,
          confidence: Math.round(d.confidence * 100)
        })));
      } catch (error) {
        console.error("Error fetching Scriba stats:", error);
      }
    };
    fetchScribaData();
    const interval = setInterval(fetchScribaData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scriba-module animate-fade-in">
      <header className="module-header">
        <div className="title-group">
          <div className="ai-badge">
            <Zap size={14} />
            <span>Claude 3.5 Sonnet Active</span>
          </div>
          <h1 className="serif-title">Scriba AI Core</h1>
          <p className="text-secondary">Neural Governance & Semantic Extraction Engine</p>
        </div>
        <div className="header-status">
          <div className="status-item">
            <Activity size={16} color="#10b981" />
            <span>Systems Nominal</span>
          </div>
        </div>
      </header>

      <div className="scriba-dashboard">
        <div className="scriba-stats">
          <div className="s-card card-layered">
            <Cpu size={24} />
            <span className="s-label">Total Extractions</span>
            <h2 className="s-value">{stats.totalProcessed}</h2>
          </div>
          <div className="s-card card-layered">
            <Brain size={24} />
            <span className="s-label">Avg. Confidence</span>
            <h2 className="s-value">{stats.avgConfidence}%</h2>
          </div>
          <div className="s-card card-layered">
            <Sparkles size={24} />
            <span className="s-label">IA Accuracy</span>
            <h2 className="s-value">{stats.successRate}%</h2>
          </div>
        </div>

        <div className="scriba-main-grid">
          <div className="scriba-logs card-layered">
            <div className="panel-header">
              <h3><Terminal size={16} /> Live Extraction Feed</h3>
              <span className="live-dot"></span>
            </div>
            <div className="log-list">
              {logs.length === 0 ? (
                <div className="empty-log">Awaiting first neural signal...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="log-entry">
                    <div className="log-meta">
                      <span className="log-time">[{log.time}]</span>
                      <span className="log-action">{log.action}</span>
                    </div>
                    <p className="log-details">{log.details}</p>
                    <div className="log-conf">
                      <div className="conf-track">
                        <div className="conf-fill" style={{ width: `${log.confidence}%` }}></div>
                      </div>
                      <span>{log.confidence}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="scriba-intelligence card-layered">
            <div className="panel-header">
              <h3><Brain size={16} /> Semantic Logic</h3>
            </div>
            <div className="logic-content">
              <div className="logic-step">
                <CheckCircle2 size={16} className="success" />
                <div>
                  <h4>Entity Recognition</h4>
                  <p>Resolving SKU variants and fuzzy merchant names.</p>
                </div>
              </div>
              <div className="logic-step">
                <CheckCircle2 size={16} className="success" />
                <div>
                  <h4>Contextual Pricing</h4>
                  <p>Matching base price Tomo with customer history.</p>
                </div>
              </div>
              <div className="logic-step">
                <AlertCircle size={16} className="warning" />
                <div>
                  <h4>Conflict Resolution</h4>
                  <p>Detecting stock levels vs requested quantities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scriba;
