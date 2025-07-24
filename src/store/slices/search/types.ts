/**
 * Search store types
 */

export interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
