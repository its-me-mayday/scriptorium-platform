import React from 'react';
import { X, AlertCircle, HelpCircle, Info } from 'lucide-react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'danger' | 'question';
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'info',
  confirmText = 'Conferma',
  cancelText = 'Annulla'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return <AlertCircle size={32} className="text-danger" />;
      case 'warning': return <AlertCircle size={32} className="text-warning" />;
      case 'question': return <HelpCircle size={32} className="text-accent" />;
      default: return <Info size={32} className="text-info" />;
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container card-layered animate-slide-up" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-body">
          <div className={`modal-icon-wrapper ${type}`}>
            {getIcon()}
          </div>
          <div className="modal-content">
            <h2 className="serif-title">{title}</h2>
            <p>{message}</p>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className={`btn-premium ${type === 'danger' ? 'btn-danger' : ''}`} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
