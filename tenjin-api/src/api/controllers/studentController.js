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

})

const getGrades = (async (req, res) => {

})

const getAbsences = (async (req, res) => {

})

const getSubjects = (async (req, res) => {

})

const getAssignments = (async (req, res) => {

})


module.exports = {
    addStudent, 
    getStudent, 
    getPoints, 
    getClassroom, 
    getGrades, 
    getAbsences, 
    getSubjects, 
    getAssignments
}