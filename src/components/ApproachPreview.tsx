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
  <section className="w-full py-24">
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="grid grid-cols-1 gap-8 lg:gap-16 md:grid-cols-3 md:flex md:justify-between">
        {items.map((item, index) => {
          const numbers = ["One", "Two", "Three"];
          // @ts-ignore
          const Icon = IconMap[item.icon] || Boxes;
          return <div key={index} className="flex flex-row items-center gap-6">
            <Icon className="h-10 w-10" />
            <h3 className="font-serif xl:text-lg text-left w-full">
              <p className="font-bold">Step {numbers[index]}</p>
              <p>{item.title}</p></h3>
          </div>
        })}
      </div>
    </div>
  </section>
);

