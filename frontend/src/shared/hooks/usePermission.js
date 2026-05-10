import { useRole } from './useRole';

export const usePermission = (allowedRoles = []) => {
  const role = useRole();
  if (!role) return false;
  return allowedRoles.includes(role);
};
