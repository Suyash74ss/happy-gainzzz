"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const res = await axios.get("https://backend-api-i2oh.onrender.com/api/orders")
    setOrders(res.data)
  }

  const deleteOrder = async (id: string) => {
    await axios.delete(`https://backend-api-i2oh.onrender.com/api/orders/${id}`)
    fetchOrders()
  }

  const updateStatus = async (id: string, status: string) => {
    await axios.put(`https://backend-api-i2oh.onrender.com/api/orders/${id}`, { status })
    fetchOrders()
  }

  return (
    <div style={{ padding: "20px", background: "#111", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>📦 Admin Dashboard</h1>

      {orders.map((order, i) => (
        <div key={i} style={{
          background: "#222",
          padding: "20px",
          margin: "15px 0",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)"
        }}>
          <p><b>Name:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Total:</b> ₹{order.total}</p>
          <p><b>Status:</b> {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Delivered")}
            style={{ marginRight: "10px", padding: "8px", background: "green", color: "#fff" }}>
            Mark Delivered
          </button>

          <button onClick={() => deleteOrder(order._id)}
            style={{ padding: "8px", background: "red", color: "#fff" }}>
            Delete ❌
          </button>
        </div>
      ))}
    </div>
  )
}