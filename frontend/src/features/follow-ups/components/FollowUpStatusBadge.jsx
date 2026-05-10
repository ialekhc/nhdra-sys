import { Badge } from '../../../shared/components/ui/Badge';

export const FollowUpStatusBadge = ({ status, overdue }) => {
  if (overdue) {
    return <Badge variant="danger">Overdue</Badge>;
  }

  const variant =
    status === 'Completed'
      ? 'success'
      : status === 'Pending'
        ? 'warning'
        : status === 'Missed' || status === 'Lost to follow-up'
          ? 'danger'
          : 'info';

  return <Badge variant={variant}>{status}</Badge>;
};
