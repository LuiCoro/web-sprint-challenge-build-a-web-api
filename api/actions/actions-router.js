// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model')

const router = express.Router()

// [GET] /api/actions
router.get('/', async(req, res) => {
  const actionList = await Actions.get()
  res.status(200).json(actionList)
})

// [GET] /api/actions/:id
router.get('/:id', async(req,  res) => {

  try{
    const {id} = req.params
    const actionsById = await Actions.get(id)
    if(!actionsById) {
      res.status(404).json('there is no action with the given ID!')
    } else {
      res.status(200).json(actionsById)
    }

  } catch (err) {
    res.status(500).json({message: 'Error trying to get action from server'})
  }
})

// [POST] /api/actions
router.post('/', async(req, res) => {
  const {project_id , description, notes} = req.body
  try {
    if(!project_id || !description || !notes) {
      res.status(400).json({message: 'Needs to have a project_id , description , and notes!'})
    } else {
      const newAction = await Actions.insert({project_id, description , notes})
      res.status(201).json(newAction)
    }
  } catch (err) {
    res.status(500).json({message: 'Error trying to get action from server'})
  }
})

// [PUT] /api/actions/:id
router.put('/:id' , async (req, res) => {
  try{
    const {id} = req.params
    const {project_id,description, notes} = req.body

    if(!project_id || !description || !notes) {
      res.status(400).json({message: 'Needs to have a project_id , description , and notes!'})
    } else {
      const UpdatedAction = await Actions.update(id, {project_id, description, notes})

      if(!UpdatedAction) {
        res.status(404).json({ message: 'The user ID does not exist'})
      } else {
        res.status(200).json(UpdatedAction)
      }
    }
  } catch (err) {
    res.status(500).json({message: 'Error trying to get action from server'})
  }
})

// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const deleteAction = await Actions.remove(id)
    if(!deleteAction) {
      res.status(404).json({ message: 'The user ID does not exist'})
    } else {
      res.status(200).json()
    }

  } catch (err) {
    res.status(500).json({message: 'Error trying to get action from server'})
  }
})

module.exports = router