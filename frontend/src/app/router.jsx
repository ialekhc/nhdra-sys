import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../shared/components/layout/AuthLayout';
import { MainLayout } from '../shared/components/layout/MainLayout';
import { useAuthStore } from '../features/auth/store/authStore';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { PatientsPage } from '../features/patients/pages/PatientsPage';
import { RegisterPatientPage } from '../features/patients/pages/RegisterPatientPage';
import { PatientProfilePage } from '../features/patients/pages/PatientProfilePage';
import { EditPatientPage } from '../features/patients/pages/EditPatientPage';
import { VisitListPage } from '../features/visits/pages/VisitListPage';
import { VisitFormPage } from '../features/visits/pages/VisitFormPage';
import { ClinicalRecordPage } from '../features/clinical-records/pages/ClinicalRecordPage';
import { LabResultsPage } from '../features/lab-results/pages/LabResultsPage';
import { DiagnosisPage } from '../features/diagnoses/pages/DiagnosisPage';
import { FollowUpsPage } from '../features/follow-ups/pages/FollowUpsPage';
import { ResearchDataPage } from '../features/research/pages/ResearchDataPage';
import { ReportsPage } from '../features/reports/pages/ReportsPage';
import { UsersPage } from '../features/users/pages/UsersPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';
import { AuditLogsPage } from '../features/audit-logs/pages/AuditLogsPage';
import { ROLES } from '../constants/roles';

const ProtectedRoute = ({ children, roles }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const UnauthorizedPage = () => (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
    <h1 className="text-lg font-semibold">Unauthorized</h1>
    <p className="text-sm">You do not have access to this page.</p>
  </div>
);

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <h1 className="mb-3 text-xl font-bold text-slate-900">Profile</h1>
      <p className="text-sm">Name: {user?.name}</p>
      <p className="text-sm">Email: {user?.email}</p>
      <p className="text-sm">Role: {user?.role}</p>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/patients',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <PatientsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/register',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF]}>
            <RegisterPatientPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <PatientProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/edit',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF]}>
            <EditPatientPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/visits',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <VisitListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/visits/new',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <VisitFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/visits/:visitId',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <VisitListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/clinical-record',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <ClinicalRecordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/lab-results',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <LabResultsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/diagnosis',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR]}>
            <DiagnosisPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/medications',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR]}>
            <DiagnosisPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/patients/:id/follow-ups',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <FollowUpsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/follow-ups',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]}>
            <FollowUpsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/research-data',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.RESEARCH_ADMIN]}>
            <ResearchDataPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/reports',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR]}>
            <ReportsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/audit-logs',
        element: (
          <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
            <AuditLogsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/unauthorized',
        element: <UnauthorizedPage />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);
