
export interface Hospital {
  id: number;
  name: string;
  location: string;
  description: string;
  contact: string;
  website: string;
  specialties: string[];
  imageUrl: string;
}

export interface Doctor {
  id: number;
  hospitalId: number;
  name: string;
  title: string;
  specialization: string;
  fee: number;
}

export interface Test {
  id: number;
  hospitalId: number;
  name: string;
  cost: number;
}