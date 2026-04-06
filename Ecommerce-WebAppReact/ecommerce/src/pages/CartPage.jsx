import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      {cartItems.map(item => (
        <div key={item.id} className="card p-3 mb-2">
          <h5>{item.title}</h5>
          <p>${item.price}</p>

          <input
            type="number"
            value={item.qty}
            onChange={(e) =>
              dispatch(updateQuantity({
                id: item.id,
                qty: Number(e.target.value)
              }))
            }
          />

          <button
            className="btn btn-danger"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartPage;