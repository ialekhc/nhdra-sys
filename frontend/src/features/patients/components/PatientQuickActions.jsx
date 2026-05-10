import { Link } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { cn } from '../../../shared/utils/cn';

const ACTIONS = [
  { key: 'visits', label: 'Add Visit', to: (patientId) => `/patients/${patientId}/visits/new` },
  { key: 'clinical-record', label: 'Add Clinical Record', to: (patientId) => `/patients/${patientId}/clinical-record` },
  { key: 'lab-results', label: 'Add Lab Result', to: (patientId) => `/patients/${patientId}/lab-results` },
  { key: 'diagnosis', label: 'Add Diagnosis', to: (patientId) => `/patients/${patientId}/diagnosis` },
];

export const PatientQuickActions = ({ patientId, active, sticky = false }) => (
  <div className={cn(sticky ? 'sticky top-16 z-30 bg-[var(--bg)]/95 py-2 backdrop-blur' : '')}>
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-2 shadow-card">
      <div className="flex min-w-max gap-2">
        {ACTIONS.map((action) => (
          <Link key={action.key} to={action.to(patientId)}>
            <Button variant={active === action.key ? 'primary' : 'secondary'}>{action.label}</Button>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
