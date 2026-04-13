"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage() {

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    axios.get("https://backend-api-i2oh.onrender.com/api/products")
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#fff",
      fontFamily: "Arial"
    }}>

      {/* 🔥 HERO SECTION */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <h1 style={{ fontSize: "40px" }}>🚀 Happy Gainz</h1>
        <p>Premium Nutrition for Kids 💪</p>
      </div>

      {/* 🔥 FEATURES */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginBottom: "40px"
      }}>
        <div>🚚 Free Shipping</div>
        <div>💰 Cash on Delivery</div>
        <div>🔄 Easy Returns</div>
      </div>

      {/* 🔥 PRODUCTS */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🔥 Our Products
        </h2>

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}>

          {products.map((p) => (
            <div key={p._id} style={{
              width: "220px",
              background: "#111",
              padding: "15px",
              borderRadius: "12px",
              textAlign: "center"
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

              <h3>{p.title}</h3>

              <p style={{ color: "#00e676", fontSize: "18px" }}>
                ₹{p.price}
              </p>

              <button style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "#00c853",
                border: "none",
                borderRadius: "8px",
                color: "#fff"
              }}>
                Add to Cart
              </button>

            </div>
          ))}

        </div>
      </div>

    </div>
  )
}