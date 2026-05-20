"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage() {

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "https://backend-api-i2oh.onrender.com/api/products"
      )

      setProducts(res.data)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchProducts()

  }, [])


  return (

    <div style={{
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "Arial"
    }}>

      {/* ================= HERO ================= */}

      <div style={{
        padding: "60px 20px",
        textAlign: "center"
      }}>

        <h1 style={{
          fontSize: "55px",
          marginBottom: "15px",
          fontWeight: "bold"
        }}>
          HAPPY GAINZ 🚀
        </h1>

        <p style={{
          fontSize: "20px",
          color: "#ccc"
        }}>
          Premium Nutrition For Growing India 💪
        </p>

      </div>


      {/* ================= FEATURES ================= */}

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "60px"
      }}>

        <div style={featureBox}>
          🚚 Free Shipping
        </div>

        <div style={featureBox}>
          💰 Cash On Delivery
        </div>

        <div style={featureBox}>
          🔄 Easy Returns
        </div>

      </div>


      {/* ================= PRODUCTS ================= */}

      <div style={{
        padding: "20px"
      }}>

        <h2 style={{
          fontSize: "35px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          🔥 Our Products
        </h2>

        {loading && (

          <p style={{
            textAlign: "center"
          }}>
            Loading Products...
          </p>
        )}


        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px"
        }}>

          {products.map((p) => (

            <div
              key={p._id}
              style={card}
            >

              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  marginBottom: "15px"
                }}
              />

              <h3 style={{
                fontSize: "24px",
                marginBottom: "10px"
              }}>
                {p.title}
              </h3>

              <p style={{
                color: "#00e676",
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}>
                ₹{p.price}
              </p>

              <p style={{
                color: "#bbb",
                marginBottom: "10px"
              }}>
                {p.flavour}
              </p>

              <p style={{
                marginBottom: "15px",
                color: "#ddd"
              }}>
                {p.description}
              </p>

              <p style={{
                marginBottom: "20px",
                fontWeight: "bold"
              }}>
                {p.inStock
                  ? "✅ In Stock"
                  : "❌ Out Of Stock"}
              </p>

              <button style={btn}>
                Add To Cart 🛒
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}


// ================= STYLES =================

const featureBox = {
  background: "#1a1a1a",
  padding: "15px 25px",
  borderRadius: "15px",
  fontWeight: "bold"
}

const card = {
  background: "#1a1a1a",
  borderRadius: "20px",
  padding: "20px"
}

const btn = {
  width: "100%",
  background: "#00c853",
  border: "none",
  padding: "14px",
  borderRadius: "12px",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px"
}