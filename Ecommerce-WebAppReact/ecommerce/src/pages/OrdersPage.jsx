import { useEffect, useState } from "react";
import api from "../services/api";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("orders/").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="container my-5">
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="card mb-3 p-3">
          <h5>Order #{order.id}</h5>
          <p>Status: {order.status}</p>

          {order.items.map(item => (
            <div key={item.id}>
              {item.product.title} x {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderPage;