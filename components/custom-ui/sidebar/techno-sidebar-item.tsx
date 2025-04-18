'use client';

import { useRouter, usePathname } from 'next/navigation';
import TechnoIcon from '../icon/TechnoIcon';
import { useHoverContext } from './hover-context';
import { useSidebarContext } from './sidebar-context';
import { SIDEBAR_ITEMS } from '@/common/constants/sidebarItems';
import { SITE_MAP } from '@/common/constants/frontendRouting';

export default function TechnoSidebarItem({
  icon: Icon,
  text, onClick
}: {
  icon: React.ComponentType<{ size: number, strokeWidth: number }>;
  text: string, onClick?: () => {}
}) {
  const hovered = useHoverContext();
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarActiveItem, setSidebarActiveItem } = useSidebarContext();

  const routeKey = Object.keys(SIDEBAR_ITEMS).find(
    (key) => SIDEBAR_ITEMS[key as keyof typeof SIDEBAR_ITEMS] === text
  ) as keyof typeof SITE_MAP | undefined;

  const getRoute = () => {
    if (!routeKey) return null;

    const mapValue = SITE_MAP[routeKey];

    if (typeof mapValue === 'string') {
      return mapValue;
    }
    else if (typeof mapValue === 'object') {
      return mapValue.DEFAULT;
    }

    return null;
  };

  const route = getRoute();

  const isActive =
    (route && pathname.startsWith(route)) ||
    sidebarActiveItem === text;

  const handleClick = () => {
    if (route) {
      setSidebarActiveItem(text);
      router.push(route);
    }
  };

  return (
    <div
      className={`flex items-center transition-all duration-300 py-3 px-4 ease-in-out cursor-pointer ${hovered
          ? `justify-start gap-4 rounded-lg w-full ${isActive && `bg-[#FAFAFA] text-primary rounded-lg`}`
          : isActive
            ? 'justify-start rounded-l-lg w-[145%] bg-[#FAFAFA] text-primary'
            : 'justify-center w-full'
          }`}
      onClick={onClick ? onClick : handleClick}
    >
      <TechnoIcon className="transition-transform duration-100 ease-in-out">
        <Icon size={24} strokeWidth={1.5} />
      </TechnoIcon>
      {hovered && (
        <div className="flex items-center gap-4 ml-2">
          <p className="text-md">{text}</p>
        </div>
      )}
    </div>
  );
}