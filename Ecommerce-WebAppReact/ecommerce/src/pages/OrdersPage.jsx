import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orders/ordersSlice";

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>My Orders 📦</h2>

      {orders.length === 0 && (
        <p>No orders yet</p>
      )}

      {orders.map(order => (
        <div key={order.id} className="card mb-3">
          <div className="card-body">
            
            <h5>Order #{order.id}</h5>
            <p>Status: 
              <span className="badge bg-success ms-2">
                {order.status}
              </span>
            </p>

            <p>Address: {order.shipping_address}</p>

            <hr />

            <h6>Items:</h6>

            {order.items?.map(item => (
              <div
                key={item.id}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <span>{item.product_title}</span>
                <span>
                  {item.qty} x ${item.price}
                </span>
              </div>
            ))}

          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;