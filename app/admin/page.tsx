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

    const res = await axios.get(
      "https://backend-api-i2oh.onrender.com/api/orders"
    )

    setOrders(res.data)
  }


  const fetchProducts = async () => {

    const res = await axios.get(
      "https://backend-api-i2oh.onrender.com/api/products"
    )

    setProducts(res.data)
  }


  const fetchDashboard = async () => {

    const res = await axios.get(
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

    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.image
    ) {
      alert("Please fill all required fields")
      return
    }

    await axios.post(
      "https://backend-api-i2oh.onrender.com/api/products",
      {
        ...newProduct,
        price: Number(newProduct.price)
      }
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

    alert("Product Added Successfully 🚀")
  }


  const toggleStock = async (
    id: string,
    current: boolean
  ) => {

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
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        fontSize: "40px",
        marginBottom: "30px"
      }}>
        ⚡ Admin Dashboard
      </h1>


      {/* ================= STATS ================= */}

      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "40px",
        flexWrap: "wrap"
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

      <h2 style={{
        marginBottom: "20px",
        fontSize: "28px"
      }}>
        📦 Orders
      </h2>

      {orders.map((order) => (

        <div key={order._id} style={box}>

          <div>

            <p><b>Name:</b> {order.name}</p>

            <p><b>Phone:</b> {order.phone}</p>

            <p><b>Total:</b> ₹{order.total}</p>

            <p><b>Status:</b> {order.status}</p>

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
        padding: "25px",
        borderRadius: "20px",
        marginTop: "50px",
        marginBottom: "50px"
      }}>

        <h2 style={{
          marginBottom: "20px",
          fontSize: "28px"
        }}>
          ➕ Add Product
        </h2>

        <div style={{
          display: "grid",
          gap: "15px"
        }}>

          <input
            placeholder="Product Title"
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
              minHeight: "120px"
            }}
          />

          <button
            onClick={addProduct}
            style={{
              background: "#00c853",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Add Product 🚀
          </button>

        </div>

      </div>


      {/* ================= PRODUCTS ================= */}

      <h2 style={{
        marginBottom: "20px",
        fontSize: "28px"
      }}>
        🛒 Products
      </h2>

      {products.map((p) => (

        <div key={p._id} style={box}>

          <div style={{
            display: "flex",
            gap: "20px",
            alignItems: "center"
          }}>

            <img
              src={p.image}
              width="100"
              height="100"
              style={{
                borderRadius: "15px",
                objectFit: "cover"
              }}
            />

            <div>

              <p style={{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {p.title}
              </p>

              <p>₹{p.price}</p>

              <p>SKU: {p.sku}</p>

              <p>Flavour: {p.flavour}</p>

              <p>
                {p.inStock
                  ? "✅ In Stock"
                  : "❌ Out Of Stock"}
              </p>

            </div>

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
  minWidth: "220px",
  background: "#1a1a1a",
  padding: "25px",
  borderRadius: "20px"
}

const box = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "20px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap"
}

const greenBtn = {
  background: "#00c853",
  border: "none",
  color: "#fff",
  padding: "12px 18px",
  borderRadius: "10px",
  marginRight: "10px",
  cursor: "pointer",
  fontWeight: "bold"
}

const redBtn = {
  background: "#ff1744",
  border: "none",
  color: "#fff",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
}

const input = {
  background: "#111",
  border: "1px solid #333",
  padding: "15px",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "15px"
}