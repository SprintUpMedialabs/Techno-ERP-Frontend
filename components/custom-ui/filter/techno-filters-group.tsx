import { Button } from '@/components/ui/button';
import TechnoFilter from './techno-filter';

interface FilterConfig {
  filterKey: string;
  options?: string[];
  hasSearch?: boolean;
  multiSelect?: boolean;
  isDateFilter?: boolean;
}

interface TechnoFilterGroupsProps {
  filters: FilterConfig[];
  handleFilters: () => void;
}

export default function TechnoFiltersGroup({ filters, handleFilters }: TechnoFilterGroupsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <TechnoFilter
          key={filter.filterKey}
          filterKey={filter.filterKey}
          options={filter.options}
          hasSearch={filter.hasSearch}
          multiSelect={filter.multiSelect}
          isDateFilter={filter.isDateFilter}
        />
      ))}
      <Button onClick={handleFilters}>Apply Filters</Button>
    </div>
  );
}
