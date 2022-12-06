const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const massPopulation = (async (req, res) => {
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

const getAssignments = (async (req, res) => {
    res.json("ToDo: Get Assignments of Subject");
})

const addAssignment = (async (req, res) => {
    res.json("ToDo: Add Assignment for Subject");
})


module.exports = {
    massPopulation, getAssignments, addAssignment
}