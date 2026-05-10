const ApiError = require('../../utils/ApiError');
const { getPagination } = require('../../utils/pagination');
const { Patient } = require('../patients/patient.model');
const {
  createFollowUp,
  listFollowUps,
  findFollowUpById,
  findFollowUpsByPatient,
  updateFollowUpById,
} = require('./followUp.repository');

const addOverdueFlag = (items) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return items.map((item) => {
    const overdue = item.status === 'Pending' && new Date(item.followUpDate) < todayStart;
    return {
      ...item.toObject(),
      overdue,
    };
  });
};

const getFollowUpsService = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};

  if (query.status) filter.status = query.status;

  const { items, total } = await listFollowUps(filter, { skip, limit });

  return {
    followUps: addOverdueFlag(items),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const createFollowUpService = async (payload, actorId) => {
  const patient = await Patient.findById(payload.patient);
  if (!patient) throw new ApiError(404, 'Patient not found');

  return createFollowUp({ ...payload, createdBy: actorId, updatedBy: actorId });
};

const getTodayFollowUpsService = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const { items } = await listFollowUps({ followUpDate: { $gte: start, $lt: end } });
  return addOverdueFlag(items);
};

const getMissedFollowUpsService = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { items } = await listFollowUps({
    followUpDate: { $lt: todayStart },
    status: { $in: ['Pending', 'Missed'] },
  });

  return addOverdueFlag(items);
};

const getFollowUpsByPatientService = async (patientId) => {
  const items = await findFollowUpsByPatient(patientId);
  return addOverdueFlag(items);
};

const updateFollowUpService = async (id, payload, actorId) => {
  const followUp = await findFollowUpById(id);
  if (!followUp) throw new ApiError(404, 'Follow-up not found');

  return updateFollowUpById(id, { ...payload, updatedBy: actorId });
};

const updateFollowUpStatusService = async (id, status, actorId) => {
  const followUp = await findFollowUpById(id);
  if (!followUp) throw new ApiError(404, 'Follow-up not found');

  return updateFollowUpById(id, { status, updatedBy: actorId });
};

module.exports = {
  getFollowUpsService,
  createFollowUpService,
  getTodayFollowUpsService,
  getMissedFollowUpsService,
  getFollowUpsByPatientService,
  updateFollowUpService,
  updateFollowUpStatusService,
};
