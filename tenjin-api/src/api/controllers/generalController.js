const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { exclude } = require('../utils');
const { validateLogin } = require('../validators/loginValidator');

const login = (async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).json({errors: error.details});
    }

    let user = await prisma.student.findUnique({
        where: {
            email: req.body.email
        }
    });
    let role = "student";

    if (!user) {
        user = await prisma.teacher.findUnique({
            where: {
                email: req.body.email
            }
        });
        role = "teacher";

        if (!user) {
            user = await prisma.school.findUnique({
                where: {
                    email: req.body.email
                }
            });
            role = "school";
        }
    }

    if (!user) {
        return res.status(400).json({error: 'User not found'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({error: 'Password is not correct'});
    }

    const token = jwt.sign({id: user.id, role: role}, process.env.TOKEN_SECRET);

    res.status(200).header('auth-token', token).json({success: {token: token}});
})

const getSchoolInfo = (async (req, res) => {
    try {
        const schoolId = req.params.schoolId;

        const school = await prisma.school.findUnique({
            where: {
                id: schoolId
            }
        });

        const schoolWithoutPassword = exclude(school, ['password']);

        return res.status(200).json({success: schoolWithoutPassword});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const getTeacherInfo = (async (req, res) => {
    try {
        const teacherId = req.params.teacherId;

        const teacher = await prisma.teacher.findUnique({
            where: {
                id: teacherId
            },
            select: {
                name: true,
                surname: true,
                email: true,
                Employment: {
                    select: {
                        school: { select: { name: true } },
                        year: true
                    }
                }
            }
        });

        //const teacherWithoutPassword = exclude(teacher, ['password']);

        return res.status(200).json({success: teacher});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const addSubject = (async (req, res) => {
    try {
        const subjectData = req.body;
        const subject = await prisma.subject.create({data: subjectData});
        return res.status(201).json({success: {id: subject.id}});
    } catch (e) {
        return res.status(500).json({error: e});
    }
})

const addSubjects = (async (req, res) => {
    try {
        req.body.forEach(async function (subjectData) {
            try {
                await prisma.subject.create({
                    data: subjectData
                });
            } catch (e) {
                return res.status(500).json({error: e});
            }
        });
    } catch (e) {
        return res.status(500).json({error: e});
    }
    res.status(201).json({success: "Massive Subject creation was successful" });
})


module.exports = {
    login, 
    getSchoolInfo, 
    getTeacherInfo,
    addSubject,
    addSubjects
}