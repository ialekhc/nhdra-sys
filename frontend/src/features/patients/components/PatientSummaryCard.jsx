import { formatDate } from '../../../shared/utils/formatDate';

export const PatientSummaryCard = ({ patient, latestRiskLevel, lastVisitDate, nextFollowUpDate }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
    <div className="grid gap-3 text-sm md:grid-cols-4">
      <div>
        <p className="text-slate-500">Patient ID</p>
        <p className="font-semibold text-slate-900">{patient?.patientId || '-'}</p>
      </div>
      <div>
        <p className="text-slate-500">Full Name</p>
        <p className="font-semibold text-slate-900">{patient?.fullName || '-'}</p>
      </div>
      <div>
        <p className="text-slate-500">Latest Risk</p>
        <p className="font-semibold text-slate-900">{latestRiskLevel || '-'}</p>
      </div>
      <div>
        <p className="text-slate-500">Last Visit</p>
        <p className="font-semibold text-slate-900">{formatDate(lastVisitDate)}</p>
      </div>
      <div>
        <p className="text-slate-500">Next Follow-up</p>
        <p className="font-semibold text-slate-900">{formatDate(nextFollowUpDate)}</p>
      </div>
    </div>
  </div>
);
