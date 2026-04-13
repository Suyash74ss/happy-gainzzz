"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage() {

  const [products, setProducts] = useState<any[]>([])

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    axios.get("https://backend-api-i2oh.onrender.com/api/products")
      .then(res => setProducts(res.data))
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#fff",
      padding: "20px"
    }}>

      {/* 🔥 HEADER */}
      <h1 style={{
        fontSize: "32px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        🚀 Our Products
      </h1>

      {/* 🛒 PRODUCT GRID */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
      }}>

        {products.map((p) => (
          <div key={p._id} style={{
            width: "220px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "15px",
            textAlign: "center",
            transition: "0.3s"
          }}>

            <img
              src={p.image}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />

            <h3 style={{ marginTop: "10px" }}>{p.title}</h3>

            <p style={{ color: "#00e676", fontSize: "18px" }}>
              ₹{p.price}
            </p>

            <button style={{
              marginTop: "10px",
              padding: "8px 15px",
              background: "#00c853",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer"
            }}>
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}