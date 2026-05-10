import { Toaster } from 'sonner';

export const AppProviders = ({ children }) => (
  <>
    {children}
    <Toaster richColors position="top-right" />
  </>
);
