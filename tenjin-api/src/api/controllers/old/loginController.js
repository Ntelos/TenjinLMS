const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


module.exports = {
    login
}