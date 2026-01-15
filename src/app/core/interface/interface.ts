export interface IStudent {
  id?: string;         
  firstName: string;   
  middleName?: string;   
  lastName: string;
  fullName: string;
  caste: string;
  mobileNo: string;   
  percentage10th: number;
  percentage12th: number;
  gradPercentage: number;
  average: number;
  isEdit?: boolean;
  email?: string; 
}

export const EMPTY_SRUDENT:IStudent = {
    firstName: '',
    middleName: '',
    lastName: '',
    fullName: '',
    caste: '',
    mobileNo: '',
    percentage10th: 0,
    percentage12th: 0,
    gradPercentage:0,
    average: 0
}

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  studentId?: string;
}


export const EMPTY_USER:IUser = {
  fullName: "",
  email: "",
  password: "",
  role: "",
}

