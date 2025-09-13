
// export const API_ROOT = import.meta.env.VITE_API_ROOT
export const API_ROOT = 'http://localhost:8080'

export const USER_ROLE = {
  PET_OWNER: 'PET_OWNER',
  VET: 'VET',
  SHELTER: 'SHELTER',
  UNDEFINED: 'UNDEFINED'
}

export const PET_SPECIES = {
  DOG: 'DOG',
  CAT: 'CAT',
  BIRD: 'BIRD'
}

export const RECORD_TYPE = {
  CHECKUP: 'CHECKUP',
  TREATMENT: 'TREATMENT',
  SURGERY: 'SURGERY',
  MEDICATION: 'MEDICATION',
  ALLERGY: 'ALLERGY',
  ILLNESS: 'ILLNESS',
  INJURY: 'INJURY',
  DENTAL: 'DENTAL',
  GROOMING: 'GROOMING',
  OTHER: 'OTHER'
}

export const VACCINE_TYPE = {
  RABIES: 'RABIES',
  DHPP: 'DHPP',
  FVRCP: 'FVRCP',
  OTHER: 'OTHER'
}

export const VACCINATION_STATUS = {
  COMPLETED: 'Completed',
  DUE_SOON: 'Due Soon',
  OVERDUE: 'Overdue',
  UPCOMING: 'Upcoming'
}
