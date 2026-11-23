import type { CreateStudentDTO } from "../types/student";

export const validateStudent = (
  data: unknown
): data is CreateStudentDTO => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const student = data as Record<string, unknown>;

  return (
    typeof student.name === "string" &&
    student.name.trim().length > 0 &&
    typeof student.email === "string" &&
    student.email.includes("@") &&
    typeof student.course === "string" &&
    student.course.trim().length > 0
  );
};