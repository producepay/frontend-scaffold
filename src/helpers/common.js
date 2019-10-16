export const textSearchCompare = (search, text) =>
  !search || text.toLowerCase().includes(search.toLowerCase());
