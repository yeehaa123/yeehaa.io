import type { CTA } from "./CTA";
import {
  PageSection,
  CallToAction
} from "@/components";


type Props = {
  title: string,
  description: string,
  imageSrc: string,
  key_points: string[]
  cta: CTA
}

export function CaseStudySection({ title, imageSrc, description, key_points, cta }: Props) {
  return (
    <PageSection.Root className="bg-primary text-black">
      <PageSection.Container className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <img src={imageSrc} alt={title} />
        </div>
        <div className="flex flex-col mx-8 gap-8">
          <PageSection.Header>{title}</PageSection.Header>
          <div className="max-w-3xl mx-auto">
            <p className="mb-6">{description}</p>
            <ul className="list-disc list-inside mb-6">
              {key_points.map((point, index) => <li key={index}>{point}</li>)}
            </ul>
            <CallToAction {...cta} />
          </div>
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
