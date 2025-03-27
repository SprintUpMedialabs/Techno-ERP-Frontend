'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useSidebarContext } from '../sidebar/sidebar-context';
import { useTopHeaderContext } from '../admission-top-header/admission-header-context';

export default function AdmissionBreadCrumb() {
  const { sidebarActiveItem } = useSidebarContext();
  const { headerActiveItem } = useTopHeaderContext();

  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{sidebarActiveItem}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary font-bold">{headerActiveItem}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
