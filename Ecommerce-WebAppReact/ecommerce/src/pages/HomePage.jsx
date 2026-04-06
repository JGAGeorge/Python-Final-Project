import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCartAPI } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch(addToCartAPI(product));
    alert("Product added to cart!");
  };

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <h3 className="text-center mb-4 fw-bold" style={{ color: "#28a745" }}>
        Latest Products
      </h3>

      {loading && <div className="text-center"><div className="spinner-border text-success"/></div>}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4" key={product.id}>
            <div className="card product-card h-100">
              <img src={product.image} alt={product.title} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h6 className="fw-bold">{product.title}</h6>
                <h5 style={{ color: "#ff7a18" }}>${product.price}</h5>
                <div className="d-flex gap-2 mt-auto">
                  <Link to={`/product/${product.id}`} className="btn btn-view">View</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;