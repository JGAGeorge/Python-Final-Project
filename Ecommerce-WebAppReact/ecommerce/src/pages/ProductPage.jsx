import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { addToCartAPI } from "../features/cart/cartSlice";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("access")) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    await dispatch(
      addToCartAPI({
        productId: product.id,
        quantity: quantity,
      })
    );

    setLoading(false);
  };

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        
        <div className="col-md-6">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>
          <h3 className="text-success my-3">${product.price}</h3>

          <p className="text-muted">{product.description}</p>

          {/* Quantity */}
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </button>

            <span className="mx-3 fw-bold">{quantity}</span>

            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            className="btn btn-success btn-lg"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add To Cart"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductPage;