const getStudents = ((req, res) => {
    res.json("ToDo: Get Students of Class with id: " + req.params.classId)
})

const getGrades = ((req, res) => {
    res.json("ToDo: Get Grades of Class with id: " + req.params.classId)
})

const getAbsences = ((req, res) => {
    res.json("ToDo: Get Absences of Class with id: " + req.params.classId)
})

const getSubjects = ((req, res) => {
    res.json("ToDo: Get Subjects of Class with id: " + req.params.classId)
})


module.exports = {
    getStudents, 
    getGrades, 
    getAbsences, 
    getSubjects
}