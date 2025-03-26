import { useTopHeaderContext } from './admission-header-context';

interface HeaderItem {
  title: string;
}

interface AdmissionTopHeaderItemProps {
  item: HeaderItem;
}

export default function AdmissionTopHeaderItem({ item }: AdmissionTopHeaderItemProps) {
  const { headerActiveItem, setHeaderActiveItem } = useTopHeaderContext();
  const isActive = item.title === headerActiveItem;

  return (
    <button
      onClick={() => setHeaderActiveItem(item.title)}
      className={`px-4 py-2 rounded-md transition-all ${
        isActive ? 'text-primary font-bold underline' : 'text-black'
      }`}
    >
      {item.title}
    </button>
  );
}
