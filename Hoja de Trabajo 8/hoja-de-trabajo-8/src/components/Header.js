import React, {useState} from 'react';


const Header = ({ categories, selectedCategory, onCategoryChange }) => {
  
  const [clickedLink, setClickedLink] = useState(null);
  
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    setClickedLink(category);
  };
  
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
      <div className="container">
        <a className="navbar-brand" href="/">Catálogo de Productos</a>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            {categories.map((category, index) => (
              <li className="nav-item" key={index}>
                {category !== 'Todos' ? ( // Verifica si la categoría no es "Todos"
                  <a
                    //className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                    //onClick={() => onCategoryChange(category)}
                    className={`nav-link ${selectedCategory === category || clickedLink === category ? 'nav-link-clicked' : ''}`}
                    onClick={() => handleCategoryClick(category)}
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
