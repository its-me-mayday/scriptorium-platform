import React from 'react';
import { 
  ShieldCheck, 
  User, 
  UserPlus, 
  Key, 
  Shield, 
  BookOpen, 
  Zap,
  MoreVertical,
  Activity
} from 'lucide-react';
import './Gilda.css';

const MemberCard = ({ member }: any) => {
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return <Shield size={16} />;
      case 'scriba': return <Zap size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'Gran Maestro';
      case 'scriba': return 'Scriba AI Manager';
      case 'operatore': return 'Archivista';
      default: return role;
    }
  };

  return (
    <div className="card-layered member-card-v2 animate-slide-up">
      <div className="member-card-header">
        <div className="member-avatar-v2">
          {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
        </div>
        <div className="member-meta-v2">
          <h3>{member.name}</h3>
          <div className={`role-badge ${member.role.toLowerCase()}`}>
            {getRoleIcon(member.role)}
            <span>{getRoleLabel(member.role)}</span>
          </div>
        </div>
        <button className="btn-icon-v2">
          <MoreVertical size={16} />
        </button>
      </div>
      
      <div className="member-details-v2">
        <div className="detail-item">
          <span className="label">Accesso</span>
          <span className="value">{member.email}</span>
        </div>
        <div className="detail-item">
          <span className="label">Ultima Attività</span>
          <span className="value">Oggi, 14:20</span>
        </div>
      </div>

      <div className="member-footer-v2">
        <div className="activity-indicator">
          <div className="dot active"></div>
          <span>Online</span>
        </div>
        <button className="btn-outline-small">
          <Key size={14} />
          <span>Gestisci</span>
        </button>
      </div>
    </div>
  );
};

const Gilda = () => {
  const users = [
    { id: 1, name: 'Luca Maggio', role: 'Admin', email: 'luca@scriptorium.it' },
    { id: 2, name: 'Marco Rossi', role: 'Scriba', email: 'marco@scriptorium.it' },
    { id: 3, name: 'Giulia Bianchi', role: 'Operatore', email: 'giulia@scriptorium.it' },
    { id: 4, name: 'Alessio Verdi', role: 'Operatore', email: 'alessio@scriptorium.it' },
  ];

  return (
    <div className="gilda-module animate-fade-in">
      <header className="module-header">
        <div>
          <h1 className="serif-title">La Gilda</h1>
          <p className="text-secondary">Custodi e gestori dello Scriptorium. Definisci ranghi e permessi.</p>
        </div>
        <div className="header-actions">
          <button className="btn-premium">
            <UserPlus size={18} />
            <span>Invita Membro</span>
          </button>
        </div>
      </header>

      <section className="gilda-overview-stats">
        <div className="stat-card-mini glass-minimal">
          <div className="s-icon"><ShieldCheck size={20} /></div>
          <div className="s-info">
            <span className="s-label">Totale Membri</span>
            <span className="s-value">{users.length}</span>
          </div>
        </div>
        <div className="stat-card-mini glass-minimal">
          <div className="s-icon active"><Activity size={20} /></div>
          <div className="s-info">
            <span className="s-label">Attivi Ora</span>
            <span className="s-value">2</span>
          </div>
        </div>
      </section>

      <div className="member-grid-v2">
        {users.map((user) => (
          <MemberCard key={user.id} member={user} />
        ))}
      </div>
    </div>
  );
};

export default Gilda;
