const { Patient } = require('./patient.model');

const listPatients = async (filter, options) => {
  const [items, total] = await Promise.all([
    Patient.find(filter)
      .sort({ createdAt: -1 })
      .skip(options.skip)
      .limit(options.limit),
    Patient.countDocuments(filter),
  ]);

  return { items, total };
};

const countPatients = () => Patient.countDocuments({});

const findPatientById = (id) => Patient.findById(id);

const findPatientByActiveNamePhone = (fullName, phone) =>
  Patient.findOne({
    fullName: fullName.trim(),
    phone: phone.trim(),
    status: 'active',
  });

const createPatient = (payload) => Patient.create(payload);

const updatePatientById = (id, payload) => Patient.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deletePatientById = (id) => Patient.findByIdAndDelete(id);

module.exports = {
  listPatients,
  countPatients,
  findPatientById,
  findPatientByActiveNamePhone,
  createPatient,
  updatePatientById,
  deletePatientById,
};
