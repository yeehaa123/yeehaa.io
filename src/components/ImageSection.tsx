import { NarrowSection } from "@/components/NarrowSection";

type Props = {
  title: string,
  description: string,
  key_points: string[],
  imageURL: string,
}
export function ImageSection({ title, description, key_points, imageURL }: Props) {
  return (
    <NarrowSection className="w-full my-16 flex flex-col lg:flex-row gap-4 lg:gap-8 items-center justify-between">
      <div className="w-full lg:w-1/2">
        <img src={imageURL} />
      </div>
      <div className="flex flex-col mx-8 gap-8 text-black dark:text-white">
        <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="mb-6">{description}</p>
          <ul className="list-disc list-inside mb-6">
            {key_points.map((point) => <li>{point}</li>)}
          </ul>
        </div>
      </div>
    </NarrowSection>
  )
}
