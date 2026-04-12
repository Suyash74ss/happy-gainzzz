"use client"

import axios from "axios";
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CreditCard, Truck, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Step = "address" | "payment" | "confirmation"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>("address")
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = totalPrice
  const shipping = 0
  const total = subtotal + shipping

  const validateAddress = () => {
    const newErrors: Record<string, string> = {}
    
    if (!address.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!address.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(address.phone.replace(/\D/g, ""))) newErrors.phone = "Enter valid 10-digit phone"
    if (!address.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(address.email)) newErrors.email = "Enter valid email"
    if (!address.addressLine1.trim()) newErrors.addressLine1 = "Address is required"
    if (!address.city.trim()) newErrors.city = "City is required"
    if (!address.state.trim()) newErrors.state = "State is required"
    if (!address.pincode.trim()) newErrors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Enter valid 6-digit pincode"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    const newErrors: Record<string, string> = {}
    
    const cardNum = payment.cardNumber.replace(/\s/g, "")
    if (!cardNum) newErrors.cardNumber = "Card number is required"
    else if (!/^\d{16}$/.test(cardNum)) newErrors.cardNumber = "Enter valid 16-digit card number"
    if (!payment.cardName.trim()) newErrors.cardName = "Name on card is required"
    if (!payment.expiry.trim()) newErrors.expiry = "Expiry is required"
    else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) newErrors.expiry = "Use MM/YY format"
    if (!payment.cvv.trim()) newErrors.cvv = "CVV is required"
    else if (!/^\d{3,4}$/.test(payment.cvv)) newErrors.cvv = "Enter valid CVV"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateAddress()) {
      setCurrentStep("payment")
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (validatePayment()) {
    try {
      setIsProcessing(true)

      await axios.post("https://backend-api-i2oh.onrender.com/api/orders/create", {
  name: address.fullName,
  phone: address.phone,
  address: `${address.addressLine1}, ${address.city}, ${address.state}, ${address.pincode}`,
  items: items,
  total: total
})

      setIsProcessing(false)
      setCurrentStep("confirmation")
      clearCart()

    } catch (err) {
      console.error(err)
      setIsProcessing(false)
      alert("Error placing order")
    }
  }
}

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Truck className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products before checkout</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${currentStep === "address" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "address" ? "bg-primary text-primary-foreground" : 
                currentStep === "payment" || currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {currentStep === "payment" || currentStep === "confirmation" ? <CheckCircle className="h-5 w-5" /> : "1"}
              </div>
              <span className="hidden sm:inline font-medium">Address</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === "payment" || currentStep === "confirmation" ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "payment" ? "bg-primary text-primary-foreground" : 
                currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {currentStep === "confirmation" ? <CheckCircle className="h-5 w-5" /> : "2"}
              </div>
              <span className="hidden sm:inline font-medium">Payment</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === "confirmation" ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex items-center gap-2 ${currentStep === "confirmation" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                3
              </div>
              <span className="hidden sm:inline font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {currentStep === "address" && (
              <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Address
                </h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.fullName ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="Enter full name"
                      />
                      {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.phone ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.email ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Address Line 1 *</label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.addressLine1 ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                      placeholder="House no., Building name, Street"
                    />
                    {errors.addressLine1 && <p className="text-destructive text-xs mt-1">{errors.addressLine1}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Address Line 2</label>
                    <input
                      type="text"
                      value={address.addressLine2}
                      onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="Landmark, Area (Optional)"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">City *</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.city ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="City"
                      />
                      {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">State *</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.state ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="State"
                      />
                      {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Pincode *</label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.pincode ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="6-digit"
                      />
                      {errors.pincode && <p className="text-destructive text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Link
                      href="/cart"
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Details
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Card Number *</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
                      maxLength={19}
                      className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.cardNumber ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name on Card *</label>
                    <input
                      type="text"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.cardName ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                      placeholder="Name as on card"
                    />
                    {errors.cardName && <p className="text-destructive text-xs mt-1">{errors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Expiry Date *</label>
                      <input
                        type="text"
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                        maxLength={5}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.expiry ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="MM/YY"
                      />
                      {errors.expiry && <p className="text-destructive text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">CVV *</label>
                      <input
                        type="password"
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "") })}
                        maxLength={4}
                        className={`w-full h-11 px-4 rounded-xl bg-input border ${errors.cvv ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="text-destructive text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-muted rounded-xl">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Your payment info is secure and encrypted</span>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("address")}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing..." : `Pay Rs. ${total.toLocaleString()}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === "confirmation" && (
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order. We&apos;ve sent a confirmation email to {address.email}
                </p>
                <div className="bg-muted rounded-xl p-4 mb-6">
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="text-lg font-bold text-foreground">HG{Date.now().toString().slice(-8)}</p>
                </div>
                <div className="text-left bg-muted rounded-xl p-4 mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    {address.fullName}<br />
                    {address.addressLine1}<br />
                    {address.addressLine2 && <>{address.addressLine2}<br /></>}
                    {address.city}, {address.state} - {address.pincode}<br />
                    Phone: {address.phone}
                  </p>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== "confirmation" && (
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.flavor}`} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name || "product image"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.flavor} x {item.quantity}</p>
                        <p className="text-sm font-medium text-primary">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
