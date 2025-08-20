
import type { Hospital, Doctor, Test } from '../types';

export const hospitals: Hospital[] = [
  { 
    id: 1, 
    name: 'Square Hospitals Ltd.', 
    location: 'Panthapath, Dhaka',
    description: 'A leading private hospital in Bangladesh, known for its state-of-the-art facilities and comprehensive healthcare services.',
    contact: '+880-2-8159457',
    website: 'https://www.squarehospital.com',
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Gynecology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/14b8a6/ffffff?text=Square+Hospitals',
  },
  { 
    id: 2, 
    name: 'Evercare Hospital Dhaka', 
    location: 'Bashundhara, Dhaka',
    description: 'A part of Evercare Group, it offers world-class tertiary care with a focus on patient safety and quality.',
    contact: '+880-2-8431661',
    website: 'https://www.evercarebd.com',
    specialties: ['Orthopedics', 'Pediatrics', 'Cardiology', 'Transplants'],
    imageUrl: 'https://via.placeholder.com/400x250.png/3b82f6/ffffff?text=Evercare+Hospital',
  },
  { 
    id: 3, 
    name: 'United Hospital Limited', 
    location: 'Gulshan, Dhaka',
    description: 'A multi-disciplinary hospital that provides comprehensive health care with the latest medical, surgical and diagnostic facilities.',
    contact: '+880-2-8836000',
    website: 'https://www.uhlbd.com',
    specialties: ['Dermatology', 'Urology', 'Endocrinology', 'Neurology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/0f766e/ffffff?text=United+Hospital',
  },
  { 
    id: 4, 
    name: 'Labaid Specialized Hospital', 
    location: 'Dhanmondi, Dhaka',
    description: 'A renowned hospital in Bangladesh, especially for its cardiac care and diagnostic services.',
    contact: '+880-2-9676356',
    website: 'https://labaidgroup.com/specialized',
    specialties: ['Cardiology', 'Gastroenterology', 'Pulmonology', 'Nephrology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/ef4444/ffffff?text=Labaid+Hospital',
  },
  { 
    id: 5, 
    name: 'Green Life Hospital', 
    location: 'Green Road, Dhaka',
    description: 'A patient-centric hospital providing a wide range of medical services with a team of experienced consultants.',
    contact: '+880-2-9612345',
    website: 'https://www.greenlifehospital.com.bd',
    specialties: ['Medicine', 'Surgery', 'Radiology', 'Pathology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/22c55e/ffffff?text=Green+Life+Hospital',
  },
  { 
    id: 6, 
    name: 'Ibn Sina Specialized Hospital', 
    location: 'Dhanmondi, Dhaka',
    description: 'A well-known hospital providing comprehensive medical services with modern technology and a commitment to quality.',
    contact: '+880-2-9128835',
    website: 'https://www.ibnsinatrust.com',
    specialties: ['Urology', 'Oncology', 'Pediatrics', 'Internal Medicine'],
    imageUrl: 'https://via.placeholder.com/400x250.png/f97315/ffffff?text=Ibn+Sina+Hospital',
  },
];

export const doctors: Doctor[] = [
  // Square Hospitals Ltd.
  { id: 101, hospitalId: 1, name: 'Dr. A. B. M. Abdullah', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1500 },
  { id: 102, hospitalId: 1, name: 'Dr. Nusrat Sultana', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1800 },
  { id: 103, hospitalId: 1, name: 'Dr. Pran Gopal Datta', title: 'MBBS, PhD', specialization: 'ENT', fee: 1200 },
  { id: 104, hospitalId: 1, name: 'Dr. Ferdousi Begum', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1600 },
  { id: 105, hospitalId: 1, name: 'Dr. Md. Jahangir Kabir', title: 'MBBS, MD', specialization: 'Neurology', fee: 2000 },
  
  // Evercare Hospital Dhaka (previously Apollo)
  { id: 201, hospitalId: 2, name: 'Dr. R. K. Chowdhury', title: 'MBBS, MRCP', specialization: 'Cardiology', fee: 2000 },
  { id: 202, hospitalId: 2, name: 'Dr. Shahla Khatun', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1800 },
  { id: 203, hospitalId: 2, name: 'Dr. Anisul Haque', title: 'MBBS, MS', specialization: 'Orthopedics', fee: 1700 },
  { id: 204, hospitalId: 2, name: 'Dr. Laila Arjumand Banu', title: 'MBBS, MD', specialization: 'Pediatrics', fee: 1500 },
  { id: 205, hospitalId: 2, name: 'Dr. Syed Atiqur Rahman', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1600 },

  // United Hospital Limited
  { id: 301, hospitalId: 3, name: 'Dr. Farhana Dewan', title: 'MBBS, MD', specialization: 'Dermatology', fee: 1400 },
  { id: 302, hospitalId: 3, name: 'Dr. Quazi Deen Mohammad', title: 'MBBS, FCPS', specialization: 'Neurology', fee: 2200 },
  { id: 303, hospitalId: 3, name: 'Dr. N. A. Kamrul-Hassan', title: 'MBBS, MS', specialization: 'Urology', fee: 1900 },
  { id: 304, hospitalId: 3, name: 'Dr. Lutful Aziz', title: 'MBBS, DA', specialization: 'Anesthesiology', fee: 1000 },
  { id: 305, hospitalId: 3, name: 'Dr. Fatema Zohra', title: 'MBBS, MD', specialization: 'Endocrinology', fee: 1800 },

  // Labaid Specialized Hospital
  { id: 401, hospitalId: 4, name: 'Dr. Abdul Wadud Chowdhury', title: 'MBBS, MD', specialization: 'Cardiology', fee: 2000 },
  { id: 402, hospitalId: 4, name: 'Dr. Mamun Al Mahtab', title: 'MBBS, MSc', specialization: 'Gastroenterology', fee: 1800 },
  { id: 403, hospitalId: 4, name: 'Dr. Kazi Saifuddin Bennoor', title: 'MBBS, FCPS', specialization: 'Pulmonology', fee: 1500 },
  { id: 404, hospitalId: 4, name: 'Dr. M. A. Samad', title: 'MBBS, MD', specialization: 'Nephrology', fee: 1700 },
  { id: 405, hospitalId: 4, name: 'Dr. Salma Parvin', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1600 },

  // Green Life Hospital
  { id: 501, hospitalId: 5, name: 'Dr. Pranab Kumar Chowdhury', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1200 },
  { id: 502, hospitalId: 5, name: 'Dr. Md. Mufazzal Hossain', title: 'MBBS, MS', specialization: 'General Surgery', fee: 1400 },
  { id: 503, hospitalId: 5, name: 'Dr. Shamsun Nahar', title: 'MBBS, MPhil', specialization: 'Pathology', fee: 900 },
  { id: 504, hospitalId: 5, name: 'Dr. Kanak Kanti Barua', title: 'MBBS, FCPS', specialization: 'Neurosurgery', fee: 2500 },
  { id: 505, hospitalId: 5, name: 'Dr. Iffat Ara', title: 'MBBS, MD', specialization: 'Dermatology', fee: 1300 },

  // Ibn Sina Specialized Hospital
  { id: 601, hospitalId: 6, name: 'Dr. M. Fakhrul Islam', title: 'MBBS, MS', specialization: 'Urology', fee: 1800 },
  { id: 602, hospitalId: 6, name: 'Dr. M. A. Hai', title: 'MBBS, FCPS', specialization: 'Orthopedics', fee: 1600 },
  { id: 603, hospitalId: 6, name: 'Dr. Abul Kalam Azad', title: 'MBBS, MD', specialization: 'Pediatrics', fee: 1400 },
  { id: 604, hospitalId: 6, name: 'Dr. S. M. Ishaque', title: 'MBBS, D-Card', specialization: 'Cardiology', fee: 1700 },
  { id: 605, hospitalId: 6, name: 'Dr. Hasina Begum', title: 'MBBS, FCPS', specialization: 'Internal Medicine', fee: 1500 },
];

export const tests: Test[] = [
  // Square Hospitals Ltd.
  { id: 1001, hospitalId: 1, name: 'Complete Blood Count (CBC)', cost: 550 },
  { id: 1002, hospitalId: 1, name: 'Urinalysis', cost: 300 },
  { id: 1003, hospitalId: 1, name: 'X-Ray Chest (PA View)', cost: 700 },
  { id: 1004, hospitalId: 1, name: 'ECG', cost: 600 },
  { id: 1005, hospitalId: 1, name: 'Ultrasonography (Whole Abdomen)', cost: 2500 },
  { id: 1006, hospitalId: 1, name: 'MRI Brain', cost: 9000 },
  { id: 1007, hospitalId: 1, name: 'CT Scan (Head)', cost: 5000 },

  // Evercare Hospital Dhaka
  { id: 2001, hospitalId: 2, name: 'Complete Blood Count (CBC)', cost: 600 },
  { id: 2002, hospitalId: 2, name: 'Lipid Profile', cost: 1200 },
  { id: 2003, hospitalId: 2, name: 'X-Ray Chest (PA View)', cost: 800 },
  { id: 2004, hospitalId: 2, name: 'Echocardiogram', cost: 3500 },
  { id: 2005, hospitalId: 2, name: 'Ultrasonography (Whole Abdomen)', cost: 2800 },
  { id: 2006, hospitalId: 2, name: 'MRI Spine', cost: 11000 },
  { id: 2007, hospitalId: 2, name: 'CT Angiogram', cost: 15000 },

  // United Hospital Limited
  { id: 3001, hospitalId: 3, name: 'Complete Blood Count (CBC)', cost: 500 },
  { id: 3002, hospitalId: 3, name: 'Thyroid Function Test (TSH, T3, T4)', cost: 1500 },
  { id: 3003, hospitalId: 3, name: 'X-Ray Chest (PA View)', cost: 750 },
  { id: 3004, hospitalId: 3, name: 'Endoscopy', cost: 4000 },
  { id: 3005, hospitalId: 3, name: 'Ultrasonography (Whole Abdomen)', cost: 2600 },
  { id: 3006, hospitalId: 3, name: 'MRI Knee', cost: 8500 },
  { id: 3007, hospitalId: 3, name: 'Colonoscopy', cost: 7000 },
  
  // Labaid Specialized Hospital
  { id: 4001, hospitalId: 4, name: 'Complete Blood Count (CBC)', cost: 500 },
  { id: 4002, hospitalId: 4, name: 'Angiogram', cost: 20000 },
  { id: 4003, hospitalId: 4, name: 'Liver Function Test (LFT)', cost: 1300 },
  { id: 4004, hospitalId: 4, name: 'Kidney Function Test (KFT)', cost: 1100 },
  { id: 4005, hospitalId: 4, name: 'Spirometry', cost: 1800 },
  { id: 4006, hospitalId: 4, name: 'ECG', cost: 650 },
  { id: 4007, hospitalId: 4, name: 'Echocardiogram', cost: 3800 },

  // Green Life Hospital
  { id: 5001, hospitalId: 5, name: 'Complete Blood Count (CBC)', cost: 450 },
  { id: 5002, hospitalId: 5, name: 'Biopsy', cost: 3000 },
  { id: 5003, hospitalId: 5, name: 'Digital X-Ray', cost: 600 },
  { id: 5004, hospitalId: 5, name: 'HbA1c', cost: 800 },
  { id: 5005, hospitalId: 5, name: 'Ultrasound Scan', cost: 2200 },
  { id: 5006, hospitalId: 5, name: 'Lipid Profile', cost: 1100 },
  { id: 5007, hospitalId: 5, name: 'Urine R/E', cost: 250 },

  // Ibn Sina Specialized Hospital
  { id: 6001, hospitalId: 6, name: 'Complete Blood Count (CBC)', cost: 480 },
  { id: 6002, hospitalId: 6, name: 'Prostate-Specific Antigen (PSA)', cost: 1500 },
  { id: 6003, hospitalId: 6, name: 'CT Scan (Abdomen)', cost: 6000 },
  { id: 6004, hospitalId: 6, name: 'Bone Mineral Density (BMD) Test', cost: 2500 },
  { id: 6005, hospitalId: 6, name: 'Electroencephalogram (EEG)', cost: 3500 },
  { id: 6006, hospitalId: 6, name: 'Hormone Assay', cost: 1800 },
  { id: 6007, hospitalId: 6, name: 'Dengue NS1 Antigen', cost: 1200 },
];
