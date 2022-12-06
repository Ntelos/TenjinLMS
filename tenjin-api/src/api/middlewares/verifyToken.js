const jwt = require('jsonwebtoken');

const authenticate = ((req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid authentication token' });
    }
})

const verifySchool = ((req, res, next) => {
    if (req.user.role != 'school') {
        return res.status(401).json({ error: 'Access denied due to role restrictions' });
    }
    next();
})

const verifyTeacher = ((req, res, next) => {
    if (req.user.role != 'teacher') {
        return res.status(401).json({ error: 'Access denied due to role restrictions' });
    }
    next();
})

const verifyStudent = ((req, res, next) => {
    if (req.user.role != 'student') {
        return res.status(401).json({ error: 'Access denied due to role restrictions' });
    }
    next();
})

const verifyRoleSet = (roleSet) => {
    return (req, res, next) => {
        if (!roleSet.includes(req.user.role)) {
            return res.status(401).json({ error: 'Access denied due to role restrictions' });
        }
        next();
    }
  }

module.exports = {
    authenticate,
    verifyRoleSet,
    verifySchool,
    verifyTeacher,
    verifyStudent
}