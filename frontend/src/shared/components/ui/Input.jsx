import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';
