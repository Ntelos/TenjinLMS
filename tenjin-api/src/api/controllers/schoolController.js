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

const enrollStudent = (async (req, res) => {
    try {
        const schoolId = req.user.id;
        const studentEmail = req.body.email;

        const student = await prisma.student.findUnique({
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
    
})

const employTeacher = (async (req, res) => {
    
})

const getClassrooms = (async (req, res) => {
    
})

const addClassroom = (async (req, res) => {
    
})

const getStudentsOfClassroom = (async (req, res) => {
    
})

const assignStudentToClassroom = (async (req, res) => {
    
})

const getGradesOfStudent = (async (req, res) => {
    
})

const getAbsencesOfStudent = (async (req, res) => {
    
})

const getSubjects = (async (req, res) => {
    
})

const assignTeaching = (async (req, res) => {
    
})


module.exports = {
    addSchool, getSchool, getStudents, 
    enrollStudent, getTeachers, employTeacher, 
    getClassrooms, addClassroom, getStudentsOfClassroom, 
    assignStudentToClassroom, getGradesOfStudent, 
    getAbsencesOfStudent, getSubjects, assignTeaching
}