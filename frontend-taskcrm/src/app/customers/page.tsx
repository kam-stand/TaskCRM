"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./customers.css";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone_number: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:8000/customers";

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL);
      setCustomers(res.data);
      setError("");
    } catch {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete customer");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addCustomer = async () => {
    if (
      !formData.name ||
      !formData.company ||
      !formData.phone_number ||
      !formData.email
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post(BASE_URL, formData);
      setCustomers([...customers, res.data]);
      setFormData({ name: "", company: "", phone_number: "", email: "" });
      setShowForm(false);
    } catch {
      alert("Failed to add customer");
    }
  };

  return (
    <div className="customers-page">
      <h1>Customers</h1>
      {loading && <p className="info-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone #</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td className="company-cell">
                {c.company}
                <button
                  onClick={() => deleteCustomer(c.id)}
                  title="Delete customer"
                  className="delete-button"
                  aria-label={`Delete customer ${c.name}`}
                >
                  &minus;
                </button>
              </td>
              <td>{c.phone_number}</td>
              <td>{c.email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="add-button"
          aria-label="Add customer"
        >
          + Add Customer
        </button>
      ) : (
        <div className="add-form">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />
          <div className="form-buttons">
            <button onClick={addCustomer} className="save-button">
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
