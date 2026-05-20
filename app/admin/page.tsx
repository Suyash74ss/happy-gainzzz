"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [newProduct, setNewProduct] = useState({
  title: "",
  price: "",
  image: "",
  description: "",
  sku: "",
  flavour: ""
})

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0
  })


  // ================= FETCH =================

  const fetchOrders = async () => {

    const res =
      await axios.get(
        "https://backend-api-i2oh.onrender.com/api/orders"
      )

    setOrders(res.data)
  }


  const fetchProducts = async () => {

    const res =
      await axios.get(
        "https://backend-api-i2oh.onrender.com/api/products"
      )

    setProducts(res.data)
  }


  const fetchDashboard = async () => {

    const res =
      await axios.get(
        "https://backend-api-i2oh.onrender.com/api/dashboard"
      )

    setStats(res.data)
  }


  useEffect(() => {

    fetchOrders()
    fetchProducts()
    fetchDashboard()

  }, [])


  // ================= ORDER ACTIONS =================

  const updateStatus = async (id: string) => {

    await axios.put(
      `https://backend-api-i2oh.onrender.com/api/orders/${id}`,
      {
        status: "Delivered"
      }
    )

    fetchOrders()
  }


  const deleteOrder = async (id: string) => {

    await axios.delete(
      `https://backend-api-i2oh.onrender.com/api/orders/${id}`
    )

    fetchOrders()
    fetchDashboard()
  }


  // ================= PRODUCT ACTIONS =================

  const addProduct = async () => {

  await axios.post(
    "https://backend-api-i2oh.onrender.com/api/products",
    newProduct
  )

  fetchProducts()

  setNewProduct({
    title: "",
    price: "",
    image: "",
    description: "",
    sku: "",
    flavour: ""
  })
}

  const toggleStock = async (id: string, current: boolean) => {

    await axios.put(
      `https://backend-api-i2oh.onrender.com/api/products/${id}`,
      {
        inStock: !current
      }
    )

    fetchProducts()
  }


  const deleteProduct = async (id: string) => {

    await axios.delete(
      `https://backend-api-i2oh.onrender.com/api/products/${id}`
    )

    fetchProducts()
  }


  return (

    <div style={{
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "#fff",
      padding: "20px"
    }}>

      <h1 style={{
        fontSize: "35px",
        marginBottom: "30px"
      }}>
        ⚡ Admin Dashboard
      </h1>


      {/* ================= STATS ================= */}

      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "40px"
      }}>

        <div style={card}>
          <h3>Total Orders</h3>
          <h1>{stats.totalOrders}</h1>
        </div>

        <div style={card}>
          <h3>Total Revenue</h3>
          <h1>₹{stats.totalRevenue}</h1>
        </div>

        <div style={card}>
          <h3>Avg Order</h3>
          <h1>₹{Math.round(stats.avgOrderValue)}</h1>
        </div>

      </div>


      {/* ================= ORDERS ================= */}

      <h2 style={{ marginBottom: "20px" }}>
        📦 Orders
      </h2>

      {orders.map((order) => (

        <div key={order._id} style={box}>

          <div>

            <p><b>{order.name}</b></p>

            <p>{order.phone}</p>

            <p>₹{order.total}</p>

            <p>Status: {order.status}</p>

          </div>

          <div>

            <button
              onClick={() => updateStatus(order._id)}
              style={greenBtn}
            >
              Delivered
            </button>

            <button
              onClick={() => deleteOrder(order._id)}
              style={redBtn}
            >
              Delete
            </button>

          </div>

        </div>
      ))}


      {/* ================= ADD PRODUCT ================= */}

<div style={{
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "40px"
}}>

  <h2 style={{ marginBottom: "20px" }}>
    ➕ Add Product
  </h2>

  <div style={{
    display: "grid",
    gap: "15px"
  }}>

    <input
      placeholder="Title"
      value={newProduct.title}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          title: e.target.value
        })
      }
      style={input}
    />

    <input
      placeholder="Price"
      value={newProduct.price}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          price: e.target.value
        })
      }
      style={input}
    />

    <input
      placeholder="Image URL"
      value={newProduct.image}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          image: e.target.value
        })
      }
      style={input}
    />

    <input
      placeholder="SKU"
      value={newProduct.sku}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          sku: e.target.value
        })
      }
      style={input}
    />

    <input
      placeholder="Flavour"
      value={newProduct.flavour}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          flavour: e.target.value
        })
      }
      style={input}
    />

    <textarea
      placeholder="Description"
      value={newProduct.description}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          description: e.target.value
        })
      }
      style={{
        ...input,
        minHeight: "100px"
      }}
    />

    <button
      onClick={addProduct}
      style={{
        background: "#00c853",
        border: "none",
        padding: "12px",
        borderRadius: "10px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Add Product 🚀
    </button>

  </div>

</div>


      {/* ================= PRODUCTS ================= */}

      <h2 style={{
        marginTop: "50px",
        marginBottom: "20px"
      }}>
        🛒 Products
      </h2>

      {products.map((p) => (

        <div key={p._id} style={box}>

          <div>

            <img
              src={p.image}
              width="70"
              style={{
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />

            <p><b>{p.title}</b></p>

            <p>₹{p.price}</p>

            <p>SKU: {p.sku}</p>

            <p>Flavour: {p.flavour}</p>

            <p>
              {p.inStock
                ? "✅ In Stock"
                : "❌ Out Of Stock"}
            </p>

          </div>


          <div>

            <button
              onClick={() =>
                toggleStock(p._id, p.inStock)
              }
              style={greenBtn}
            >
              Toggle Stock
            </button>

            <button
              onClick={() =>
                deleteProduct(p._id)
              }
              style={redBtn}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  )
}


// ================= STYLES =================

const card = {
  flex: 1,
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "15px"
}

const box = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const greenBtn = {
  background: "#00c853",
  border: "none",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer"
}

const redBtn = {
  background: "red",
  border: "none",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
}

const input = {
  background: "#111",
  border: "1px solid #333",
  padding: "12px",
  borderRadius: "10px",
  color: "#fff"
}