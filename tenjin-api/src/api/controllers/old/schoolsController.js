const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
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

        const school = await prisma.school.findUnique({
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
        
        const students = await prisma.school.findUnique({
            where: {
                id: schoolId
            },
            select: {
                Enrollment: {
                    select: {
                        student: true
                    }
                }
            }
        });

        return res.status(200).json({success: {students: students.Enrollment} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const addStudent = (async (req, res) => {
    const schoolId = req.user.id;

    res.json("ToDo: Enroll Student with id: " + schoolId)
})

const getTeachers = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        
        const teachers = await prisma.school.findUnique({
            where: {
                id: schoolId
            },
            select: {
                Employment: {
                    select: {
                        teacher: true
                    }
                }
            }
        });

        return res.status(200).json({success: {teachers: teachers.Employment} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const addTeacher = (async (req, res) => {
    const schoolId = req.user.id;

    res.json("ToDo: Employ a Teacher for School with id: " + schoolId)
})

const getClasses = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        
        const classes = await prisma.school.findUnique({
            where: {
                id: schoolId
            },
            select: {
                Teaching: {
                    select: {
                        classroom: true
                    }
                }
            }
        });

        return res.status(200).json({success: {classes: classes.Teaching} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const addClass = (async (req, res) => {
    const schoolId = req.user.id;

    res.json("ToDo: Add a Class for School with id: " + schoolId)
})

const getSubjects = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        
        const subjects = await prisma.school.findUnique({
            where: {
                id: schoolId
            },
            select: {
                Teaching: {
                    select: {
                        subject: true
                    }
                }
            }
        });

        return res.status(200).json({success: {subjects: subjects.Teaching} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})


module.exports = {
    addSchool, 
    getSchool, 
    getStudents, 
    addStudent, 
    getTeachers, 
    addTeacher, 
    getClasses, 
    addClass, 
    getSubjects
}