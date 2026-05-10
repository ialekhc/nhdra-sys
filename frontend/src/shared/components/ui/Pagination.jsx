import { Button } from './Button';

export const Pagination = ({ page = 1, totalPages = 1, onPageChange }) => (
  <div className="mt-4 flex items-center justify-end gap-2">
    <Button variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
      Previous
    </Button>
    <span className="text-sm text-slate-600">
      Page {page} of {totalPages}
    </span>
    <Button variant="secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
      Next
    </Button>
  </div>
);
