export function hasMorePages(page: number, limit: number, total: number) {
  if (limit === -1) {
    return false;
  }

  return (page + 1) * limit < total;
}
