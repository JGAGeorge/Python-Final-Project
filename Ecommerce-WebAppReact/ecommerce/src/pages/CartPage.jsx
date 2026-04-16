import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const increaseQty = (item) => {
    dispatch(
      updateCartItem({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItem({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success"></div>
      </div>
    );

  return (
    <div className="container my-5">

      <h2 className="text-success fw-bold mb-4">
        🛒 Shopping Cart
      </h2>

      {items.length === 0 && (
        <div className="alert alert-success">
          Your cart is empty 🌿
        </div>
      )}

      <div className="row">

        {/* CART ITEMS */}
        <div className="col-lg-8">

          {items.map((item) => (
            <div
              key={item.id}
              className="card shadow-sm mb-3 p-3 cart-card"
            >

              <div className="d-flex justify-content-between align-items-center">

                {/* PRODUCT INFO */}
                <div>
                  <h5 className="mb-1">
                    {item.product.title}
                  </h5>

                  <small className="text-muted">
                    ${item.product.price} per item
                  </small>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="d-flex align-items-center gap-2">

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => decreaseQty(item)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <span className="fw-bold px-2">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => increaseQty(item)}
                  >
                    +
                  </button>

                </div>

                {/* TOTAL PRICE */}
                <div className="fw-bold text-success">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>

                {/* REMOVE */}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* SUMMARY */}
        <div className="col-lg-4">

          <div className="card shadow p-3 sticky-top">

            <h4 className="text-success">Order Summary</h4>

            <hr />

            <div className="d-flex justify-content-between">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button className="btn btn-success w-100 mt-3" onClick={() => navigate("/checkout")}>
                Checkout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CartPage;