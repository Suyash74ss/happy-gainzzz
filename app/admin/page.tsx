"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminPage() {

  // ✅ STATES
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0
  })
  const [open, setOpen] = useState(true)

  // ✅ FETCH ORDERS
  const fetchOrders = async () => {
    const res = await axios.get("https://backend-api-i2oh.onrender.com/api/orders")
    setOrders(res.data)
  }

  // ✅ FETCH DASHBOARD
  const fetchDashboard = async () => {
    const res = await axios.get("https://backend-api-i2oh.onrender.com/api/dashboard")
    setStats(res.data)
  }

  // ✅ LOAD DATA
  useEffect(() => {
    fetchOrders()
    fetchDashboard()
  }, [])

  // ✅ DELETE ORDER
  const deleteOrder = async (id: string) => {
    await axios.delete(`https://backend-api-i2oh.onrender.com/api/orders/${id}`)
    fetchOrders()
    fetchDashboard()
  }

  // ✅ UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    await axios.put(`https://backend-api-i2oh.onrender.com/api/orders/${id}`, { status })
    fetchOrders()
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#111", color: "#fff" }}>

      {/* ✅ SIDEBAR */}
      <div style={{
        width: open ? "250px" : "0px",
        overflow: "hidden",
        background: "#1a1a1a",
        padding: open ? "20px" : "0px",
        transition: "0.3s"
      }}>
        <h2>⚡ Admin</h2>

        <p style={{ marginTop: "20px", cursor: "pointer" }}>📊 Dashboard</p>
        <p style={{ cursor: "pointer" }}>📦 Orders</p>
        <p style={{ cursor: "pointer" }}>🛒 Products</p>
        <p style={{ cursor: "pointer" }}>👤 Users</p>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>

        {/* 🔥 TOP BAR */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* ☰ BUTTON */}
            <button onClick={() => setOpen(!open)} style={{
              fontSize: "20px",
              padding: "5px 10px",
              cursor: "pointer"
            }}>
              ☰
            </button>

            <h1>📦 Admin Dashboard</h1>
          </div>

          {/* ✅ ADD PRODUCT BUTTON */}
          <button
            onClick={() => alert("Add Product Form Coming")}
            style={{
              padding: "10px 20px",
              background: "#00c853",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            + Add Product
          </button>
        </div>

        {/* ✅ DASHBOARD CARDS */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ background: "#222", padding: "20px", borderRadius: "10px" }}>
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>

          <div style={{ background: "#222", padding: "20px", borderRadius: "10px" }}>
            <h3>Total Revenue</h3>
            <p>₹{stats.totalRevenue}</p>
          </div>

          <div style={{ background: "#222", padding: "20px", borderRadius: "10px" }}>
            <h3>Avg Order</h3>
            <p>₹{Math.round(stats.avgOrderValue)}</p>
          </div>
        </div>

        {/* ✅ ORDERS LIST */}
        {orders.map((order, i) => (
          <div key={i} style={{
            background: "#222",
            padding: "20px",
            margin: "15px 0",
            borderRadius: "12px"
          }}>
            <p><b>Name:</b> {order.name}</p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Status:</b> {order.status}</p>

            <button
              onClick={() => updateStatus(order._id, "Delivered")}
              style={{ marginRight: "10px", padding: "8px", background: "green", color: "#fff" }}
            >
              Mark Delivered
            </button>

            <button
              onClick={() => deleteOrder(order._id)}
              style={{ padding: "8px", background: "red", color: "#fff" }}
            >
              Delete ❌
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}