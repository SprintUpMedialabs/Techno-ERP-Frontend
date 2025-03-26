import { createContext, useContext, useState } from 'react';

const AdmissionTopHeaderContext = createContext({
  headerActiveItem: '',
  setHeaderActiveItem: (item: string) => {}
});

export function AdmissionHeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerActiveItem, setHeaderActiveItem] = useState('Application Process');

  return (
    <AdmissionTopHeaderContext.Provider value={{ headerActiveItem, setHeaderActiveItem }}>
      {children}
    </AdmissionTopHeaderContext.Provider>
  );
}

export function useTopHeaderContext() {
  return useContext(AdmissionTopHeaderContext);
}
