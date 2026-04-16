import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(registerUser(form));

    if (!res.error) {
      alert("Account created successfully ✅");
      navigate("/login");
    } else {
      console.log(res.payload);
      alert("Register failed");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-success">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="First Name"
          required
          onChange={(e) =>
            setForm({ ...form, first_name: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Last Name"
          required
          onChange={(e) =>
            setForm({ ...form, last_name: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />
        
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) =>
            setForm({ ...form, password2: e.target.value })
          }
        />


        <button
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;