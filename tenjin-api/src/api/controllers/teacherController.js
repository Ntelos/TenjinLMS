const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { validateRegistration } = require("../validators/teachersValidator");

const addTeacher = async (req, res) => {
    const data = req.body;

    const { error } = validateRegistration(data);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        const teacher = await prisma.teacher.create({
            data: data,
        });
        return res.status(201).json({ success: { id: teacher.id } });
    } catch (e) {
        if ((e.code = "P2002")) {
            return res
                .status(409)
                .json({ error: e.meta.target + " already exists in Database" });
        }
        return res.status(500).json({ error: e });
    }
};

const getTeacher = async (req, res) => {
    try {
        const teacherId = req.user.id;

        const teacher = await prisma.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });

        return res.status(200).json({ success: teacher });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getSchools = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const year = req.body.year;

        const schools = await prisma.teaching.findMany({
            where: {
                year: year,
                teacherId: teacherId,
            },
            select: {
                school: { select: { name: true } },
            },
        });

        return res.status(200).json({ success: { schools: schools } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getSubjects = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const year = req.body.year;

        const subjects = await prisma.teaching.findMany({
            where: {
                year: year,
                teacherId: teacherId,
            },
            select: {
                school: { select: { name: true } },
                classroom: { select: { name: true } },
                subject: true,
            },
        });

        return res.status(200).json({ success: { subjects: subjects } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getTasksOfSubject = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const schoolName = req.body.schoolName;
        const year = req.body.year;
        const subjectName = req.body.subjectName;
        const classroomName = req.body.classroomName;

        //Find related School
        const school = await prisma.school.findUnique({
            where: {
                name: schoolName,
            },
        });

        //Find related Classroom
        const classroom = await prisma.classroom.findFirst({
            where: {
                name: classroomName,
                schoolId: school.id,
            },
        });

        //Find related Subject based on Classroom's yearLevel
        const subject = await prisma.subject.findFirst({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        });

        const teaching = await prisma.teaching.findFirst({
            where: {
                schoolId: school.id,
                year: year,
                teacherId: teacherId,
                classroomId: classroom.id,
                subjectId: subject.id
            },
            select: {
                Task: {
                    select: {
                        date: true,
                        comment: true,
                        points: true,
                        active: true
                    }
                }
            }
        });

        return res.status(200).json({ success: teaching });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const addTaskToSubject = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const comment = req.body.comment;
        const points = req.body.points;
        const schoolName = req.body.schoolName;
        const year = req.body.year;
        const subjectName = req.body.subjectName;
        const classroomName = req.body.classroomName;

        //Find related School
        const school = await prisma.school.findUnique({
            where: {
                name: schoolName,
            },
        });

        //Find related Classroom
        const classroom = await prisma.classroom.findFirst({
            where: {
                name: classroomName,
                schoolId: school.id,
            },
        });

        //Find related Subject based on Classroom's yearLevel
        const subject = await prisma.subject.findFirst({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        });

        //Find related Teaching
        const teaching = await prisma.teaching.findFirst({
            where: {
                year: year,
                schoolId: school.id,
                subjectId: subject.id,
                teacherId: teacherId,
                classroomId: classroom.id,
            },
        });

        //Create Task bound to previously found Teaching
        const task = await prisma.task.create({
            data: {
                teachingId: teaching.id,
                comment: comment,
                points: points,
            },
        });

        return res.status(200).json({ success: { task: task } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getStudentsOfClassroom = async (req, res) => {
    try {
        const schoolName = req.body.schoolName;
        const classroomName = req.body.classroomName;

        const school = await prisma.school.findUnique({
            where: {
                name: schoolName
            }
        });

        const classroom = await prisma.classroom.findFirst({
            where: {
                schoolId: school.id,
                name: classroomName
            }
        });

        const students = await prisma.student.findMany({
            where: {
                classroomId: classroom.id
            }
        });

        return res.status(200).json({ success: { students } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const addPointsToStudent = async (req, res) => {
    try {
        const studentEmail = req.body.email;
        const pointsToAdd = req.body.points;

        const points = await prisma.student.update({
            where: {
                email: studentEmail
            },
            data: {
                points: {
                    increment: pointsToAdd
                }
            },
            select: {
                email: true,
                points: true
            }
        });

        return res.status(200).json({ success: { points } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const addGradeToStudent = async (req, res) => {
    try {
        

        return res.status(200).json({ success: { student } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getGradesOfStudents = async (req, res) => {
    try {
        

        return res.status(200).json({ success: { student } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const addAbsenceToStudent = async (req, res) => {
    try {
        

        return res.status(200).json({ success: { student } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getAbsencesOfStudent = async (req, res) => {
    try {
        

        return res.status(200).json({ success: { student } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

module.exports = {
    addTeacher,
    getTeacher,
    getSchools,
    getSubjects,
    getTasksOfSubject,
    addTaskToSubject,
    getStudentsOfClassroom,
    addPointsToStudent,
    addGradeToStudent,
    getGradesOfStudents,
    addAbsenceToStudent,
    getAbsencesOfStudent
};
