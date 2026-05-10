import { ROLES } from '../constants/roles';

export const APP_ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  REGISTER_PATIENT: '/patients/register',
  FOLLOW_UPS: '/follow-ups',
  RESEARCH_DATA: '/research-data',
  REPORTS: '/reports',
  USERS: '/users',
  SETTINGS: '/settings',
  AUDIT_LOGS: '/audit-logs',
  UNAUTHORIZED: '/unauthorized',
};

export const SIDEBAR_ITEMS = [
  { label: 'Dashboard', to: APP_ROUTES.DASHBOARD, roles: Object.values(ROLES) },
  { label: 'Patients', to: APP_ROUTES.PATIENTS, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF] },
  { label: 'Register Patient', to: APP_ROUTES.REGISTER_PATIENT, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF] },
  { label: 'Follow-ups', to: APP_ROUTES.FOLLOW_UPS, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF] },
  { label: 'Research Data', to: APP_ROUTES.RESEARCH_DATA, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.RESEARCH_ADMIN] },
  { label: 'Reports', to: APP_ROUTES.REPORTS, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR] },
  { label: 'Users', to: APP_ROUTES.USERS, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
  { label: 'Settings', to: APP_ROUTES.SETTINGS, roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
  { label: 'Audit Logs', to: APP_ROUTES.AUDIT_LOGS, roles: [ROLES.SUPER_ADMIN] },
];
