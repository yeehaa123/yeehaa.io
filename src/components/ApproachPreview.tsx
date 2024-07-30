import {
  Compass, GitBranch, Brain, Waves,
  Network, Layers, Boxes
} from 'lucide-react';

type Item = {
  title: string,
  icon: string
}

type Props = {
  items: Item[]
}

const IconMap = {
  Compass: Compass,
  GitBranch: GitBranch,
  Brain: Brain,
  Waves: Waves,
  Network: Network,
  Layers: Layers,
  Boxes: Boxes,
};

export const ApproachPreview = ({ items }: Props) => (
  <section className="w-full pt-24 pb-24 md:pb-36 lg:pb-48">
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:flex md:justify-center md:gap-12">
        {items.map((item, index) => {
          // @ts-ignore
          const Icon = IconMap[item.icon] || Boxes;
          return <div key={index} className="text-center flex flex-row gap-4">
            <Icon classNam="w-12 h-12 mb-2" />
            <h3 className="font-serif text-lg"><span className="font-extrabold">Step {index + 1}: </span>{item.title}</h3>
          </div>
        })}
      </div>
    </div>
  </section>
);

