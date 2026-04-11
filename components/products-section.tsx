"use client"

import { ShoppingCart, Check } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useCart, Flavor } from "@/context/cart-context"

const flavors: Flavor[] = ["Chocolate", "Vanilla", "Strawberry"]

const flavorColors: Record<Flavor, string> = {
  Chocolate: "bg-amber-800",
  Vanilla: "bg-amber-100 border border-amber-300",
  Strawberry: "bg-pink-400"
}

const products = [
  {
    id: 1,
    ageGroup: "2-6 Years",
    title: "Growth Nutrition",
    description: "Essential nutrients for early development and strong foundations",
    image: "/products/product-2-6.jpg",
    color: "from-emerald-100 to-emerald-50",
    price: 899
  },
  {
    id: 2,
    ageGroup: "7-12 Years",
    title: "Active Kids",
    description: "Energy and focus for school-going champions",
    image: "/products/product-7-12.jpg",
    color: "from-teal-100 to-teal-50",
    price: 999
  },
  {
    id: 3,
    ageGroup: "13+ Years",
    title: "Teen Strength",
    description: "Support for the crucial teenage growth spurt",
    image: "/products/product-13-plus.jpg",
    color: "from-green-100 to-green-50",
    price: 1099
  },
  {
    id: 4,
    ageGroup: "Athlete",
    title: "Performance Nutrition",
    description: "Power-packed nutrition for young sports enthusiasts",
    image: "/products/product-athlete.jpg",
    color: "from-lime-100 to-lime-50",
    price: 1299
  }
]

export function ProductsSection() {
  const [selectedFlavors, setSelectedFlavors] = useState<Record<number, Flavor>>(
    Object.fromEntries(products.map(p => [p.id, "Chocolate" as Flavor]))
  )
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})
  const { addToCart } = useCart()

  const handleFlavorSelect = (productId: number, flavor: Flavor) => {
    setSelectedFlavors(prev => ({ ...prev, [productId]: flavor }))
  }

  const handleAddToCart = (product: typeof products[0]) => {
    const flavor = selectedFlavors[product.id]
    const key = `${product.id}-${flavor}`
    
    addToCart({
      id: product.id,
      title: product.title,
      ageGroup: product.ageGroup,
      flavor,
      image: product.image,
      price: product.price
    })
    
    setAddedItems(prev => ({ ...prev, [key]: true }))
    
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [key]: false }))
    }, 2000)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 text-balance">
            Nutrition for Growing India
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Specially formulated products tailored to your child&apos;s growth stage
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => {
            const selectedFlavor = selectedFlavors[product.id]
            const addedKey = `${product.id}-${selectedFlavor}`
            const isAdded = addedItems[addedKey]
            
            return (
              <div 
                key={product.id}
                className="group bg-card rounded-2xl shadow-md shadow-primary/5 border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Product Image */}
                <div className={`relative h-48 sm:h-52 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={`${product.ageGroup} - ${product.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                
                {/* Product Info */}
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
                    {product.ageGroup}
                  </span>
                  <h3 className="font-bold text-lg text-foreground mb-1.5">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Flavor Selection */}
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-2">Flavor: {selectedFlavor}</p>
                    <div className="flex gap-2">
                      {flavors.map((flavor) => (
                        <button
                          key={flavor}
                          onClick={() => handleFlavorSelect(product.id, flavor)}
                          className={`w-7 h-7 rounded-full ${flavorColors[flavor]} flex items-center justify-center transition-all ${
                            selectedFlavor === flavor 
                              ? "ring-2 ring-primary ring-offset-2" 
                              : "hover:scale-110"
                          }`}
                          aria-label={`Select ${flavor} flavor`}
                          title={flavor}
                        >
                          {selectedFlavor === flavor && (
                            <Check className={`h-4 w-4 ${flavor === "Vanilla" ? "text-amber-800" : "text-white"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <p className="font-bold text-lg text-foreground mb-3">
                    Rs. {product.price.toLocaleString("en-IN")}
                  </p>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm active:scale-[0.98] transition-all ${
                      isAdded 
                        ? "bg-green-600 text-white" 
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isAdded ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
