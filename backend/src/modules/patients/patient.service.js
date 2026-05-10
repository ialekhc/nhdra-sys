const ApiError = require('../../utils/ApiError');
const { getPagination } = require('../../utils/pagination');
const { generatePatientId } = require('../../utils/generatePatientId');
const { generateResearchId } = require('../../utils/generateResearchId');
const {
  listPatients,
  countPatients,
  findPatientById,
  findPatientByActiveNamePhone,
  createPatient,
  updatePatientById,
  deletePatientById,
} = require('./patient.repository');

const resolvePatientSort = (query) => {
  const allowedSortFields = ['createdAt', 'patientId', 'phone', 'fullName'];
  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

  if (sortBy === 'createdAt') {
    return { createdAt: sortOrder };
  }

  return { [sortBy]: sortOrder, createdAt: -1 };
};

const getPatientsService = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};
  const sort = resolvePatientSort(query);

  if (query.status) filter.status = query.status;

  if (query.search) {
    const search = query.search.trim();
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { patientId: { $regex: search, $options: 'i' } },
      { researchId: { $regex: search, $options: 'i' } },
    ];
  }

  const { items, total } = await listPatients(filter, { limit, skip, sort });

  return {
    patients: items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const createPatientService = async (payload, actorId) => {
  const existing = await findPatientByActiveNamePhone(payload.fullName, payload.phone);
  if (existing) {
    throw new ApiError(409, 'Duplicate active patient exists with same full name and phone');
  }

  const total = await countPatients();

  return createPatient({
    ...payload,
    patientId: generatePatientId(total),
    researchId: generateResearchId(total),
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const getPatientByIdService = async (id) => {
  const patient = await findPatientById(id);
  if (!patient) throw new ApiError(404, 'Patient not found');
  return patient;
};

const updatePatientService = async (id, payload, actorId) => {
  const patient = await findPatientById(id);
  if (!patient) throw new ApiError(404, 'Patient not found');

  if (payload.fullName || payload.phone) {
    const fullName = payload.fullName || patient.fullName;
    const phone = payload.phone || patient.phone;

    const duplicate = await findPatientByActiveNamePhone(fullName, phone);
    if (duplicate && String(duplicate._id) !== String(id)) {
      throw new ApiError(409, 'Another active patient exists with the same full name and phone');
    }
  }

  return updatePatientById(id, { ...payload, updatedBy: actorId });
};

const archivePatientService = async (id, actorId) => {
  const patient = await findPatientById(id);
  if (!patient) throw new ApiError(404, 'Patient not found');

  if (patient.status === 'archived') return patient;

  return updatePatientById(id, {
    status: 'archived',
    archivedAt: new Date(),
    archivedBy: actorId,
    updatedBy: actorId,
  });
};

const hardDeletePatientService = async (id, actorRole) => {
  if (!['SUPER_ADMIN', 'ADMIN'].includes(actorRole)) {
    throw new ApiError(403, 'Only SUPER_ADMIN or ADMIN can permanently delete patient records');
  }

  const patient = await findPatientById(id);
  if (!patient) throw new ApiError(404, 'Patient not found');

  await deletePatientById(id);
  return true;
};

const searchPatientsService = async (query) => {
  const filter = {
    status: 'active',
    $or: [
      { fullName: { $regex: query, $options: 'i' } },
      { phone: { $regex: query, $options: 'i' } },
      { patientId: { $regex: query, $options: 'i' } },
      { researchId: { $regex: query, $options: 'i' } },
    ],
  };

  const { items } = await listPatients(filter, { skip: 0, limit: 20 });
  return items;
};

module.exports = {
  getPatientsService,
  createPatientService,
  getPatientByIdService,
  updatePatientService,
  archivePatientService,
  hardDeletePatientService,
  searchPatientsService,
};
