import React, { useState, useEffect } from 'react';
import { 
  Warehouse, 
  Package, 
  AlertTriangle, 
  ArrowRightLeft, 
  History,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Box,
  Truck,
  Plus,
  PackagePlus
} from 'lucide-react';
import api from '../../services/api';
import './Emporio.css';

const StockCard = ({ item }: any) => (
  <div className="card-layered stock-card-v2 animate-slide-up">
    <div className="stock-card-header">
      <div className="stock-icon-wrapper">
        <Box size={20} className={item.current_stock < 10 ? 'warning' : ''} />
      </div>
      <div className="stock-title">
        <h3>{item.name}</h3>
        <p>{item.sku}</p>
      </div>
    </div>

    <div className="stock-progress-v2">
      <div className="progress-info">
        <span className="stock-count"><strong>{item.current_stock}</strong> units</span>
        <span className="stock-percent">{item.category}</span>
      </div>
      <div className="progress-bar-v2">
        <div 
          className={`fill ${item.current_stock < 10 ? 'danger' : item.current_stock < 25 ? 'warning' : 'success'}`} 
          style={{ width: `${Math.min((item.current_stock / 100) * 100, 100)}%` }}
        ></div>
      </div>
    </div>

    <div className="stock-footer-v2">
      <button className="btn-text-action">Manage Stock</button>
      {item.current_stock < 10 && (
        <div className="low-stock-badge">
          <AlertTriangle size={12} />
          <span>Low Stock</span>
        </div>
      )}
    </div>
  </div>
);

const Emporio = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products/');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="emporio-module">
      <header className="module-header">
        <div>
          <h1 className="serif-title">Emporio & Logistica</h1>
          <p className="text-secondary">Real-time inventory governance and supply chain monitoring.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">Stock Take</button>
          <button className="btn-premium">
            <Plus size={18} />
            <span>Add Provision</span>
          </button>
        </div>
      </header>

      <div className="warehouse-overview glass-minimal">
        <div className="ov-stat">
          <BarChart3 size={24} />
          <div>
            <span className="label">Total SKUs</span>
            <span className="value">{products.length}</span>
          </div>
        </div>
        <div className="ov-stat">
          <Package size={24} color="#f59e0b" />
          <div>
            <span className="label">Low Stock</span>
            <span className="value">{products.filter(p => p.current_stock < 10).length} Items</span>
          </div>
        </div>
      </div>

      <div className="stock-grid-v2">
        {loading ? (
          <div className="loading-v3">Analisi magazzino...</div>
        ) : products.length === 0 ? (
          <div className="empty-state-v2 card-layered">
            <PackagePlus size={48} className="text-muted" />
            <p>Il magazzino è vuoto. Registra la tua prima merce nel Tomo.</p>
          </div>
        ) : (
          products.map(item => (
            <StockCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Emporio;
