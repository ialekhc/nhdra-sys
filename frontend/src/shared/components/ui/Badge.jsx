import { cn } from '../../utils/cn';

const variants = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-cyan-100 text-cyan-700',
};

export const Badge = ({ children, variant = 'default' }) => (
  <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', variants[variant])}>{children}</span>
);
