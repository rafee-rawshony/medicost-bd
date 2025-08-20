
import type { Hospital, Doctor, Test } from '../types';

export const hospitals: Hospital[] = [
  { id: 1, name: 'Square Hospitals Ltd.', location: 'Panthapath, Dhaka' },
  { id: 2, name: 'Apollo Hospitals Dhaka', location: 'Bashundhara, Dhaka' },
  { id: 3, name: 'United Hospital Limited', location: 'Gulshan, Dhaka' },
];

export const doctors: Doctor[] = [
  // Square Hospitals Ltd.
  { id: 101, hospitalId: 1, name: 'Dr. A. B. M. Abdullah', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1500 },
  { id: 102, hospitalId: 1, name: 'Dr. Nusrat Sultana', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1800 },
  { id: 103, hospitalId: 1, name: 'Dr. Pran Gopal Datta', title: 'MBBS, PhD', specialization: 'ENT', fee: 1200 },
  { id: 104, hospitalId: 1, name: 'Dr. Ferdousi Begum', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1600 },
  { id: 105, hospitalId: 1, name: 'Dr. Md. Jahangir Kabir', title: 'MBBS, MD', specialization: 'Neurology', fee: 2000 },
  
  // Apollo Hospitals Dhaka
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
];

export const tests: Test[] = [
  // Common for all
  { id: 1001, hospitalId: 1, name: 'Complete Blood Count (CBC)', cost: 550 },
  { id: 1002, hospitalId: 1, name: 'Urinalysis', cost: 300 },
  { id: 1003, hospitalId: 1, name: 'X-Ray Chest (PA View)', cost: 700 },
  { id: 1004, hospitalId: 1, name: 'ECG', cost: 600 },
  { id: 1005, hospitalId: 1, name: 'Ultrasonography (Whole Abdomen)', cost: 2500 },
  { id: 1006, hospitalId: 1, name: 'MRI Brain', cost: 9000 },
  { id: 1007, hospitalId: 1, name: 'CT Scan (Head)', cost: 5000 },

  { id: 2001, hospitalId: 2, name: 'Complete Blood Count (CBC)', cost: 600 },
  { id: 2002, hospitalId: 2, name: 'Lipid Profile', cost: 1200 },
  { id: 2003, hospitalId: 2, name: 'X-Ray Chest (PA View)', cost: 800 },
  { id: 2004, hospitalId: 2, name: 'Echocardiogram', cost: 3500 },
  { id: 2005, hospitalId: 2, name: 'Ultrasonography (Whole Abdomen)', cost: 2800 },
  { id: 2006, hospitalId: 2, name: 'MRI Spine', cost: 11000 },
  { id: 2007, hospitalId: 2, name: 'CT Angiogram', cost: 15000 },

  { id: 3001, hospitalId: 3, name: 'Complete Blood Count (CBC)', cost: 500 },
  { id: 3002, hospitalId: 3, name: 'Thyroid Function Test (TSH, T3, T4)', cost: 1500 },
  { id: 3003, hospitalId: 3, name: 'X-Ray Chest (PA View)', cost: 750 },
  { id: 3004, hospitalId: 3, name: 'Endoscopy', cost: 4000 },
  { id: 3005, hospitalId: 3, name: 'Ultrasonography (Whole Abdomen)', cost: 2600 },
  { id: 3006, hospitalId: 3, name: 'MRI Knee', cost: 8500 },
  { id: 3007, hospitalId: 3, name: 'Colonoscopy', cost: 7000 },
];
