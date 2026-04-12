import { Header } from "@/components/header"
import { BenefitsSection } from "@/components/benefits-section"
import { ProductsSection } from "@/components/products-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductsSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  )
}
