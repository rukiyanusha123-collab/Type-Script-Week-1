export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

export interface CreateStudentDTO {
  name: string;
  email: string;
  course: string;
}

export type UpdateStudentDTO = Partial<CreateStudentDTO>;