// Write your "projects" router here!

const express = require('express');

const Project = require('./projects-model')

const router = express.Router()

// [GET] /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.get()
    if(!projects) {
      res.status(200).json([])
    } else {
      res.status(200).json(projects)
    }
  } catch (err) {
    res.status(500).json({message: 'Error with the request'})
  }
})

// [GET] /api/projects/:id
router.get('/:id', async (req, res) => {
  try {

    const {id} = req.params
    const projectById = await Project.get(id)

    if(!projectById) {
      res.status(404).json({message: 'no project with given id'})
    } else {
      res.status(200).json(projectById)
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