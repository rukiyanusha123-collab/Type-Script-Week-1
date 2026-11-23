import { Router, Request, Response } from "express";
import type { Student, CreateStudentDTO, UpdateStudentDTO } from "../types/student";
import { validateStudent } from "../dtos/studentDto";

const router = Router();

let students: Student[] = [];
let nextId = 1;

// GET all students
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(students);
});

// GET student by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const student = students.find((item) => item.id === id);

  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  res.status(200).json(student);
});

// CREATE student
router.post("/", (req: Request, res: Response) => {
  const data: unknown = req.body;

  if (!validateStudent(data)) {
    res.status(400).json({
      message: "Invalid student data. Name, valid email and course are required.",
    });
    return;
  }

  const newStudent: Student = {
    id: nextId++,
    name: data.name.trim(),
    email: data.email.trim(),
    course: data.course.trim(),
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
});

// UPDATE student
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const student = students.find((item) => item.id === id);

  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  const data: unknown = req.body;

  if (!validateStudent(data)) {
    res.status(400).json({
      message: "Invalid student data. Name, valid email and course are required.",
    });
    return;
  }

  const updatedStudent: Student = {
    id: student.id,
    name: data.name.trim(),
    email: data.email.trim(),
    course: data.course.trim(),
  };

  students = students.map((item) =>
    item.id === id ? updatedStudent : item
  );

  res.status(200).json({
    message: "Student updated successfully",
    student: updatedStudent,
  });
});

// DELETE student
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const student = students.find((item) => item.id === id);

  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  students = students.filter((item) => item.id !== id);

  res.status(200).json({
    message: "Student deleted successfully",
  });
});

export default router;