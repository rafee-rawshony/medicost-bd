
import type { Hospital, Doctor, Test, User } from '../types';

let hospitals: Hospital[] = [
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
];

let doctors: Doctor[] = [
  // Square Hospitals Ltd.
  { id: 101, hospitalId: 1, name: 'Dr. A. B. M. Abdullah', title: 'MBBS, FCPS', specialization: 'Medicine', fee: 1500 },
  { id: 102, hospitalId: 1, name: 'Dr. Nusrat Sultana', title: 'MBBS, MD', specialization: 'Cardiology', fee: 1800 },
  { id: 103, hospitalId: 1, name: 'Dr. Pran Gopal Datta', title: 'MBBS, PhD', specialization: 'ENT', fee: 1200 },
  
  // Evercare Hospital Dhaka
  { id: 201, hospitalId: 2, name: 'Dr. R. K. Chowdhury', title: 'MBBS, MRCP', specialization: 'Cardiology', fee: 2000 },
  { id: 202, hospitalId: 2, name: 'Dr. Shahla Khatun', title: 'MBBS, FCPS', specialization: 'Gynecology', fee: 1800 },
  { id: 203, hospitalId: 2, name: 'Dr. Anisul Haque', title: 'MBBS, MS', specialization: 'Orthopedics', fee: 1700 },

  // United Hospital Limited
  { id: 301, hospitalId: 3, name: 'Dr. Farhana Dewan', title: 'MBBS, MD', specialization: 'Dermatology', fee: 1400 },
  { id: 302, hospitalId: 3, name: 'Dr. Quazi Deen Mohammad', title: 'MBBS, FCPS', specialization: 'Neurology', fee: 2200 },
];

let tests: Test[] = [
  // Square Hospitals Ltd.
  { id: 1001, hospitalId: 1, name: 'Complete Blood Count (CBC)', cost: 550 },
  { id: 1002, hospitalId: 1, name: 'Urinalysis', cost: 300 },
  { id: 1003, hospitalId: 1, name: 'X-Ray Chest (PA View)', cost: 700 },

  // Evercare Hospital Dhaka
  { id: 2001, hospitalId: 2, name: 'Complete Blood Count (CBC)', cost: 600 },
  { id: 2002, hospitalId: 2, name: 'Lipid Profile', cost: 1200 },
  
  // United Hospital Limited
  { id: 3001, hospitalId: 3, name: 'Complete Blood Count (CBC)', cost: 500 },
  { id: 3002, hospitalId: 3, name: 'Thyroid Function Test (TSH, T3, T4)', cost: 1500 },
];

let users: User[] = [
    { id: 1, username: 'superadmin', password: 'password', role: 'superadmin' },
    { id: 2, username: 'admin', password: 'password', role: 'admin' },
    { id: 3, username: 'square', password: 'password', role: 'hospital', hospitalId: 1 },
    { id: 4, username: 'evercare', password: 'password', role: 'hospital', hospitalId: 2 },
];

const LOGGED_IN_USER_KEY = 'mediCostUser';

// --- Auth API ---
export const login = (username: string, password: string): User | null => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
        return user;
    }
    return null;
};

export const logout = () => {
    sessionStorage.removeItem(LOGGED_IN_USER_KEY);
};

export const getLoggedInUser = (): User | null => {
    const userJson = sessionStorage.getItem(LOGGED_IN_USER_KEY);
    if (userJson) {
        return JSON.parse(userJson);
    }
    return null;
};


// --- Data API Simulation ---

// Hospitals
export const getHospitals = () => [...hospitals];
export const getHospitalById = (id: number) => hospitals.find(h => h.id === id);
export const addHospital = (hospital: Omit<Hospital, 'id'>) => {
  const newHospital = { ...hospital, id: Date.now() };
  hospitals.push(newHospital);
  return newHospital;
};
export const updateHospital = (updatedHospital: Hospital) => {
  hospitals = hospitals.map(h => h.id === updatedHospital.id ? updatedHospital : h);
  return updatedHospital;
};
export const deleteHospital = (id: number) => {
  hospitals = hospitals.filter(h => h.id !== id);
  // Also delete associated doctors and tests
  doctors = doctors.filter(d => d.hospitalId !== id);
  tests = tests.filter(t => t.hospitalId !== id);
};

// Doctors
export const getDoctors = () => [...doctors];
export const getDoctorById = (id: number) => doctors.find(d => d.id === id);
export const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    const newDoctor = { ...doctor, id: Date.now() };
    doctors.push(newDoctor);
    return newDoctor;
};
export const updateDoctor = (updatedDoctor: Doctor) => {
    doctors = doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d);
    return updatedDoctor;
};
export const deleteDoctor = (id: number) => {
    doctors = doctors.filter(d => d.id !== id);
};

// Tests
export const getTests = () => [...tests];
export const getTestById = (id: number) => tests.find(t => t.id === id);
export const addTest = (test: Omit<Test, 'id'>) => {
    const newTest = { ...test, id: Date.now() };
    tests.push(newTest);
    return newTest;
};
export const updateTest = (updatedTest: Test) => {
    tests = tests.map(t => t.id === updatedTest.id ? updatedTest : t);
    return updatedTest;
};
export const deleteTest = (id: number) => {
    tests = tests.filter(t => t.id !== id);
};

// Users
export const getUsers = () => [...users];
export const getUserById = (id: number) => users.find(u => u.id === id);
export const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    return newUser;
};
export const updateUser = (updatedUser: User) => {
    users = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    return updatedUser;
};
export const deleteUser = (id: number) => {
    users = users.filter(u => u.id !== id);
};
