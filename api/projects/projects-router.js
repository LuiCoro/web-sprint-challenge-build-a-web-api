// Write your "projects" router here!

const express = require('express');

const Project = require('./projects-model')

const router = express.Router()

// [GET] /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.get()
    if (!projects) {
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

    if (!projectById) {
      res.status(404).json({message: 'no project with given id'})
    } else {
      res.status(200).json(projectById)
    }

  } catch (err) {
    res.status(500).json({message: 'Error with the request'})
  }
})

// [POST] /api/projects
router.post('/', async (req, res) => {
  const {name, description} = req.body
  try {
    if (!name || !description) {
      res.status(400).json({message: 'You need a name and description!'})
    } else {
      const newProject = await Project.insert({name, description})
      res.status(201).json(newProject)
    }

  } catch (err) {
    res.status(500).json({message: 'Error with the request'})
  }
})

// [PUT] /api.projects/:id
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {name, description} = req.body

    if (!name || !description) {
      res.status(400).json({message: 'Need a name and description!'})
    } else {
      const updatedProject = await Project.update(id, {name, description})

      if (!updatedProject) {
        res.status(404).json({message: 'User does not exist'})
      } else {
        res.status(200).json(updatedProject)
      }
    }

  } catch (err) {
    res.status(500).json({message: 'Error with the request'})
  }
})


// [DELETE] /api/projects/:id
router.delete('/:id', async (req, res) => {
  try{
    const {id} = req.params
    const deletedProject = await Project.remove(id)

    if(!deletedProject){
      res.status(404).json({ message: 'The project with the specified ID does not exist' })
    } else {
      res.status(200).json()
    }
  } catch (error) {
    res.status(500).json({ message: ' The post could not be removed' })
  }
})

// [GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
  try{
    const {id} = req.params
    const actionByProject = await Project.getProjectActions(id)

    if(!actionByProject){
      res.status(404).json({ message: 'The project with the specified ID does not exist' })
    } else {
      res.status(200).json(actionByProject)
    }

  } catch (error) {
    res.status(500).json({ message: 'The actions information could not be retrieved ' })
  }
})

module.exports = router


// GET USERS BY ID
// POST PROJECTS
// PUT PROJECTS BY ID
// DELETE BY ID
// READ ( README )!