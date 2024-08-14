import type { CTA } from "./CTA";
import {
  CallToAction,
  PageSection,
} from "@/components";


type Props = {
  title: string,
  description: string,
  imageSrc: string,
  key_points: string[],
  cta: CTA
}

export function AboutSection({ title, imageSrc, description, key_points, cta }: Props) {
  return (
    <PageSection.Root className="bg-primary text-black">
      <PageSection.Container className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <img src={imageSrc} alt={title} />
        </div>
        <div className="flex flex-col mx-8 gap-8">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">{title}</h2>
          <div className="max-w-3xl mx-auto">
            <p className="mb-6">{description}</p>
            <ul className="list-disc list-inside mb-6">
              {key_points.map((point, index) => <li key={index}>{point}</li>)}
            </ul>
          </div>
          <div>
            <CallToAction {...cta} />
          </div>
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
