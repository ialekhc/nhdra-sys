const { connectDb } = require('../config/db');
const { User } = require('../modules/users/user.model');
const { Patient } = require('../modules/patients/patient.model');
const { generatePatientId } = require('../utils/generatePatientId');
const { generateResearchId } = require('../utils/generateResearchId');

const dummyPatients = [
  {
    fullName: 'Sita Sharma',
    age: 58,
    gender: 'Female',
    phone: '9801000001',
    address: 'Maitidevi',
    district: 'Kathmandu',
    province: 'Bagmati',
    occupation: 'Teacher',
    maritalStatus: 'Married',
    emergencyContactName: 'Ramesh Sharma',
    emergencyContactPhone: '9802000001',
    referredBy: 'Local Clinic',
    treatmentConsent: true,
    researchConsent: true,
    status: 'active',
  },
  {
    fullName: 'Hari Prasad Karki',
    age: 64,
    gender: 'Male',
    phone: '9801000002',
    address: 'Balkumari',
    district: 'Lalitpur',
    province: 'Bagmati',
    occupation: 'Retired',
    maritalStatus: 'Married',
    emergencyContactName: 'Mina Karki',
    emergencyContactPhone: '9802000002',
    referredBy: 'Cardiac Camp',
    treatmentConsent: true,
    researchConsent: false,
    status: 'active',
  },
  {
    fullName: 'Ramila Gurung',
    age: 52,
    gender: 'Female',
    phone: '9801000003',
    address: 'Pokhara-8',
    district: 'Kaski',
    province: 'Gandaki',
    occupation: 'Business',
    maritalStatus: 'Married',
    emergencyContactName: 'Bikash Gurung',
    emergencyContactPhone: '9802000003',
    referredBy: 'Endocrine OPD',
    treatmentConsent: true,
    researchConsent: true,
    status: 'active',
  },
  {
    fullName: 'Dinesh Bhandari',
    age: 47,
    gender: 'Male',
    phone: '9801000004',
    address: 'Dharan-5',
    district: 'Sunsari',
    province: 'Koshi',
    occupation: 'Bank Staff',
    maritalStatus: 'Married',
    emergencyContactName: 'Nisha Bhandari',
    emergencyContactPhone: '9802000004',
    referredBy: 'General Physician',
    treatmentConsent: true,
    researchConsent: false,
    status: 'active',
  },
  {
    fullName: 'Kamala Devi Yadav',
    age: 61,
    gender: 'Female',
    phone: '9801000005',
    address: 'Janakpur-4',
    district: 'Dhanusha',
    province: 'Madhesh',
    occupation: 'Homemaker',
    maritalStatus: 'Married',
    emergencyContactName: 'Suresh Yadav',
    emergencyContactPhone: '9802000005',
    referredBy: 'District Hospital',
    treatmentConsent: true,
    researchConsent: true,
    status: 'active',
  },
  {
    fullName: 'Milan Thapa',
    age: 39,
    gender: 'Male',
    phone: '9801000006',
    address: 'Butwal-11',
    district: 'Rupandehi',
    province: 'Lumbini',
    occupation: 'IT Professional',
    maritalStatus: 'Single',
    emergencyContactName: 'Gita Thapa',
    emergencyContactPhone: '9802000006',
    referredBy: 'Emergency Unit',
    treatmentConsent: true,
    researchConsent: false,
    status: 'active',
  },
  {
    fullName: 'Pema Lama',
    age: 55,
    gender: 'Female',
    phone: '9801000007',
    address: 'Hetauda-2',
    district: 'Makwanpur',
    province: 'Bagmati',
    occupation: 'Shop Owner',
    maritalStatus: 'Married',
    emergencyContactName: 'Dorje Lama',
    emergencyContactPhone: '9802000007',
    referredBy: 'Community Outreach',
    treatmentConsent: true,
    researchConsent: true,
    status: 'active',
  },
  {
    fullName: 'Abhinav Khatri',
    age: 43,
    gender: 'Male',
    phone: '9801000008',
    address: 'Nepalgunj-12',
    district: 'Banke',
    province: 'Lumbini',
    occupation: 'Driver',
    maritalStatus: 'Married',
    emergencyContactName: 'Sushila Khatri',
    emergencyContactPhone: '9802000008',
    referredBy: 'Walk-in',
    treatmentConsent: true,
    researchConsent: false,
    status: 'active',
  },
];

const getUniqueIds = async (sequenceRef) => {
  while (true) {
    const patientId = generatePatientId(sequenceRef.value);
    const researchId = generateResearchId(sequenceRef.value);
    sequenceRef.value += 1;

    const exists = await Patient.exists({
      $or: [{ patientId }, { researchId }],
    });

    if (!exists) {
      return { patientId, researchId };
    }
  }
};

const seedDummyPatients = async () => {
  await connectDb();

  const actor = await User.findOne({ role: 'SUPER_ADMIN' });
  const sequenceRef = { value: await Patient.countDocuments({}) };

  let created = 0;
  let skipped = 0;

  for (const item of dummyPatients) {
    const duplicate = await Patient.findOne({
      fullName: item.fullName,
      phone: item.phone,
      status: 'active',
    });

    if (duplicate) {
      skipped += 1;
      continue;
    }

    const { patientId, researchId } = await getUniqueIds(sequenceRef);

    await Patient.create({
      ...item,
      patientId,
      researchId,
      createdBy: actor?._id,
      updatedBy: actor?._id,
    });

    created += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`Dummy patients seed complete. Created: ${created}, Skipped: ${skipped}`);
  process.exit(0);
};

seedDummyPatients().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to seed dummy patients', error);
  process.exit(1);
});
