import React from 'react';
import { Search, Filter, PackagePlus, MoreVertical, Tag } from 'lucide-react';

const Tomo = () => {
  const products = [
    { id: 1, sku: 'CARTA-A4-80', name: 'Carta A4 Navigator 80g', price: '€ 5.50', stock: 450, category: 'Cancelleria' },
    { id: 2, sku: 'TONER-HP-305A', name: 'Toner HP 305A Black', price: '€ 85.00', stock: 12, category: 'Consumabili' },
    { id: 3, sku: 'PEN-BLUE-BIC', name: 'Penne BIC Cristal Blu', price: '€ 0.50', stock: 1200, category: 'Cancelleria' },
  ];

  return (
    <div className="module-container animate-fade-in">
      <header className="module-header">
        <div>
          <h1>Tomo</h1>
          <p className="text-secondary">Catalogo prodotti, alias e listini.</p>
        </div>
        <button className="btn-primary">
          <PackagePlus size={18} />
          <span>Nuovo Prodotto</span>
        </button>
      </header>

      <div className="inbox-toolbar glass">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Cerca nel catalogo..." />
        </div>
        <div className="toolbar-actions">
          <button className="btn-secondary">
            <Filter size={18} />
            <span>Filtra</span>
          </button>
        </div>
      </div>

      <div className="glass message-grid">
        <div className="message-list-header" style={{ gridTemplateColumns: '150px 1.5fr 1fr 100px 120px 80px' }}>
          <span>SKU</span>
          <span>Nome Prodotto</span>
          <span>Categoria</span>
          <span>Prezzo</span>
          <span>Stock</span>
          <span>Azione</span>
        </div>
        {products.map((product) => (
          <div key={product.id} className="message-row" style={{ gridTemplateColumns: '150px 1.5fr 1fr 100px 120px 80px' }}>
            <div className="col-body" style={{ fontWeight: 600 }}>{product.sku}</div>
            <div className="col-sender">
              <Tag size={14} color="var(--accent-gold)" />
              <span>{product.name}</span>
            </div>
            <div className="col-body">
              <span className="status-badge new" style={{ fontSize: '0.7rem' }}>{product.category}</span>
            </div>
            <div className="col-body">{product.price}</div>
            <div className="col-body">{product.stock} pz</div>
            <div className="col-actions">
              <button className="btn-icon">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tomo;
