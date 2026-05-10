const ApiError = require('../../utils/ApiError');
const { getPagination } = require('../../utils/pagination');
const { Patient } = require('../patients/patient.model');
const {
  listVisits,
  countVisits,
  createVisit,
  findVisitById,
  listVisitsByPatient,
  updateVisitById,
} = require('./visit.repository');

const generateVisitId = (count) => {
  const year = new Date().getFullYear();
  return `VIS-${year}-${String(count + 1).padStart(6, '0')}`;
};

const getVisitsService = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.patientId) filter.patient = query.patientId;
  if (query.visitType) filter.visitType = query.visitType;

  const { items, total } = await listVisits(filter, { skip, limit });

  return {
    visits: items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const createVisitService = async (payload, actorId) => {
  const patient = await Patient.findById(payload.patient);
  if (!patient || patient.status !== 'active') {
    throw new ApiError(404, 'Active patient not found');
  }

  const count = await countVisits();

  return createVisit({
    ...payload,
    visitId: generateVisitId(count),
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const getVisitByIdService = async (id) => {
  const visit = await findVisitById(id);
  if (!visit) throw new ApiError(404, 'Visit not found');
  return visit;
};

const getPatientVisitsService = async (patientId) => listVisitsByPatient(patientId);

const updateVisitService = async (id, payload, actorId) => {
  const visit = await findVisitById(id);
  if (!visit) throw new ApiError(404, 'Visit not found');

  return updateVisitById(id, { ...payload, updatedBy: actorId });
};

const updateVisitStatusService = async (id, status, actorId) => {
  const visit = await findVisitById(id);
  if (!visit) throw new ApiError(404, 'Visit not found');

  return updateVisitById(id, { status, updatedBy: actorId });
};

module.exports = {
  getVisitsService,
  createVisitService,
  getVisitByIdService,
  getPatientVisitsService,
  updateVisitService,
  updateVisitStatusService,
};
