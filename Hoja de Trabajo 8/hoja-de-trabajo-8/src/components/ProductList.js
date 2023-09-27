import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
