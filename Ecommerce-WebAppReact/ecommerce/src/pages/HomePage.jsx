import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* 🖼️ HERO SECTION */}
      <div className="hero-section d-flex align-items-center text-white">
        <div className="container text-center hero">
        </div>
      </div>

      {/* SEARCH */}
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TITLE */}
        <h3 className="text-center mb-4 fw-bold text-success">
          Latest Products
        </h3>

        {/* LOADING */}
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-success"></div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-danger text-center">
            {error?.detail || "Error loading products"}
          </p>
        )}

        {/* PRODUCTS */}
        <div className="row" id="products">
          {filteredProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card product-card h-100 shadow-sm">

                <img
                  src={product.image || "/placeholder.png"}
                  className="card-img-top product-img"
                  alt={product.title}
                />

                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{product.title}</h6>

                  <p className="text-success fw-bold">
                    ${product.price}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-success mt-auto"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default HomePage;