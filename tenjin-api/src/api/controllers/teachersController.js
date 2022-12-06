const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { validateRegistration } = require('../validators/teachersValidator');

const addTeacher = (async (req, res) => {
    const data = req.body;

    const { error } = validateRegistration(data);
    if (error) { return res.status(400).json({errors: error.details}); }

    try {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        const teacher = await prisma.teacher.create({
            data: data
        });
        return res.status(201).json({success: {id: teacher.id} });
    } catch (e) {
        if (e.code = 'P2002') { return res.status(409).json({error: e.meta.target + ' already exists in Database'}); }
        return res.status(500).json({error: e});
    }
})

const getTeacher = (async (req, res) => {
    try {
        const teacherId = req.user.id;

        const teacher = await prisma.teacher.findUnique({
            where: {
                id: teacherId
            }
        });

        return res.status(200).json({success: teacher});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getSchools = (async (req, res) => {
    try {
        const teacherId = req.user.id;
        
        const schools = await prisma.teacher.findUnique({
            where: {
                id: teacherId
            },
            select: {
                Employment: {
                    select: {
                        school: true
                    }
                }
            }
        });

        return res.status(200).json({success: {schools: schools.Employment} });
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const assignTeacherToSubject = (async (req, res) => {
    res.json("ToDo: Assign Teacher with id: " + req.params.teacherId + " to Subject with id: " + "from body parameters")
})

const getSubjects = (async (req, res) => {
    try {
        const teacherId = req.user.id;
        
        const subjects = await prisma.teacher.findUnique({
            where: {
                id: teacherId
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
    addTeacher, 
    getTeacher, 
    getSchools, 
    assignTeacherToSubject, 
    getSubjects
}