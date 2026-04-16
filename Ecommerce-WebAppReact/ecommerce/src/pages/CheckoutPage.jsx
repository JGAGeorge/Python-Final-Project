import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { items } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      await api.post("orders/", {
        shipping_address: address,
      });

      alert("Order placed");
      navigate("/orders");
    } catch {
      alert("Error placing order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <h4>Total: ${total.toFixed(2)}</h4>

      <textarea
        className="form-control my-3"
        placeholder="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button className="btn btn-success" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;