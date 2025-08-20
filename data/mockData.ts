
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
    description: 'A super-specialty tertiary care hospital offering comprehensive health services with a focus on patient safety and quality.',
    contact: '10678',
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
    description: 'One of the pioneers in cardiac care in Bangladesh, Labaid also offers a wide range of other specialized medical services.',
    contact: '10606',
    website: 'https://labaidgroup.com/specialized',
    specialties: ['Cardiology', 'Gastroenterology', 'Pulmonology', 'Nephrology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/ef4444/ffffff?text=Labaid+Hospital',
  },
  {
    id: 5,
    name: 'BIRDEM General Hospital',
    location: 'Shahbag, Dhaka',
    description: 'A specialized hospital for diabetic, endocrine, and metabolic disorders, also providing general medical services.',
    contact: '+880-2-58616641',
    website: 'https://www.birdem.org.bd',
    specialties: ['Diabetology', 'Endocrinology', 'Internal Medicine', 'Nutrition'],
    imageUrl: 'https://via.placeholder.com/400x250.png/f97316/ffffff?text=BIRDEM',
  },
  {
    id: 6,
    name: 'BSMMU',
    location: 'Shahbag, Dhaka',
    description: 'The premier postgraduate medical institution in Bangladesh, offering specialized clinical services and medical education.',
    contact: '+880-2-9661051',
    website: 'https://www.bsmmu.edu.bd',
    specialties: ['Surgery', 'Oncology', 'Pediatrics', 'Hepatology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/84cc16/ffffff?text=BSMMU',
  },
  {
    id: 7,
    name: 'Chittagong Medical College Hospital',
    location: 'Chawkbazar, Chittagong',
    description: 'A major government hospital in Chittagong, providing affordable healthcare services to a large population.',
    contact: '+880-31-619513',
    website: 'http://cmc.gov.bd',
    specialties: ['General Medicine', 'Surgery', 'Gynecology', 'Orthopedics'],
    imageUrl: 'https://via.placeholder.com/400x250.png/10b981/ffffff?text=CMCH',
  },
  {
    id: 8,
    name: 'National Institute of Cardiovascular Diseases (NICVD)',
    location: 'Sher-e-Bangla Nagar, Dhaka',
    description: 'A government-run specialized hospital dedicated to the treatment of cardiovascular diseases.',
    contact: '+880-2-9122560',
    website: 'http://www.nicvd.gov.bd',
    specialties: ['Cardiology', 'Cardiac Surgery', 'Vascular Surgery', 'Pediatric Cardiology'],
    imageUrl: 'https://via.placeholder.com/400x250.png/6366f1/ffffff?text=NICVD',
  },
];

export const doctors: Doctor[] = [
  // Square Hospitals Ltd. (id: 1)
  { id: 101, hospitalId: 1, name: 'Dr. A. B. M. Abdullah', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1500 },
  { id: 102, hospitalId: 1, name: 'Dr. Nusrat Sultana', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1800 },
  { id: 103, hospitalId: 1, name: 'Dr. Pran Gopal Datta', title: 'MBBS, PhD', specialization: 'ENT', fee: 1200 },
  { id: 104, hospitalId: 1, name: 'Dr. Ferdousi Begum', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1600 },
  { id: 105, hospitalId: 1, name: 'Dr. Md. Jahangir Kabir', title: 'MBBS, MD', specialization: 'Neurology', fee: 2000 },
  
  // Evercare Hospital Dhaka (id: 2)
  { id: 201, hospitalId: 2, name: 'Dr. R. K. Chowdhury', title: 'MBBS, MRCP', specialization: 'Cardiology', fee: 2000 },
  { id: 202, hospitalId: 2, name: 'Dr. Shahla Khatun', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1800 },
  { id: 203, hospitalId: 2, name: 'Dr. Anisul Haque', title: 'MBBS, MS', specialization: 'Orthopedics', fee: 1700 },
  { id: 204, hospitalId: 2, name: 'Dr. Laila Arjumand Banu', title: 'MBBS, MD', specialization: 'Pediatrics', fee: 1500 },
  { id: 205, hospitalId: 2, name: 'Dr. Syed Atiqur Rahman', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1600 },

  // United Hospital Limited (id: 3)
  { id: 301, hospitalId: 3, name: 'Dr. Farhana Dewan', title: 'MBBS, MD', specialization: 'Dermatology', fee: 1400 },
  { id: 302, hospitalId: 3, name: 'Dr. Quazi Deen Mohammad', title: 'MBBS, FCPS', specialization: 'Neurology', fee: 2200 },
  { id: 303, hospitalId: 3, name: 'Dr. N. A. Kamrul-Hassan', title: 'MBBS, MS', specialization: 'Urology', fee: 1900 },
  { id: 304, hospitalId: 3, name: 'Dr. Lutful Aziz', title: 'MBBS, DA', specialization: 'Anesthesiology', fee: 1000 },
  { id: 305, hospitalId: 3, name: 'Dr. Fatema Zohra', title: 'MBBS, MD', specialization: 'Endocrinology', fee: 1800 },

  // Labaid Specialized Hospital (id: 4)
  { id: 401, hospitalId: 4, name: 'Dr. Sohrab uz Zaman', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1600 },
  { id: 402, hospitalId: 4, name: 'Dr. Mamun Al Mahtab', title: 'MBBS, MSc', specialization: 'Hepatology', fee: 1700 },
  { id: 403, hospitalId: 4, name: 'Dr. Md. Ali Hossain', title: 'MBBS, FCPS', specialization: 'Pulmonology', fee: 1400 },
  { id: 404, hospitalId: 4, name: 'Dr. M A Samad', title: 'MBBS, MD', specialization: 'Nephrology', fee: 1800 },
  { id: 405, hospitalId: 4, name: 'Dr. Lutfun Nahar', title: 'MBBS, DDV', specialization: 'Dermatology', fee: 1300 },

  // BIRDEM General Hospital (id: 5)
  { id: 501, hospitalId: 5, name: 'Prof. Zafar Ahmed Latif', title: 'MBBS, PhD', specialization: 'Diabetology', fee: 1000 },
  { id: 502, hospitalId: 5, name: 'Dr. S M Ashrafuzzaman', title: 'MBBS, MPhil', specialization: 'Endocrinology', fee: 1100 },
  { id: 503, hospitalId: 5, name: 'Dr. Feroz Amin', title: 'MBBS, FCPS', specialization: 'Internal Medicine', fee: 900 },
  { id: 504, hospitalId: 5, name: 'Dr. Nazmun Nahar', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 800 },
  { id: 505, hospitalId: 5, name: 'Dr. Md. Faruque Pathan', title: 'MBBS, DEM', specialization: 'Diabetology', fee: 950 },

  // BSMMU (id: 6)
  { id: 601, hospitalId: 6, name: 'Prof. Kanak Kanti Barua', title: 'MBBS, FCPS', specialization: 'Neurosurgery', fee: 1200 },
  { id: 602, hospitalId: 6, name: 'Prof. Sayeba Akhter', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1000 },
  { id: 603, hospitalId: 6, name: 'Prof. ABM Yunus', title: 'MBBS, FCPS', specialization: 'Hematology', fee: 1100 },
  { id: 604, hospitalId: 6, name: 'Dr. Md. Atiqul Haque', title: 'MBBS, MD', specialization: 'Pediatrics', fee: 800 },
  { id: 605, hospitalId: 6, name: 'Dr. Sarwar Alam', title: 'MBBS, MD', specialization: 'Oncology', fee: 1300 },

  // Chittagong Medical College Hospital (id: 7)
  { id: 701, hospitalId: 7, name: 'Dr. Samirul Islam', title: 'MBBS, FCPS', specialization: 'General Medicine', fee: 600 },
  { id: 702, hospitalId: 7, name: 'Dr. Omar Faruque Yusuf', title: 'MBBS, FCPS', specialization: 'Surgery', fee: 700 },
  { id: 703, hospitalId: 7, name: 'Dr. Rezina Karim', title: 'MBBS, DGO', specialization: 'Gynecology', fee: 500 },
  { id: 704, hospitalId: 7, name: 'Dr. Pradip Dutta', title: 'MBBS, D-Ortho', specialization: 'Orthopedics', fee: 650 },
  { id: 705, hospitalId: 7, name: 'Dr. Iftekhar Hossain', title: 'MBBS, DDV', specialization: 'Dermatology', fee: 550 },

  // NICVD (id: 8)
  { id: 801, hospitalId: 8, name: 'Prof. Dr. Afzalur Rahman', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1500 },
  { id: 802, hospitalId: 8, name: 'Prof. Dr. A K M Manzurul Alam', title: 'MBBS, MS', specialization: 'Cardiac Surgery', fee: 2000 },
  { id: 803, hospitalId: 8, name: 'Dr. D. A. Hasan', title: 'MBBS, MD', specialization: 'Pediatric Cardiology', fee: 1200 },
  { id: 804, hospitalId: 8, name: 'Dr. Nighat Islam', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1300 },
  { id: 805, hospitalId: 8, name: 'Dr. Abul Kalam Azad', title: 'MBBS, MS', specialization: 'Vascular Surgery', fee: 1800 },
];

export const tests: Test[] = [
  // Square Hospitals Ltd. (id: 1)
  { id: 1001, hospitalId: 1, name: 'Complete Blood Count (CBC)', cost: 550 },
  { id: 1002, hospitalId: 1, name: 'Urinalysis', cost: 300 },
  { id: 1003, hospitalId: 1, name: 'X-Ray Chest (PA View)', cost: 700 },
  { id: 1004, hospitalId: 1, name: 'ECG', cost: 600 },
  { id: 1005, hospitalId: 1, name: 'Ultrasonography (Whole Abdomen)', cost: 2500 },
  { id: 1006, hospitalId: 1, name: 'MRI Brain', cost: 9000 },
  { id: 1007, hospitalId: 1, name: 'CT Scan (Head)', cost: 5000 },

  // Evercare Hospital Dhaka (id: 2)
  { id: 2001, hospitalId: 2, name: 'Complete Blood Count (CBC)', cost: 600 },
  { id: 2002, hospitalId: 2, name: 'Lipid Profile', cost: 1200 },
  { id: 2003, hospitalId: 2, name: 'X-Ray Chest (PA View)', cost: 800 },
  { id: 2004, hospitalId: 2, name: 'Echocardiogram', cost: 3500 },
  { id: 2005, hospitalId: 2, name: 'Ultrasonography (Whole Abdomen)', cost: 2800 },
  { id: 2006, hospitalId: 2, name: 'MRI Spine', cost: 11000 },
  { id: 2007, hospitalId: 2, name: 'CT Angiogram', cost: 15000 },

  // United Hospital Limited (id: 3)
  { id: 3001, hospitalId: 3, name: 'Complete Blood Count (CBC)', cost: 500 },
  { id: 3002, hospitalId: 3, name: 'Thyroid Function Test (TSH, T3, T4)', cost: 1500 },
  { id: 3003, hospitalId: 3, name: 'X-Ray Chest (PA View)', cost: 750 },
  { id: 3004, hospitalId: 3, name: 'Endoscopy', cost: 4000 },
  { id: 3005, hospitalId: 3, name: 'Ultrasonography (Whole Abdomen)', cost: 2600 },
  { id: 3006, hospitalId: 3, name: 'MRI Knee', cost: 8500 },
  { id: 3007, hospitalId: 3, name: 'Colonoscopy', cost: 7000 },

  // Labaid Specialized Hospital (id: 4)
  { id: 4001, hospitalId: 4, name: 'Angiogram (Coronary)', cost: 18000 },
  { id: 4002, hospitalId: 4, name: 'Stool R/E', cost: 350 },
  { id: 4003, hospitalId: 4, name: 'Fibroscan', cost: 6000 },
  { id: 4004, hospitalId: 4, name: 'Creatinine', cost: 400 },
  { id: 4005, hospitalId: 4, name: 'HBsAg', cost: 800 },
  { id: 4006, hospitalId: 4, name: 'Pulmonary Function Test (PFT)', cost: 2000 },
  { id: 4007, hospitalId: 4, name: 'Dengue NS1 Antigen', cost: 1200 },

  // BIRDEM General Hospital (id: 5)
  { id: 5001, hospitalId: 5, name: 'HbA1c', cost: 700 },
  { id: 5002, hospitalId: 5, name: 'Fasting Blood Sugar (FBS)', cost: 150 },
  { id: 5003, hospitalId: 5, name: '2-h ABF', cost: 150 },
  { id: 5004, hospitalId: 5, name: 'Oral Glucose Tolerance Test (OGTT)', cost: 400 },
  { id: 5005, hospitalId: 5, name: 'Serum Insulin', cost: 1500 },
  { id: 5006, hospitalId: 5, name: 'Microalbuminuria', cost: 900 },
  { id: 5007, hospitalId: 5, name: 'C-Peptide', cost: 1800 },

  // BSMMU (id: 6)
  { id: 6001, hospitalId: 6, name: 'Biopsy', cost: 3000 },
  { id: 6002, hospitalId: 6, name: 'Bone Marrow Examination', cost: 4000 },
  { id: 6003, hospitalId: 6, name: 'Tumor Markers (CEA)', cost: 1800 },
  { id: 6004, hospitalId: 6, name: 'FNAC', cost: 1500 },
  { id: 6005, hospitalId: 6, name: 'Hormone Assay (LH, FSH)', cost: 1200 },
  { id: 6006, hospitalId: 6, name: 'CSF Study', cost: 1000 },
  { id: 6007, hospitalId: 6, name: 'Liver Function Test (LFT)', cost: 1100 },

  // Chittagong Medical College Hospital (id: 7)
  { id: 7001, hospitalId: 7, name: 'Complete Blood Count (CBC)', cost: 250 },
  { id: 7002, hospitalId: 7, name: 'Urinalysis', cost: 100 },
  { id: 7003, hospitalId: 7, name: 'X-Ray Chest (PA View)', cost: 300 },
  { id: 7004, hospitalId: 7, name: 'ECG', cost: 200 },
  { id: 7005, hospitalId: 7, name: 'Ultrasonography (Whole Abdomen)', cost: 800 },
  { id: 7006, hospitalId: 7, name: 'Blood Grouping & Rh Typing', cost: 150 },
  { id: 7007, hospitalId: 7, name: 'Serum Creatinine', cost: 200 },

  // NICVD (id: 8)
  { id: 8001, hospitalId: 8, name: 'Echocardiogram', cost: 1500 },
  { id: 8002, hospitalId: 8, name: 'ETT (Exercise Tolerance Test)', cost: 2000 },
  { id: 8003, hospitalId: 8, name: 'Holter Monitoring (24 hours)', cost: 3000 },
  { id: 8004, hospitalId: 8, name: 'Coronary Angiogram (CAG)', cost: 10000 },
  { id: 8005, hospitalId: 8, name: 'PTCA (Stenting) - per stent', cost: 120000 },
  { id: 8006, hospitalId: 8, name: 'Cardiac Enzymes (Troponin-I)', cost: 1300 },
  { id: 8007, hospitalId: 8, name: 'D-Dimer', cost: 1600 },
];
