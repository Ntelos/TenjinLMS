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

        const teacher = await prisma.teacher.findUniqueOrThrow({
            where: {
                id: teacherId,
            },
        });

        return res.status(200).json({ success: teacher });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const patchTeacher = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const name = req.body.name;
        const surname = req.body.surname;
        const phone = req.body.phone;

        const teacher = await prisma.teacher.update({
            where: {
                id: teacherId,
            },
            data: {
                name: name,
                surname: surname,
                phone: phone,
            }
        });

        return res.status(200).json({ success: teacher.id });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getSchools = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const year = req.body.year;

        const schools = await prisma.employment.findMany({
            where: {
                year: year,
                teacherId: teacherId,
            },
            distinct: [
                'schoolId'
            ],
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

        const teachings = await prisma.teaching.findMany({
            where: {
                year: year,
                teacherId: teacherId,
            },
            select: {
                school: { select: { name: true, email: true } },
                classroom: { select: { name: true } },
                subject: true,
            },
        });

        return res.status(200).json({ success: { teachings } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getTasksOfSubject = async (req, res) => {
    try {
        const teacherId = req.user.id
        const schoolEmail = req.body.schoolEmail
        const year = req.body.year
        const subjectName = req.body.subjectName
        const classroomName = req.body.classroomName

        //Find related School
        const school = await prisma.school.findUniqueOrThrow({
            where: {
                email: schoolEmail,
            },
        })
        
        //Find related Classroom
        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                name: classroomName,
                schoolId: school.id,
                year: year
            },
        })

        //Find related Subject based on Classroom's yearLevel
        const subject = await prisma.subject.findFirstOrThrow({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        })

        const teaching = await prisma.teaching.findFirstOrThrow({
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
        })

        teaching.Task.forEach((item, index) => {
            item.date = item.date.toLocaleString()
        })

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
        const schoolEmail = req.body.schoolEmail;
        const year = req.body.year;
        const subjectName = req.body.subjectName;
        const classroomName = req.body.classroomName;

        //Find related School
        const school = await prisma.school.findUniqueOrThrow({
            where: {
                email: schoolEmail,
            },
        });

        //Find related Classroom
        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                name: classroomName,
                schoolId: school.id,
                year: year
            },
        });

        //Find related Subject based on Classroom's yearLevel
        const subject = await prisma.subject.findFirstOrThrow({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        });

        //Find related Teaching
        const teaching = await prisma.teaching.findFirstOrThrow({
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
        const schoolEmail = req.body.schoolEmail
        const classroomName = req.body.classroomName
        const year = req.body.year

        const school = await prisma.school.findUnique({
            where: {
                email: schoolEmail
            }
        })

        const students = await prisma.classroom.findFirst({
            where: {
                schoolId: school.id,
                name: classroomName,
                year: year
            },
            select: {
                Student: {
                    select: {
                        email: true,
                        name: true,
                        surname: true,
                        phone: true,
                        points: true
                    }
                }
            }
        })

        return res.status(200).json({ success: { students } })
    } catch (e) {
        return res.status(500).json({ error: e })
    }
};

const getTeachingsOfClassroom = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const year = req.body.year;
        const schoolEmail = req.body.schoolEmail;
        const classroomName = req.body.classroomName;

        const subjects = await prisma.Teaching.findMany({
            where: {
                year: year,
                teacherId: teacherId,
                school: { email: schoolEmail },
                classroom: { name: classroomName }
            },
            select: {
                subject: true
            }
        })

        return res.status(200).json({ success: { subjects } })
    } catch (e) {
        return res.status(500).json({ error: e })
    }
};

const getClassrooms = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const year = req.body.year;

        const teachingClassrooms = await prisma.teaching.findMany({
            where: {
                year: year,
                teacherId: teacherId,
            },
            select: {
                school: { select: { name: true, email: true } },
                classroom: { select: { name: true } }
            }
        })

        return res.status(200).json({ success: { teachingClassrooms } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const addPointsToStudent = async (req, res) => {
    try {
        const studentEmail = req.body.email
        const pointsToAdd = req.body.points

        //Turn null points to 0 in order increment to work
        const nullpoints = await prisma.student.updateMany({
            where: {
                email: studentEmail,
                points: null
            },
            data: {
                points: 0
            }
        })

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
        })

        return res.status(200).json({ success: { points } })
    } catch (e) {
        return res.status(500).json({ error: e })
    }
};

const getGradesOfTeaching = async (req, res) => {
    try {
        const teacherId = req.user.id
        const year = req.body.year
        const schoolEmail = req.body.schoolEmail
        const classroom = req.body.classroom
        const subject = req.body.subject

        const teachingInfo = await prisma.teaching.findFirstOrThrow({
            where: {
                year: year,
                teacherId: teacherId,
                school: { email: schoolEmail },
                classroom: { name: classroom },
                subject: { name: subject }
            },
            select: {
                Grade: {
                    select: {
                        date: true,
                        grade: true,
                        student: {
                            select: {
                                name: true,
                                surname: true,
                                email: true
                            }
                        }
                    }
                },
                classroom: {
                    select: {
                        Student: {
                            select: {
                                email: true,
                                name: true,
                                surname: true
                            }
                        }
                    }
                }
            }
        })

        teachingInfo.Grade.forEach((item, index) => {
            item.date = item.date.toLocaleString()
        })

        return res.status(200).json({ success: { teachingInfo } })
    } catch (e) {
        return res.status(500).json({ error: e })
    }
}

const addGradeToStudent = async (req, res) => {
    try {
        const teacherId = req.user.id
        const year = req.body.year
        const schoolEmail = req.body.schoolEmail
        const studentEmail = req.body.studentEmail
        const classroomName = req.body.classroom
        const subjectName = req.body.subject
        const givenGrade = req.body.grade

        const student = await prisma.student.findUniqueOrThrow({
            where: {
                email: studentEmail
            }
        })

        const school = await prisma.school.findUniqueOrThrow({
            where: {
                email: schoolEmail,
            },
        })

        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                name: classroomName,
                schoolId: school.id,
                year: year
            },
        })

        const subject = await prisma.subject.findFirstOrThrow({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        })

        const teaching = await prisma.teaching.findFirstOrThrow({
            where: {
                year: year,
                schoolId: school.id,
                subjectId: subject.id,
                teacherId: teacherId,
                classroomId: classroom.id,
            },
        })

        const existingGrade = await prisma.grade.findMany({
            where: {
                studentId: student.id,
                teachingId: teaching.id
            }
        })

        let result
        if (existingGrade.length === 0) {
            result = await prisma.grade.create({
                data: {
                    grade: givenGrade,
                    studentId: student.id,
                    teachingId: teaching.id
                }
            })
        } else {
            result = await prisma.grade.updateMany({
                where: {
                    id: existingGrade.id,
                    studentId: student.id,
                    teachingId: teaching.id
                },
                data: {
                    grade: givenGrade
                }
            })
        }

        return res.status(200).json({ success: { result } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getGradesOfStudents = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const year = req.body.year;
        const schoolName = req.body.school;
        const classroomName = req.body.classroom;
        const subjectName = req.body.subject;

        const school = await prisma.school.findUnique({
            where: {
                name: schoolName,
            },
        });

        const classroom = await prisma.classroom.findFirst({
            where: {
                name: classroomName,
                schoolId: school.id,
            },
        });

        const subject = await prisma.subject.findFirst({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        });

        const teaching = await prisma.teaching.findFirst({
            where: {
                year: year,
                schoolId: school.id,
                subjectId: subject.id,
                teacherId: teacherId,
                classroomId: classroom.id,
            },
        });

        const grades = await prisma.teaching.findUnique({
            where: {
                id: teaching.id
            },
            select: {
                Grade: {
                    select: {
                        date: true,
                        grade: true,
                        student: {
                            select: {
                                name: true,
                                surname: true
                            }
                        },
                        teaching: {
                            select: {
                                subject: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return res.status(200).json({ success: { grades } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const addAbsenceToStudent = async (req, res) => {
    try {
        const teacherId = req.user.id
        const year = req.body.year
        const schoolEmail = req.body.schoolEmail
        const studentEmail = req.body.studentEmail
        const classroomName = req.body.classroom
        const subjectName = req.body.subject
        
        const student = await prisma.student.findUnique({
            where: {
                email: studentEmail
            }
        })

        const school = await prisma.school.findUnique({
            where: {
                email: schoolEmail,
            },
        })

        const classroom = await prisma.classroom.findFirstOrThrow({
            where: {
                name: classroomName,
                schoolId: school.id,
                year: year
            },
        })

        const subject = await prisma.subject.findFirstOrThrow({
            where: {
                name: subjectName,
                yearLevel: classroom.yearLevel,
            },
        })

        const teaching = await prisma.teaching.findFirstOrThrow({
            where: {
                year: year,
                schoolId: school.id,
                subjectId: subject.id,
                teacherId: teacherId,
                classroomId: classroom.id,
            },
        })

        const absence = await prisma.absence.create({
            data: {
                studentId: student.id,
                teachingId: teaching.id
            }
        })

        return res.status(200).json({ success: { absence } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const getAbsencesOfStudent = async (req, res) => {
    try {
        const year = req.body.year;
        const schoolName = req.body.school;
        const classroomName = req.body.classroom;
        const studentEmail = req.body.email;

        const student = await prisma.student.findUnique({
            where: {
                email: studentEmail
            }
        });

        const school = await prisma.school.findUnique({
            where: {
                name: schoolName
            }
        });

        const classroom = await prisma.classroom.findFirst({
            where: {
                name: classroomName,
                schoolId: school.id,
            },
        });

        const absences = await prisma.absence.count({
            where: {
                studentId: student.id,
                teaching: {
                    year: year,
                    schoolId: school.id,
                    classroomId: classroom.id
                }
            }
        });

        return res.status(200).json({ success: { absences } });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

module.exports = {
    addTeacher,
    getTeacher,
    getSchools,
    getSubjects,
    getClassrooms,
    getTasksOfSubject,
    addTaskToSubject,
    getStudentsOfClassroom,
    getTeachingsOfClassroom,
    addPointsToStudent,
    getGradesOfTeaching,
    addGradeToStudent,
    getGradesOfStudents,
    addAbsenceToStudent,
    getAbsencesOfStudent,
    patchTeacher
};
