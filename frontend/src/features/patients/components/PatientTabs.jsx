import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { label: 'Overview', key: 'overview' },
  { label: 'Visits', key: 'visits' },
  { label: 'Clinical Records', key: 'clinical-record' },
  { label: 'Lab Results', key: 'lab-results' },
  { label: 'Diagnosis & Treatment', key: 'diagnosis' },
  { label: 'Medications', key: 'medications' },
  { label: 'Follow-ups', key: 'follow-ups' },
];

export const PatientTabs = ({ patientId }) => {
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const href = tab.key === 'overview' ? `/patients/${patientId}` : `/patients/${patientId}/${tab.key}`;
        const active = location.pathname === href;

        return (
          <Link
            key={tab.key}
            to={href}
            className={`rounded-md px-3 py-1.5 text-sm ${
              active ? 'bg-brand-100 text-brand-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};
