import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.map((product, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card custom-card">{/*Agrega una clase custom card para estilo*/}
              <img src={product.image} className="card-img-top fixed-size-image zoom-image" alt={product.name}  />
                {/* style={{maxWidth: '50%', height: 'auto'}} */}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                <a href="#" className="btn btn-primary">Comprar</a> {/* Agrega un botón de compra */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
