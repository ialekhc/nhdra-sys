const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const { corsOptions } = require('./config/cors');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { notFoundMiddleware } = require('./middlewares/notFound.middleware');

const { authRoutes } = require('./modules/auth/auth.routes');
const { userRoutes } = require('./modules/users/user.routes');
const { patientRoutes } = require('./modules/patients/patient.routes');
const { visitRoutes } = require('./modules/visits/visit.routes');
const { clinicalRecordRoutes } = require('./modules/clinical-records/clinicalRecord.routes');
const { labResultRoutes } = require('./modules/lab-results/labResult.routes');
const { diagnosisRoutes } = require('./modules/diagnoses/diagnosis.routes');
const { medicationRoutes } = require('./modules/medications/medication.routes');
const { followUpRoutes } = require('./modules/follow-ups/followUp.routes');
const { dashboardRoutes } = require('./modules/dashboard/dashboard.routes');
const { researchRoutes } = require('./modules/research/research.routes');
const { reportRoutes } = require('./modules/reports/report.routes');
const { settingRoutes } = require('./modules/settings/setting.routes');
const { auditLogRoutes } = require('./modules/audit-logs/auditLog.routes');

const app = express();
const backendRoot = path.resolve(__dirname, '..');

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.use('/uploads', express.static(path.join(backendRoot, 'uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/visits', visitRoutes);
app.use('/api/v1/clinical-records', clinicalRecordRoutes);
app.use('/api/v1/lab-results', labResultRoutes);
app.use('/api/v1/diagnoses', diagnosisRoutes);
app.use('/api/v1/medications', medicationRoutes);
app.use('/api/v1/follow-ups', followUpRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/research', researchRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/audit-logs', auditLogRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = { app };
