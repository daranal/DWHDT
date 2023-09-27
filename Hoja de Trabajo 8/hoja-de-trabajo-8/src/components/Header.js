import React from 'react';

const Header = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Catálogo de Productos</a>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            {categories.map((category, index) => (
              <li className="nav-item" key={index}>
                {category !== 'Todos' ? ( // Verifica si la categoría no es "Todos"
                  <a
                    className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category)}
                    href="#"
                  >
                    {category}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
