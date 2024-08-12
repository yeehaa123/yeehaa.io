import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export type CTA = {
  action?: string | undefined,
  text: string
}

const addCalendlyScript = () => {
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.body.appendChild(script);
};

export function CallToAction({ text, action }: CTA) {
  const url = "https://calendly.com/yeehaa-offcourse/30min"
  useEffect(() => {
    addCalendlyScript();
  }, []);

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url });
    }
  };
  if (!action) {
    return (
      <Button variant="outline"
        className="bg-black/0 dark:bg-black/0 hover:bg-black/0 border-black 
          dark:hover:bg-secondary hover:bg-secondary
          hover:text-white hover:border-none
          rounded-none font-bold md:text-lg 
          transition-colors"
        onClick={openCalendly}>{text}
      </Button >
    )
  }
  return (
    <Button variant="outline"
      className="bg-black/0 dark:bg-black/0 hover:bg-black/0 border-black 
          dark:hover:bg-secondary hover:bg-secondary
          hover:text-white hover:border-none
          rounded-none font-bold md:text-lg 
          transition-colors" asChild>
      <a href={action}>{text}</a>
    </Button >
  )
}

