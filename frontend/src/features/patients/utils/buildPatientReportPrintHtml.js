const safeText = (value) => {
  if (value === undefined || value === null || value === '') return '-';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const formatDateValue = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString();
};

const formatList = (value) => {
  if (!Array.isArray(value) || value.length === 0) return '-';
  return value.join(', ');
};

const renderTable = (title, columns, rows) => {
  const headerCells = columns.map((column) => `<th>${safeText(column.label)}</th>`).join('');
  const bodyRows =
    rows.length === 0
      ? `<tr><td colspan="${columns.length}" class="empty">No records</td></tr>`
      : rows
          .map((row) => {
            const cells = columns
              .map((column) => {
                const value = typeof column.render === 'function' ? column.render(row) : row[column.key];
                return `<td>${safeText(value)}</td>`;
              })
              .join('');
            return `<tr>${cells}</tr>`;
          })
          .join('');

  return `
    <section class="section">
      <h3>${safeText(title)}</h3>
      <table>
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </section>
  `;
};

export const buildPatientReportPrintHtml = ({ report, snapshotId, savedAt }) => {
  const patient = report?.patient || {};
  const visits = report?.visits || [];
  const clinicalRecords = report?.clinicalRecords || [];
  const labResults = report?.labResults || [];
  const diagnoses = report?.diagnoses || [];
  const medications = report?.medications || [];
  const followUps = report?.followUps || [];
  const totals = report?.meta?.totals || {};

  const visitsTable = renderTable(
    'Visit History',
    [
      { label: 'Visit Date', render: (row) => formatDateValue(row.visitDate) },
      { label: 'Visit Type', key: 'visitType' },
      { label: 'Chief Complaint', key: 'chiefComplaint' },
      { label: 'Assigned Doctor', render: (row) => row.assignedDoctor?.name || '-' },
      { label: 'Status', key: 'status' },
    ],
    visits
  );

  const clinicalTable = renderTable(
    'Clinical Records',
    [
      { label: 'Record Date', render: (row) => formatDateValue(row.createdAt) },
      { label: 'BMI', render: (row) => (row.bmi ? `${row.bmi} (${row.bmiCategory || '-'})` : '-') },
      { label: 'Blood Pressure', render: (row) => `${row.systolicBP || '-'} / ${row.diastolicBP || '-'}` },
      { label: 'BP Category', key: 'bpCategory' },
      { label: 'Pulse', key: 'pulse' },
      { label: 'Diabetes Status', key: 'diabetesStatus' },
    ],
    clinicalRecords
  );

  const labTable = renderTable(
    'Lab Results',
    [
      { label: 'Test Date', render: (row) => formatDateValue(row.testDate) },
      { label: 'Fasting Glucose', key: 'fastingGlucose' },
      { label: 'HbA1c', key: 'hba1c' },
      { label: 'LDL', key: 'ldl' },
      { label: 'HDL', key: 'hdl' },
      { label: 'Serum Creatinine', key: 'serumCreatinine' },
      { label: 'eGFR', key: 'egfr' },
    ],
    labResults
  );

  const diagnosisTable = renderTable(
    'Diagnosis & Treatment',
    [
      { label: 'Date', render: (row) => formatDateValue(row.createdAt) },
      { label: 'Diagnosis', render: (row) => formatList(row.diagnosisList) },
      { label: 'Risk Level', key: 'riskLevel' },
      { label: 'Treatment Plan', key: 'treatmentPlan' },
      { label: 'Outcome', key: 'outcome' },
      { label: 'Next Follow-up', render: (row) => formatDateValue(row.nextFollowUpDate) },
    ],
    diagnoses
  );

  const medicationTable = renderTable(
    'Medications',
    [
      { label: 'Date', render: (row) => formatDateValue(row.createdAt) },
      { label: 'Drug Name', key: 'drugName' },
      { label: 'Dose', key: 'dose' },
      { label: 'Frequency', key: 'frequency' },
      { label: 'Duration', key: 'duration' },
      { label: 'Prescribed By', render: (row) => row.prescribedBy?.name || '-' },
    ],
    medications
  );

  const followUpTable = renderTable(
    'Follow-ups',
    [
      { label: 'Follow-up Date', render: (row) => formatDateValue(row.followUpDate) },
      { label: 'Status', key: 'status' },
      { label: 'Patient Response', key: 'patientResponse' },
      { label: 'Next Action', key: 'nextAction' },
      { label: 'Call Date', render: (row) => formatDateValue(row.callDate) },
    ],
    followUps
  );

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Patient Report - ${safeText(patient.fullName || patient.patientId || 'Patient')}</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
        }
        h1, h2, h3 { margin: 0; }
        .header {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 14px;
        }
        .subtle { color: #475569; font-size: 12px; margin-top: 6px; }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-top: 12px;
          font-size: 12px;
        }
        .meta-card {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px;
          background: #f8fafc;
        }
        .meta-card .label {
          color: #475569;
          font-size: 11px;
          display: block;
          margin-bottom: 2px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          margin-top: 10px;
          margin-bottom: 8px;
        }
        .summary-pill {
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 11px;
          text-align: center;
          background: #f8fafc;
        }
        .section { margin-top: 12px; }
        .section h3 {
          margin-bottom: 8px;
          font-size: 14px;
          color: #0f172a;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 6px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background: #f1f5f9;
          font-weight: 600;
        }
        .empty {
          text-align: center;
          color: #64748b;
        }
        @media print {
          body { padding: 0; }
          .header { break-inside: avoid; }
          .section { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Cardio-Diabetic Patient Overall Report</h1>
        <div class="subtle">Snapshot ID: ${safeText(snapshotId)} | Saved: ${safeText(formatDateValue(savedAt))}</div>
        <div class="meta-grid">
          <div class="meta-card"><span class="label">Patient ID</span>${safeText(patient.patientId)}</div>
          <div class="meta-card"><span class="label">Full Name</span>${safeText(patient.fullName)}</div>
          <div class="meta-card"><span class="label">Age</span>${safeText(patient.age)}</div>
          <div class="meta-card"><span class="label">Gender</span>${safeText(patient.gender)}</div>
          <div class="meta-card"><span class="label">Phone</span>${safeText(patient.phone)}</div>
          <div class="meta-card"><span class="label">District</span>${safeText(patient.district)}</div>
          <div class="meta-card"><span class="label">Province</span>${safeText(patient.province)}</div>
          <div class="meta-card"><span class="label">Research ID</span>${safeText(patient.researchId)}</div>
        </div>
        <div class="summary-grid">
          <div class="summary-pill">Visits: ${safeText(totals.visits || 0)}</div>
          <div class="summary-pill">Clinical Records: ${safeText(totals.clinicalRecords || 0)}</div>
          <div class="summary-pill">Lab Results: ${safeText(totals.labResults || 0)}</div>
          <div class="summary-pill">Diagnoses: ${safeText(totals.diagnoses || 0)}</div>
          <div class="summary-pill">Follow-ups: ${safeText(totals.followUps || 0)}</div>
        </div>
      </div>
      ${visitsTable}
      ${clinicalTable}
      ${labTable}
      ${diagnosisTable}
      ${medicationTable}
      ${followUpTable}
    </body>
  </html>
  `;
};
