// Write your "projects" router here!

const express = require('express');

const Project = require('./projects-model')

const router = express.Router()

// [GET] /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.get()
    if(!projects) {
      res.status(404).json([])
    } else {
      res.status(200).json(projects)
    }
  } catch (err) {
    res.status(500).json({message: 'Error with the request'})
  }
})



module.exports = router


// GET USERS BY ID
// POST PROJECTS
// PUT PROJECTS BY ID
// DELETE BY ID
// READ ( README )!