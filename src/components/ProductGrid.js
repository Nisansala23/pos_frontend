import React, { useState, useEffect } from 'react';
 import './ProductGrid.css';

 const ProductGrid = ({ category, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const backendUrl = 'http://localhost:8080'; // Replace with your backend URL

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/v1/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        const initialQuantities = {};
        data.forEach(product => (initialQuantities[product.id] = 0));
        setQuantities(initialQuantities);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, backendUrl]);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(0, parseInt(newQuantity)),
    }));
  };

  const handleIncrement = (productId) => {
    handleQuantityChange(productId, (quantities[productId] || 0) + 1);
  };

  const handleDecrement = (productId) => {
    handleQuantityChange(productId, (quantities[productId] || 0) - 1);
  };

  const handleAddToCart = (product) => {
    const quantityToAdd = quantities[product.id] || 0;
    if (quantityToAdd > 0) {
      onAddToCart(product, quantityToAdd);
      setQuantities(prevQuantities => ({ ...prevQuantities, [product.id]: 0 }));
    }
  };

  // UPDATE functionality
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditFormData({ ...product }); // Initialize form with product data
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating product:', errorData);
        setError('Failed to update product.');
        return;
      }

      const updatedProduct = await response.json();
      setProducts(prevProducts =>
        prevProducts.map(product => (product.id === id ? updatedProduct : product))
      );
      setEditingProductId(null); // Close the edit form
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product.');
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  // DELETE functionality
  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${backendUrl}/api/v1/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error deleting product:', errorData);
          setError('Failed to delete product.');
          return;
        }

        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product.');
      }
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className="product-grid">
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              {product.imageUrl && <img src={`${backendUrl}${product.imageUrl}`} alt={product.name} />}
              {!product.imageUrl && <div className="placeholder-image"></div>}
            </div>
            <div className="details">
              {editingProductId === product.id ? (
                // Edit Form
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ''}
                    onChange={handleEditFormChange}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description || ''}
                    onChange={handleEditFormChange}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price || ''}
                    onChange={handleEditFormChange}
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    value={editFormData.imageUrl || ''}
                    onChange={handleEditFormChange}
                    placeholder="Image URL"
                  />
                  <button onClick={() => handleUpdateSubmit(product.id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                // Product Details
                <div>
                  <div className="name">{product.name}</div>
                  <div className="description">{product.description}</div>
                  <div className="price">${product.price && product.price.toFixed(2)}</div>
                  <div className="quantity-control">
                    <button onClick={() => handleDecrement(product.id)}>-</button>
                    <input
                      type="number"
                      value={quantities[product.id] || 0}
                      min="0"
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    />
                    <button onClick={() => handleIncrement(product.id)}>+</button>
                  </div>
                  <button className="add-button" onClick={() => handleAddToCart(product)}>
                    <i className="plus-icon"></i> Add
                  </button>
                  <button className="edit-button" onClick={() => handleEditClick(product)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteClick(product.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
 };

 export default ProductGrid;