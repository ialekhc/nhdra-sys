const PATIENT_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
};

const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const VISIT_STATUS = {
  OPEN: 'Open',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const VISIT_TYPES = ['New', 'Follow-up', 'Camp', 'Charity', 'Emergency'];

const FOLLOWUP_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  MISSED: 'Missed',
  RESCHEDULED: 'Rescheduled',
  LOST: 'Lost to follow-up',
};

module.exports = {
  PATIENT_STATUS,
  USER_STATUS,
  VISIT_STATUS,
  VISIT_TYPES,
  FOLLOWUP_STATUS,
};
