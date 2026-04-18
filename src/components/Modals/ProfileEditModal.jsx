import React, { useState, useEffect } from "react";
import Modal from "../reusable/Modal";

export default function ProfileEditModal({
  open,
  user,
  onClose,
  onSave,
  loading,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ----------------------
  // Prefill user data
  // ----------------------
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  // ----------------------
  // Handlers
  // ----------------------
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return alert("Name and Email are required");
    }

    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim() || null, // optional
    });
  };

  return (
    <Modal open={open} onClose={onClose} className="profile-edit-modal">
      <h4>Edit Profile</h4>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>New Password (optional)</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            placeholder="Leave blank to keep current password"
          />
        </div>

        {/* Actions */}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light w-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}