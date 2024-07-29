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
    // <header className="relative h-screen lg:h-auto lg:w-full lg:aspect-[16/9] flex items-center justify-center bg-cover bg-center"
    //   style={{ backgroundImage: `url(${bannerImageURL})` }}>
    <header className="relative h-4/6 p-36 xl:p-48 flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-primary opacity-100"></div>
      <div className="relative z-10 text-center text-black px-4">
        <h1 className="text-6xl font-extrabold mb-6">{title}</h1>
        <p className="text-2xl mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <Button size="lg" variant="outline" className="bg-black/0 rounded-none border-white text-white font-bold text-lg hover:bg-white/80 hover:text-black transition-colors" asChild>
          <a href={cta.action}>{cta.text}</a>
        </Button>
      </div>
    </header>)
}
