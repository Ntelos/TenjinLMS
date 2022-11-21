const addSchool = ((req, res) => {
    res.json("ToDo: Register a School")
})

const getSchool = ((req, res) => {
    res.json("ToDo: Get info of School with id: " + req.params.schoolId)
})

const getStudents = ((req, res) => {
    res.json("ToDo: Get Students of School with id: " + req.params.schoolId)
})

const addStudent = ((req, res) => {
    res.json("ToDo: Enroll a Student for School with id: " + req.params.schoolId)
})

const getTeachers = ((req, res) => {
    res.json("ToDo: Get Teachers of School with id: " + req.params.schoolId)
})

const addTeacher = ((req, res) => {
    res.json("ToDo: Employ a Teacher for School with id: " + req.params.schoolId)
})

const getClasses = ((req, res) => {
    res.json("ToDo: Get Classes of School with id: " + req.params.schoolId)
})

const addClass = ((req, res) => {
    res.json("ToDo: Add a Class for School with id: " + req.params.schoolId)
})

const getSubjects = ((req, res) => {
    res.json("ToDo: Get Subjects of School with id: " + req.params.schoolId)
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