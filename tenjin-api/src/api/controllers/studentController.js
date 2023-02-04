const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { validateRegistration } = require('../validators/studentsValidator');

const addStudent = (async (req, res) => {
    const data = req.body;

    const { error } = validateRegistration(data);
    if (error) { return res.status(400).json({errors: error.details}); }

    try {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        const student = await prisma.student.create({
            data: data
        });
        return res.status(201).json({success: {id: student.id} });
    } catch (e) {
        if (e.code = 'P2002') { return res.status(409).json({error: e.meta.target + ' already exists in Database'}); }
        return res.status(500).json({error: e});
    }
})

const getStudent = (async (req, res) => {
    try {
        const studentId = req.user.id;

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            },
            include: {
                classroom: true,
                classroom: {
                    include: {
                        school: true
                    }
                }
            }
        });

        return res.status(200).json({success: student});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getPoints = (async (req, res) => {
    try {
        const studentId = req.user.id;

        const points = await prisma.student.findUnique({
            where: {
                id: studentId
            },
            select: {
                points: true
            }
        });

        return res.status(200).json({success: points});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getClassroom = (async (req, res) => {
    try {
        const studentId = req.user.id;

        const classroom = await prisma.student.findUnique({
            where: {
                id: studentId
            },
            select: {
                classroom: true
            }
        });

        return res.status(200).json({success: classroom});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getGrades = (async (req, res) => {
    try {
        const studentId = req.user.id;
        const year = req.body.year;

        const grades = await prisma.grade.findMany({
            where: {
                studentId: studentId,
                teaching: {
                    year: year
                }
            },
            include: {
                teaching: true,
                teaching: {
                    include: {
                        subject: true,
                        teacher: true
                    }
                }
            }
        });

        return res.status(200).json({success: grades});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getAbsences = (async (req, res) => {
    try {
        const studentId = req.user.id;
        const year = req.body.year;

        const absences = await prisma.absence.findMany({
            where: {
                studentId: studentId,
                teaching: {
                    year: year
                }
            },
            include: {
                teaching: true,
                teaching: {
                    include: {
                        subject: true,
                        teacher: true
                    }
                }
            }
        });

        return res.status(200).json({success: { count: absences.length, absences } });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getSubjects = (async (req, res) => {
    try {
        const studentId = req.user.id;
        const year = req.body.year;
        
        const classroom = await prisma.student.findUnique({
            where: {
                id: studentId
            },
            select: {
                classroom: true
            }
        });

        const subjects = await prisma.teaching.findMany({
            where: {
                classroomId: classroom.id,
                year: year
            },
            select: {
                subject: true
            }
        });

        return res.status(200).json({success: subjects});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getTasks = (async (req, res) => {
    try {
        const studentId = req.user.id;
        const subjectName = req.body.subject;
        const year = req.body.year;

        const classroom = await prisma.student.findUnique({
            where: {
                id: studentId
            },
            select: {
                classroom: true
            }
        });

        const tasks = await prisma.teaching.findMany({
            where: {
                classroomId: classroom.id,
                year: year,
                subject: {
                    name: subjectName
                }
            },
            select: {
                Task: true
            }
        });

        return res.status(200).json({success: tasks});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})


module.exports = {
    addStudent, 
    getStudent, 
    getPoints, 
    getClassroom, 
    getGrades, 
    getAbsences, 
    getSubjects, 
    getTasks
}