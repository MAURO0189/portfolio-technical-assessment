import useFakeStore from "../../hooks/useFakeStore";
import useStrapi from "../../hooks/useStrapi";
import { getProducts } from "../../api/fakeStore";
import { getPageContent } from "../../api/strapi";
import ProductCard from "./ProductCard";
import ErrorMessage from "./ErrorMessage";
import "./ProductsPage.css";

const ProductsPage = () => {
  const { data: pageData } = useStrapi(() => getPageContent("products"));
  const {
    data: products,
    loading,
    error,
    errorType,
  } = useFakeStore(getProducts);

  const page = Array.isArray(pageData) ? pageData[0] : pageData;

  return (
    <section className="products-page">
      <div className="products-header">
        <h2 className="section-title">
          {page?.title ?? "Catálogo de Productos"}
        </h2>
        <p className="products-subtitle">{page?.subtitle ?? ""}</p>
      </div>

      {loading && (
        <div className="products-loading">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error} type={errorType} />}

      {!loading && !error && (
        <div className="products-grid">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
