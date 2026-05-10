import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button = ({ className, variant = 'primary', type = 'button', ...props }) => (
  <button
    type={type}
    className={cn(
      'rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
      variants[variant],
      className
    )}
    {...props}
  />
);
