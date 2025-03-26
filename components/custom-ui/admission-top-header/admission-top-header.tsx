import AdmissionTopHeaderItem from './admission-top-header-item';

interface HeaderItem {
  title: string;
}

interface AdmissionTopHeaderProps {
  headerItems: HeaderItem[];
}

export default function AdmissionTopHeader({ headerItems }: AdmissionTopHeaderProps) {
  return (
    <div className="w-full h-16 border-b border-gray-300 flex text-lg bg-white">
      {headerItems.map((item, i) => (
        <AdmissionTopHeaderItem key={i} item={item} />
      ))}
    </div>
  );
}
