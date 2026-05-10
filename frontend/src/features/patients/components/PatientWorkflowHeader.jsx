import { PatientQuickActions } from './PatientQuickActions';

export const PatientWorkflowHeader = ({ patient, active }) => (
  <div className="sticky top-16 z-30 space-y-2 bg-[var(--bg)]/95 py-2 backdrop-blur">
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-card">
      <h2 className="text-lg font-bold text-slate-900">{patient?.fullName || 'Patient'}</h2>
      <p className="text-sm text-slate-600">
        {patient?.patientId || '-'} • {patient?.gender || '-'} • {patient?.age ?? '-'} years • {patient?.phone || '-'}
      </p>
    </div>
    <PatientQuickActions patientId={patient?._id} active={active} />
  </div>
);
