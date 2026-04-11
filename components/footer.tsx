export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-xl font-bold text-primary">HAPPY GAINZ</span>
          <p className="text-sm text-muted-foreground max-w-md">
            Clean nutrition for every growing child. Made with love, backed by science.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground mt-2">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2026 Happy Gainz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
