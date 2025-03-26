'use client';

import AdmissionBreadCrumb from '../custom-ui/admission-breadcrumb/admission-breadcrumb';
import {
  AdmissionHeaderProvider,
  useTopHeaderContext
} from '../custom-ui/admission-top-header/admission-header-context';
import AdmissionTopHeader from '../custom-ui/admission-top-header/admission-top-header';
import EnquiryForm from '../custom-ui/enquiry-forms/EnquiryForm';
import AdmissionPageTitle from '../custom-ui/page-title/admission-page-title';

const headerItem = [{ title: 'Application Process' }];

export default function AdmissionLayout() {
  return (
    <AdmissionHeaderProvider>
      <AdmissionContent />
    </AdmissionHeaderProvider>
  );
}

function AdmissionContent() {
  return (
    <>
      <AdmissionTopHeader headerItems={headerItem} />
      <div className="flex flex-col px-4 gap-4">
        <AdmissionBreadCrumb />
        <AdmissionPageTitle />
        <ContentRenderer />
      </div>
    </>
  );
}

function ContentRenderer() {
  const { headerActiveItem } = useTopHeaderContext();

  switch (headerActiveItem) {
    case 'Application Process':
      return <EnquiryForm />;
    default:
      return <div>Default Page</div>;
  }
}
