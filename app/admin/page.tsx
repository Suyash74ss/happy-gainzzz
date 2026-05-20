"use client"

import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Bell,
  Search,
  Boxes,
  TrendingUp,
  Percent,
  Globe,
  Menu
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 4780 },
  { name: "Fri", sales: 5890 },
  { name: "Sat", sales: 6390 },
  { name: "Sun", sales: 7490 }
]

const orders = [
  {
    id: "#HG1024",
    customer: "Rahul Sharma",
    product: "Tiny Complete Growth",
    status: "Delivered",
    amount: "₹899"
  },
  {
    id: "#HG1025",
    customer: "Priya Mehta",
    product: "Kids Complete Growth",
    status: "Pending",
    amount: "₹1299"
  },
  {
    id: "#HG1026",
    customer: "Aman Verma",
    product: "Plus Athlete+",
    status: "Shipped",
    amount: "₹1499"
  }
]

export default function AdminDashboard() {

  return (

    <div style={{
      display: "flex",
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "Arial"
    }}>

      {/* ================= SIDEBAR ================= */}

      <div style={{
        width: "260px",
        background: "#fff",
        padding: "30px 20px",
        borderRight: "1px solid #eee",
        position: "sticky",
        top: 0,
        height: "100vh"
      }}>

        <h1 style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "40px",
          color: "#2563eb"
        }}>
          Happy Gainz
        </h1>

        <SidebarItem icon={<BarChart3 size={20} />} text="Dashboard" />
        <SidebarItem icon={<ShoppingCart size={20} />} text="Orders" />
        <SidebarItem icon={<Package size={20} />} text="Products" />
        <SidebarItem icon={<Users size={20} />} text="Customers" />
        <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
        <SidebarItem icon={<TrendingUp size={20} />} text="Analytics" />
        <SidebarItem icon={<Percent size={20} />} text="Marketing" />
        <SidebarItem icon={<Globe size={20} />} text="Website" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />

      </div>


      {/* ================= MAIN ================= */}

      <div style={{
        flex: 1,
        padding: "30px"
      }}>

        {/* ================= TOPBAR ================= */}

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>

          <div style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            padding: "12px 18px",
            borderRadius: "14px",
            width: "350px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
          }}>

            <Search size={18} color="#777" />

            <input
              placeholder="Search..."
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
                background: "transparent"
              }}
            />

          </div>


          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>

            <Bell size={22} />

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#fff",
              padding: "10px 14px",
              borderRadius: "14px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }}>

              <img
                src="https://i.pravatar.cc/40"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%"
                }}
              />

              <div>
                <p style={{
                  margin: 0,
                  fontWeight: "bold"
                }}>
                  Admin
                </p>

                <p style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#777"
                }}>
                  Founder
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* ================= STATS ================= */}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>

          <StatCard
            title="Total Sales"
            value="₹2.4L"
          />

          <StatCard
            title="Orders"
            value="1,248"
          />

          <StatCard
            title="Revenue"
            value="₹8.2L"
          />

          <StatCard
            title="Visitors"
            value="18.4K"
          />

        </div>


        {/* ================= CHART ================= */}

        <div style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
        }}>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}>

            <h2>Sales Analytics</h2>

            <div style={{
              display: "flex",
              gap: "10px"
            }}>

              <button style={toggleBtn}>
                Weekly
              </button>

              <button style={toggleBtn}>
                Monthly
              </button>

            </div>

          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>


        {/* ================= PRODUCTS ================= */}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>

          <ProductCard
            name="Tiny Complete Growth"
            sales="1,248 Sales"
          />

          <ProductCard
            name="Kids Complete Growth"
            sales="894 Sales"
          />

          <ProductCard
            name="Plus Athlete+"
            sales="602 Sales"
          />

        </div>


        {/* ================= TABLE ================= */}

        <div style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          overflowX: "auto"
        }}>

          <h2 style={{
            marginBottom: "20px"
          }}>
            Recent Orders
          </h2>

          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>

            <thead>

              <tr style={{
                textAlign: "left",
                color: "#777"
              }}>

                <th style={th}>Order ID</th>
                <th style={th}>Customer</th>
                <th style={th}>Product</th>
                <th style={th}>Status</th>
                <th style={th}>Amount</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((o, i) => (

                <tr key={i}>

                  <td style={td}>{o.id}</td>
                  <td style={td}>{o.customer}</td>
                  <td style={td}>{o.product}</td>

                  <td style={td}>
                    <span style={{
                      background:
                        o.status === "Delivered"
                          ? "#dcfce7"
                          : o.status === "Pending"
                          ? "#fef9c3"
                          : "#dbeafe",
                      color:
                        o.status === "Delivered"
                          ? "#166534"
                          : o.status === "Pending"
                          ? "#854d0e"
                          : "#1e40af",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "bold"
                    }}>
                      {o.status}
                    </span>
                  </td>

                  <td style={td}>{o.amount}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* ================= INVENTORY ================= */}

        <div style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}>

          <AlertCard
            title="Low Stock Alert"
            text="Kids Complete Growth only 8 units left."
          />

          <AlertCard
            title="Out Of Stock"
            text="Tiny Athlete Trial Pack is currently unavailable."
          />

        </div>

      </div>

    </div>
  )
}


// ================= COMPONENTS =================

function SidebarItem({ icon, text }: any) {

  return (

    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      borderRadius: "14px",
      marginBottom: "8px",
      cursor: "pointer",
      color: "#333",
      fontWeight: "500"
    }}>

      {icon}

      <span>{text}</span>

    </div>
  )
}


function StatCard({ title, value }: any) {

  return (

    <div style={{
      background: "#fff",
      padding: "24px",
      borderRadius: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
    }}>

      <p style={{
        color: "#777",
        marginBottom: "10px"
      }}>
        {title}
      </p>

      <h1 style={{
        margin: 0,
        fontSize: "34px"
      }}>
        {value}
      </h1>

    </div>
  )
}


function ProductCard({ name, sales }: any) {

  return (

    <div style={{
      background: "#fff",
      padding: "24px",
      borderRadius: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
    }}>

      <h3>{name}</h3>

      <p style={{
        color: "#777"
      }}>
        {sales}
      </p>

    </div>
  )
}


function AlertCard({ title, text }: any) {

  return (

    <div style={{
      background: "#fff",
      padding: "24px",
      borderRadius: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
    }}>

      <h3>{title}</h3>

      <p style={{
        color: "#777"
      }}>
        {text}
      </p>

    </div>
  )
}


// ================= STYLES =================

const th = {
  padding: "14px",
  borderBottom: "1px solid #eee"
}

const td = {
  padding: "18px 14px",
  borderBottom: "1px solid #f3f4f6"
}

const toggleBtn = {
  background: "#eff6ff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#2563eb"
}