'use client';

import TechnoTopHeader from '../custom-ui/top-header/techno-top-header';
import TechnoBreadCrumb from '../custom-ui/breadcrump/techno-breadcrumb';
import { TopHeaderProvider, useTopHeaderContext } from '../custom-ui/top-header/top-header-context';
import TechnoPageTitle from '../custom-ui/page-title/techno-page-title';
import { TechnoFilterProvider } from '../custom-ui/filter/filter-context';
import AllLeadsPage from './allLeads/all-leads-page';

const headerItem = [{ title: 'All Leads' }, { title: 'Yellow Leads' }, { title: 'Admin Tracker' }];

export default function CRMLayout() {
    return (
        <TopHeaderProvider>
            <TechnoFilterProvider>
                <CRMContent />
            </TechnoFilterProvider>
        </TopHeaderProvider>
    );
}

function CRMContent() {
    return (
        <>
            <TechnoTopHeader headerItems={headerItem} />
            <div className="flex flex-col px-4 gap-4">
                <TechnoBreadCrumb />
                <TechnoPageTitle />
                <ContentRenderer />
            </div>
        </>
    );
}

function ContentRenderer() {
    const { headerActiveItem } = useTopHeaderContext();

    switch (headerActiveItem) {
        case 'All Leads':
            return <AllLeadsPage />;
        default:
            return <div>Default Page</div>;
    }

}
