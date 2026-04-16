import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { fetchOrders } from "../features/orders/ordersSlice";
import api from "../services/api";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { products = [], loading: pLoading } = useSelector(
    (state) => state.products
  );

  const { orders = [], loading: oLoading } = useSelector(
    (state) => state.orders
  );

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await api.get("accounts/admin/");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container my-5">

      <h2 className="mb-4 text-success">⚙ Admin Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* ================= USERS ================= */}
      <div className="mb-5">
        <h4>👤 Users</h4>

        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.first_name} {u.last_name}
                    </td>
                    <td>
                      {u.is_staff ? (
                        <span className="badge bg-warning text-dark">
                          Admin
                        </span>
                      ) : (
                        <span className="badge bg-secondary">User</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="mb-5">
        <h4>🛍 Products</h4>

        {pLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= ORDERS ================= */}
      <div className="mb-5">
        <h4>📦 Orders</h4>

        {oLoading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Shipping</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.user?.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          o.status === "pending"
                            ? "bg-warning"
                            : o.status === "shipped"
                            ? "bg-info"
                            : "bg-success"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>
                      ${Number(o.total_price || 0).toFixed(2)}
                    </td>
                    <td>{o.shipping_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default AdminDashboard;