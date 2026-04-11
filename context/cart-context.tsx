"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Flavor = "Chocolate" | "Vanilla" | "Strawberry"

export interface CartItem {
  id: number
  title: string
  ageGroup: string
  flavor: Flavor
  image: string
  price: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number, flavor: Flavor) => void
  updateQuantity: (id: number, flavor: Flavor, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => item.id === newItem.id && item.flavor === newItem.flavor
      )
      
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id && item.flavor === newItem.flavor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number, flavor: Flavor) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.flavor === flavor)))
  }

  const updateQuantity = (id: number, flavor: Flavor, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, flavor)
      return
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.flavor === flavor
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
