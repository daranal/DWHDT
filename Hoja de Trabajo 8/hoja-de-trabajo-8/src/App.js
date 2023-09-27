import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import { categories, initialProducts } from './data';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [products, setProducts] = useState(initialProducts);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      // Si se selecciona "Todos", muestra todos los productos
      setProducts(initialProducts);
    } else {
      // Si se selecciona otra categoría, filtra los productos
      const filteredProducts = initialProducts.filter((product) => product.category === category);
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="App">
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ProductList products={products} />
      <Footer></Footer>
    </div>
  );
}

export default App;
