const ProductCard = ({ product }) => (
  <article className="product-card">
    <div className="product-img-wrap">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
        loading="lazy"
      />
    </div>
    <div className="product-info">
      <span className="product-category">{product.category}</span>
      <h3 className="product-title">{product.title}</h3>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <span className="product-rating">
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </span>
      </div>
    </div>
  </article>
);

export default ProductCard;
