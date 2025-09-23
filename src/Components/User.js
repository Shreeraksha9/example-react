import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // Fetch users on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8090/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://localhost:8090/users", form);
      setForm({ name: "", email: "", phone: "" });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add User</button>
      </form>

      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <b>{user.name}</b> | {user.email} | {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
