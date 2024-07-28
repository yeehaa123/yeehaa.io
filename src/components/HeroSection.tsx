import { Button } from "@/components/ui/button";
type CTA = {
  action: string,
  text: string
}

type Props = {
  title: string,
  bannerImageURL: string,
  subtitle: string,
  cta: CTA
}

export function HeroSection({ title, subtitle, cta, bannerImageURL }: Props) {
  return (
    <header className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImageURL})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center text-secondary-light px-4">
        <h1 className="text-6xl font-extrabold text-white mb-6">Conquer Black Oceans Together</h1>
        <p className="text-2xl mb-10 max-w-2xl mx-auto">Become an ecosystem leader through collaboration and knowledge sharing</p>
        <Button size="lg" variant="outline" className="bg-black/0 border-primary text-white font-bold text-lg hover:bg-black/80 hover:text-white transition-colors" asChild>
          <a href="/book-consultation">Embark on Your Black Ocean Journey</a>
        </Button>
      </div>
    </header>)
}
