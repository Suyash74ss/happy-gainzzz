"use client"

import { ShoppingCart, User, HelpCircle, Search } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`)
    }
  }

  const handleSupport = () => {
    alert("Support: Contact us at support@happygainz.com")
  }

  const handleAccount = () => {
    alert("Account: Login/Register coming soon!")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-primary border-b border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary-foreground">
              HAPPY GAINZ
            </span>
            <span className="text-[10px] sm:text-xs text-primary-foreground/80 tracking-wide">
              Nutrition for Growing India
            </span>
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
              />
            </div>
          </form>

          {/* Icons - Right */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="sm:hidden p-2 rounded-full hover:bg-primary-foreground/10 transition-colors" 
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-primary-foreground" />
            </button>
            <button 
              onClick={handleSupport} 
              className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors" 
              aria-label="Support"
            >
              <HelpCircle className="h-5 w-5 text-primary-foreground" />
            </button>
            <button 
              onClick={handleAccount} 
              className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors" 
              aria-label="Account"
            >
              <User className="h-5 w-5 text-primary-foreground" />
            </button>
            <Link 
              href="/cart"
              className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors relative" 
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary-foreground text-primary text-[10px] font-medium flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="sm:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>
    </header>
  )
}
