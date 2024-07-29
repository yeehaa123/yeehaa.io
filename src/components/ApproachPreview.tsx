import {
  Compass, GitBranch, Brain, Waves,
  Network, Layers, Boxes, ArrowRight, ArrowDown
} from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

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
  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 my-8">

    {items.map((item, index) => {
      // @ts-ignore
      const Icon = IconMap[item.icon] || Boxes;
      return <Fragment key={item.title}>
        <div className="text-center flex flex-col items-center">
          <Icon classNam="w-12 h-12 mb-2" />
          <h3 className="font-semibold text-sm">{item.title}</h3>
        </div>
        {index < items.length - 1 && (
          <>
            <ArrowDown className="w-6 h-6 my-2 sm:hidden" />
            <ArrowRight className="hidden sm:block w-6 h-6 mx-2" />
          </>
        )}
      </Fragment>
    })}
  </div>
);

