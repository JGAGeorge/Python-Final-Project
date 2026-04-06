import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          <h4 className="text-success">${product.price}</h4>
          <p>{product.description}</p>

          <button
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductPage;