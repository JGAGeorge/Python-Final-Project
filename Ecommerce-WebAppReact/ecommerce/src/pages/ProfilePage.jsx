import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout, updateProfile } from "../features/auth/authSlice";

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
  });

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  /* ================= SET FORM ================= */
  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    await dispatch(updateProfile({
      first_name: form.first_name,
      last_name: form.last_name,
      address: form.address,
      phone: form.phone,
    }));

    setEditMode(false);
    dispatch(fetchProfile());
  };

  if (loading && !user) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-success mb-4">👤 Profile</h2>

        {/* FIRST NAME */}
        <input
          className="form-control mb-3"
          name="first_name"
          value={form.first_name}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="First Name"
        />

        {/* LAST NAME */}
        <input
          className="form-control mb-3"
          name="last_name"
          value={form.last_name}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="Last Name"
        />

        {/* EMAIL (readonly) */}
        <input
          className="form-control mb-3"
          name="email"
          value={form.email}
          disabled
          placeholder="Email"
        />

        {/* ADDRESS */}
        <textarea
          className="form-control mb-3"
          name="address"
          value={form.address}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="Address"
        />

        {/* PHONE */}
        <input
          className="form-control mb-3"
          name="phone"
          value={form.phone}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        {/* ACTIONS */}
        <div className="d-flex gap-2">

          {!editMode ? (
            <button
              className="btn btn-success"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}

          <button
            className="btn btn-danger ms-auto"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProfilePage;