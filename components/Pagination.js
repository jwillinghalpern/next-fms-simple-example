import Button from './Button';

export default function Pagination({
  page,
  totalItems,
  itemsPerPage,
  onFirst,
  onLast,
  onNext,
  onPrev,
}) {
  page = page || 1;
  totalItems = totalItems || 1;
  itemsPerPage = itemsPerPage || 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <Button color="link" onClick={onFirst} disabled={page <= 1}>
        ← First
      </Button>
      <Button color="link" onClick={onPrev} disabled={page <= 1}>
        ← Prev
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button color="link" onClick={onNext} disabled={page >= totalPages}>
        Next →
      </Button>
      <Button color="link" onClick={onLast} disabled={page >= totalPages}>
        Last →
      </Button>
    </div>
  );
}
