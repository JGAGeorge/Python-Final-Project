import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { fetchOrders } from "../features/orders/ordersSlice";
import api from "../services/api";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    api.get("admin/accounts/").then((res) => setUsers(res.data));
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container my-5">
      <h3 className="mb-4">Admin Dashboard</h3>

      <h5>Users</h5>
      <table className="table table-bordered mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Is Seller</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.is_seller ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Products</h5>
      <table className="table table-bordered mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Orders</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Total</th>
            <th>Shipping</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user?.email}</td>
              <td>{o.status}</td>
              <td>${o.total_price.toFixed(2)}</td>
              <td>{o.shipping_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;