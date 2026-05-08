import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  PackagePlus, 
  MoreVertical, 
  Tag, 
  Layers,
  ArrowRightLeft,
  DollarSign,
  Box
} from 'lucide-react';
import api from '../../services/api';
import './Tomo.css';

const ProductRow = ({ product }: any) => (
  <div className="product-row-v2 animate-slide-up">
    <div className="p-sku">
      <code>{product.sku}</code>
    </div>
    <div className="p-main">
      <div className="p-icon">
        <Layers size={16} />
      </div>
      <div className="p-info">
        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
      </div>
    </div>
    <div className="p-cat">
      <span className="cat-badge">{product.category}</span>
    </div>
    <div className="p-price">
      <DollarSign size={14} />
      <span>{product.price}</span>
    </div>
    <div className="p-stock">
      <div className={`stock-dot ${product.current_stock < 20 ? 'warning' : 'success'}`}></div>
      <span>{product.current_stock} units</span>
    </div>
    <div className="p-actions">
      <button className="btn-icon-v2">
        <ArrowRightLeft size={14} />
      </button>
      <button className="btn-icon-v2">
        <MoreVertical size={14} />
      </button>
    </div>
  </div>
);

const Tomo = () => {
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
    <div className="tomo-module">
      <header className="module-header">
        <div>
          <h1 className="serif-title">Tomo dei Prodotti</h1>
          <p className="text-secondary">The master catalog of items, pricing, and semantic aliases.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">Bulk Update</button>
          <button className="btn-premium">
            <PackagePlus size={18} />
            <span>Nuova Merce</span>
          </button>
        </div>
      </header>

      <div className="tomo-toolbar glass-minimal">
        <div className="search-box-v2">
          <Search size={18} />
          <input type="text" placeholder="Search catalog by name, SKU or alias..." />
        </div>
        <div className="toolbar-filters">
          <button className="btn-outline-small">
            <Filter size={14} />
            <span>Filter Catalog</span>
          </button>
        </div>
      </div>

      <div className="tomo-grid-v2 card-layered">
        <div className="grid-header-v2">
          <span>SKU</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Base Price</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>
        <div className="grid-body-v2">
          {loading ? (
            <div className="loading-v3">Consultando il Tomo...</div>
          ) : products.length === 0 ? (
            <div className="empty-state-v2">
              <Box size={48} className="text-muted" />
              <p>Il catalogo è vuoto. Inizia a registrare le tue merci.</p>
            </div>
          ) : (
            products.map(product => (
              <ProductRow key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tomo;
