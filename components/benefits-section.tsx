import { 
  Leaf, 
  Ban, 
  Sparkles, 
  Shield, 
  Heart, 
  Stethoscope, 
  Apple, 
  Pill 
} from "lucide-react"

const benefits = [
  {
    icon: Ban,
    title: "No Added Refined Sugar",
    description: "Pure nutrition without harmful refined sugars"
  },
  {
    icon: Leaf,
    title: "No White Sugar",
    description: "Keeping it clean and wholesome"
  },
  {
    icon: Sparkles,
    title: "No Artificial Sweeteners",
    description: "Only nature-approved sweetness"
  },
  {
    icon: Shield,
    title: "No Preservatives",
    description: "Fresh and safe for your little ones"
  },
  {
    icon: Heart,
    title: "Sweetened with Jaggery & Dates",
    description: "Natural sweetness from traditional sources"
  },
  {
    icon: Stethoscope,
    title: "Doctor&apos;s Choice",
    description: "Recommended by pediatricians"
  },
  {
    icon: Apple,
    title: "Complete Nutrition",
    description: "Everything growing bodies need"
  },
  {
    icon: Pill,
    title: "31 Vitamins & Minerals with DHA",
    description: "Comprehensive daily nourishment"
  }
]

export function BenefitsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-card rounded-3xl shadow-lg shadow-primary/5 border border-border p-6 sm:p-10 lg:p-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-foreground mb-2 text-balance">
            Clean Nutrition for Growing India
          </h2>
          <p className="text-center text-muted-foreground mb-10 sm:mb-12 max-w-2xl mx-auto text-pretty">
            We believe in nurturing the next generation with only the purest ingredients
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
