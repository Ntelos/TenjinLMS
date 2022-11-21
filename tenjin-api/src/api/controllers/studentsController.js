const addStudent = ((req, res) => {
    res.json("ToDo: Register a Student")
})

const getStudent = ((req, res) => {
    res.json("ToDo: Get info of Student with id: " + req.params.studentId)
})

const addStudentToClass = ((req, res) => {
    res.json("ToDo: Add Student with id: " + req.params.studentId + " to Class with id: " + "from body parameters")
})

const getGrades = ((req, res) => {
    res.json("ToDo: Get Grades of Student with id: " + req.params.studentId)
})

const getAbsences = ((req, res) => {
    res.json("ToDo: Get Absences of Student with id: " + req.params.studentId)
})

const getPoints = ((req, res) => {
    res.json("ToDo: Get Points of Student with id: " + req.params.studentId)
})

const addGrade = ((req, res) => {
    res.json("ToDo: Add Grade from body for Student with id: " + req.params.studentId)
})

const addAbsences = ((req, res) => {
    res.json("ToDo: Add Absence from body for Student with id: " + req.params.studentId)
})

const addPoints = ((req, res) => {
    res.json("ToDo: Add Points from body for Student with id: " + req.params.studentId)
})

const getClass = ((req, res) => {
    res.json("ToDo: Get Class of Student with id: " + req.params.studentId)
})


module.exports = {
    addStudent, 
    getStudent, 
    addStudentToClass, 
    getGrades, 
    getAbsences, 
    getPoints, 
    addGrade, 
    addAbsences, 
    addPoints, 
    getClass
}