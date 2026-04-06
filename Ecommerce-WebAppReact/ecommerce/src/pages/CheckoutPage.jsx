import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderAPI } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    phone: ""
  });

  const handleOrder = () => {
    dispatch(
      placeOrderAPI({
        items: cartItems,
        shipping_address: shipping.address,
        city: shipping.city,
        phone: shipping.phone
      })
    );

    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Address"
          className="form-control"
          value={shipping.address}
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="City"
          className="form-control"
          value={shipping.city}
          onChange={(e) =>
            setShipping({ ...shipping, city: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Phone"
          className="form-control"
          value={shipping.phone}
          onChange={(e) =>
            setShipping({ ...shipping, phone: e.target.value })
          }
        />
      </div>

      <button
        className="btn btn-success"
        onClick={handleOrder}
      >
        Place Order 📦
      </button>
    </div>
  );
}

export default CheckoutPage;