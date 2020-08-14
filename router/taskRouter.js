const express = require('express');

const router = express.Router();

const ProjectsDB = require('../data/helper/projects');
const TasksDB = require('../data/helper/tasks');

const db = require('../dbConfig')

router.get('/', (req, res) => {
  // do your magic!

  TasksDB.get()
    .then(task => {
      res.status(200).json(task)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      .json({
        message: "Error while you are in process can not get data"
      })
    })

});

router.get('/:id', validateTaskId, (req, res) => {
  // do your magic!
  TasksDB.get(req.task.id)
  .then(taskId => {
    res.status(200).json(taskId)
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    .json({
      message: "Error while you are in process can not get data"
    })
  })
});

router.post('/:id', validateProjectsId, ( req, res) => {
   
    const id = req.params.id; 
      console.log(req.params.id)
      const actions = req.body;
      actions.project_id = Number(id);
  TasksDB.insert(actions)
      .then(act => {
        res.status(201).json(act)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
   
  });

router.delete('/:id', validateTaskId, (req, res) => {
    const id = req.params.id
  const body = req.body
  TasksDB.remove(id)
  .then(move => {
    if(move > 0){
      res.status(200).json({
        message: id, body
      })
    }else{
      res.status(404)
      .json({
        message: "Can not found task"
      })
    }
   
  })
  .catch(err =>{
     res.status(500)
     .json({
    message: " Error while processing to remove the task"
  }, err)
  })
 

});

router.put('/:id', validateTaskId, (req, res) => {
  
  const newUpdate = req.body;
  TasksDB.update(req.task.id, newUpdate)
      .then(actionUpdate => {
          res.status(200).json(actionUpdate)
      })
      .catch(err => {
          res.status(500).json({ error: "The post information could not be modified." }, err)
      })
});

// custom middleware

function validateTaskId(req, res, next) {
  // do your magic!
  TasksDB.get(req.params.id)
  .then(task => {
    if(task){
      req.task = task;
      next();
    }else if (!task){
      res.status(400).json({ message: "invalid user id" })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Err while get Id"
    })
  })
}

function validateProjectsId(req, res, next) {
  
    ProjectsDB.findById(req.params.id)
      .then(pro => {
        if(pro){
          req.pro = pro;
          next();
        }else if (!pro){
          res.status(400).json({ message: "invalid user id" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Err while get Id"
        })
      })
  }
  
module.exports = router;
