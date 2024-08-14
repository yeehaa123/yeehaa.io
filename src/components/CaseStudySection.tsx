import type { CTA } from "./CTA";
import {
  CallToAction,
  PageSection,
} from "@/components";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';



type Props = {
  title: string,
  description: string,
  imageSrc: string,
  testimonial: { quote: string, author: string },
  key_points: { title: string, description: string }[],
  cta: CTA
}

export function CaseStudySection({ title, description, testimonial, key_points, cta }: Props) {
  return (
    <PageSection.Root className="bg-primary text-black">
      <PageSection.Container>
        <div className="flex flex-col justify-center items-center py-8 lg:py-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">{title}</h2>
          <div className="hidden flex flex-col max-w-2xl text-left lg:text-center" >
            <blockquote>"{testimonial.quote}"</blockquote>
            <p className="mt-2 font-semibold">{testimonial.author}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row lg:gap-16">
          <div className="max-w-lg">
            <p className="mb-6 text-offblack">{description}</p>
          </div>
          <Accordion type="single" collapsible>
            {key_points.map((point, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{point.title}</AccordionTrigger>
                <AccordionContent>{point.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="text-center mt-12">
          <CallToAction {...cta} />
        </div>
      </PageSection.Container >
    </PageSection.Root >
  )
}
