import { Link } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { PatientQuickActions } from './PatientQuickActions';

export const PatientProfileHeader = ({
  patient,
  canManagePatient = false,
  onDeletePatient,
  onPrintReport,
  deleting = false,
  printing = false,
}) => (
  <div className="space-y-3">
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{patient.fullName}</h1>
          <p className="text-sm text-slate-600">
            {patient.patientId} • {patient.gender} • {patient.age || '-'} years • {patient.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onPrintReport} disabled={printing}>
            {printing ? 'Preparing Report...' : 'Print Overall Report'}
          </Button>
          {canManagePatient ? (
            <>
              <Link to={`/patients/${patient._id}/edit`}>
                <Button variant="secondary">Edit Patient</Button>
              </Link>
              <Button variant="danger" onClick={onDeletePatient} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete Patient'}
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
    <PatientQuickActions patientId={patient._id} />
  </div>
);
