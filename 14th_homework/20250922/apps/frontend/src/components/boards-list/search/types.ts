export interface SearchProps {
  onSearch: (searchKeyword: string, startDate: Date | null, endDate: Date | null) => void;
  onReset: () => void;
}
