const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { exclude } = require('../utils');
const { validateRegistration } = require('../validators/schoolsValidator');

const addSchool = (async (req, res) => {
    const data = req.body;

    const { error } = validateRegistration(data);
    if (error) { return res.status(400).json({errors: error.details}); }

    try {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        const school = await prisma.school.create({
            data: data
        });
        return res.status(201).json({success: {id: school.id} });
    } catch (e) {
        if (e.code = 'P2002') { return res.status(409).json({error: e.meta.target + ' already exists in Database'}); }
        return res.status(500).json({error: e});
    }
})

const getSchool = (async (req, res) => {
    try {
        const schoolId = req.user.id;

        const school = await prisma.school.findUniqueOrThrow({
            where: {
                id: schoolId
            }
        });

        return res.status(200).json({success: school});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getStudents = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const givenYear = req.body.year;
        
        const students = await prisma.school.findUnique({
            where: {
                id: schoolId,
            },
            select: {
                Enrollment: {
                    where: {
                        year: givenYear
                    },
                    select: {
                        student: true,
                        year: true,
                        yearLevel: true
                    }
                }
            }
        });

        return res.status(200).json({success: {students: students.Enrollment} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const enrollStudent = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const studentEmail = req.body.email;

        const student = await prisma.student.findUniqueOrThrow({
            where: {
                email: studentEmail
            },
            select: {
                id: true
            }
        });
        
        const enrollment = await prisma.enrollment.create({
            data: {
                year: req.body.year,
                yearLevel: req.body.yearLevel,
                schoolId: schoolId,
                studentId: student.id
            }
        });

        return res.status(200).json({success: {enrollmentId: enrollment.id} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getTeachers = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const givenYear = req.body.year;
        
        const teachers = await prisma.school.findUnique({
            where: {
                id: schoolId
            },
            select: {
                Employment: {
                    where: {
                        year: givenYear
                    },
                    select: {
                        teacher: true,
                        year: true
                    }
                }
            }
        });

        return res.status(200).json({success: {teachers: teachers.Employment} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const employTeacher = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const teacherEmail = req.body.email;

        const teacher = await prisma.teacher.findUniqueOrThrow({
            where: {
                email: teacherEmail
            },
            select: {
                id: true
            }
        });
        
        const employment = await prisma.employment.create({
            data: {
                year: req.body.year,
                schoolId: schoolId,
                teacherId: teacher.id
            }
        });

        return res.status(200).json({success: {employmentId: employment.id} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getClassrooms = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        
        const classrooms = await prisma.classroom.findMany({
            where: {
                schoolId: schoolId
            },
            select: {
                name: true,
                yearLevel: true
            }
        });

        return res.status(200).json({success: {classrooms: classrooms} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const addClassroom = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        
        const classroom = await prisma.classroom.create({
            data: {
                name: req.body.name,
                year: req.body.year,
                yearLevel: req.body.yearLevel,
                schoolId: schoolId
            }
        });

        return res.status(200).json({success: {classroomId: classroom.id} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getStudentsOfClassroom = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const classroomName = req.body.name;
        
        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                schoolId: schoolId,
                name: classroomName
            }
        });

        const students = await prisma.student.findMany({
            where: {
                classroomId: classroom.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
                points: true
            }
        });

        return res.status(200).json({success: {classroom: classroom.name, students: students} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const assignStudentToClassroom = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const studentEmail = req.body.studentEmail;
        const classroomName = req.body.classroom;
        
        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                schoolId: schoolId,
                name: classroomName
            }
        });

        const student = await prisma.student.update({
            where: {
                email: studentEmail
            },
            data: {
                classroomId: classroom.id
            },
            select: {
                name: true,
                surname: true,
                classroom: true
            }
        });

        return res.status(200).json({success: {student: student} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getGradesOfStudent = (async (req, res) => {
    try {
        const studentEmail = req.body.email;
        const year = req.body.year;

        const student = await prisma.student.findUniqueOrThrow({
            where: {
                email: studentEmail
            }
        });

        const grades = await prisma.grade.findMany({
            where: {
                studentId: student.id,
                teaching: { year: year }
            },
            select: {
                date: true,
                grade: true,
                teaching: { 
                    select: { 
                        subject: true,
                        teacher: {
                            select: {
                                name: true,
                                surname: true,
                                email: true,
                                phone: true
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).json({success: {student: student.name.concat(' ', student.surname), grades: grades} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getAbsencesOfStudent = (async (req, res) => {
    try {
        const studentEmail = req.body.email;
        const year = req.body.year;

        const student = await prisma.student.findUniqueOrThrow({
            where: {
                email: studentEmail
            }
        });

        const absences = await prisma.absence.findMany({
            where: {
                studentId: student.id,
                teaching: { year: year }
            },
            select: {
                date: true,
                teaching: { 
                    select: { 
                        subject: true,
                        teacher: {
                            select: {
                                name: true,
                                surname: true,
                                email: true,
                                phone: true
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).json({success: {student: student.name.concat(' ', student.surname), count: absences.length, absences: absences} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const assignTeaching = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const year = req.body.year;
        const teacherEmail = req.body.teacherEmail;
        const subjectName = req.body.subject;
        const classroomName = req.body.classroom;

        const teacher = await prisma.teacher.findUniqueOrThrow({
            where: {
                email: teacherEmail
            },
            select: {
                id: true
            }
        });

        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                name: classroomName,
                schoolId: schoolId
            },
            select: {
                id: true,
                yearLevel: true
            }
        });

        const subject = await prisma.subject.findFirstOrThrow({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel
            },
            select: {
                id: true
            }
        })
        
        const teaching = await prisma.teaching.create({
            data: {
                year: year,
                schoolId: schoolId,
                subjectId: subject.id,
                teacherId: teacher.id,
                classroomId: classroom.id
            }
        });

        return res.status(200).json({success: {teachingId: teaching.id} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getTeachings = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const givenYear = req.body.year;
        
        const teachings = await prisma.teaching.findMany({
            where: {
                schoolId: schoolId,
                year: givenYear
            },
            select: {
                year: true,
                subject: {
                    select: {
                        name: true,
                        weeklyHours: true
                    }
                },
                teacher: {
                    select: {
                        email: true,
                        surname: true,
                        name: true
                    }
                },
                classroom: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return res.status(200).json({success: {teachings: teachings} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})


module.exports = {
    addSchool, getSchool, getStudents, 
    enrollStudent, getTeachers, employTeacher, 
    getClassrooms, addClassroom, getStudentsOfClassroom, 
    assignStudentToClassroom, getGradesOfStudent, 
    getAbsencesOfStudent, assignTeaching, getTeachings
}