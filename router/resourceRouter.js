const express = require('express');

const router = express.Router();

const ProjectsDB = require('../data/helper/projects');
const TasksDB = require('../data/helper/tasks');
const ResourceDB = require('../data/helper/resource')

const db = require('../dbConfig')

router.get('/', (req, res) => {
  // do your magic!

  ResourceDB.get()
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

router.get('/:id', validateResourceId, (req, res) => {
  // do your magic!
  ResourceDB.get(req.resource.id)
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

router.get('/:id/projects', validateResourceId, (req, res) => {
    const { id } = req.params;
    ResourceDB.getResourceProject(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find task for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get project' });
    });
  });
  
  router.post('/', (req, res) => {
    const resourceData = req.body;
    ResourceDB.insert(resourceData)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
  });

router.post('/:id', validateProjectsId, ( req, res) => {
   
    const id = req.params.id; 
      console.log(req.params.id)
      const resource = req.body;
      resource.project_id = Number(id);
  ResourceDB.insert(resource)
      .then(act => {
        res.status(201).json(act)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
   
  });

  // post to task directly 
  router.post('/:id/tasks', validateTaskId, ( req, res) => {
   
    const id = req.params.id; 
      console.log(req.params.id)
      const resource = req.body;
    //   resource.project_id = Number(id);
  ResourceDB.insert(resource)
      .then(act => {
        res.status(201).json(act)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
   
  });


router.delete('/:id', validateResourceId, (req, res) => {
    const id = req.params.id
  const body = req.body
  ResourceDB.remove(id)
  .then(move => {
    if(move > 0){
      res.status(200).json({
        message: id, body
      })
    }else{
      res.status(404)
      .json({
        message: "Can not found resources"
      })
    }
   
  })
  .catch(err =>{
     res.status(500)
     .json({
    message: " Error while processing to remove the resources"
  }, err)
  })
 

});

router.put('/:id', validateResourceId, (req, res) => {
  
  const newUpdate = req.body;
  ResourceDB.update(req.resource.id, newUpdate)
      .then(actionUpdate => {
          res.status(200).json(actionUpdate)
      })
      .catch(err => {
          res.status(500).json({ error: "The post information could not be modified." }, err)
      })
});

// custom middleware

function validateResourceId(req, res, next) {
  // do your magic!
  ResourceDB.get(req.params.id)
  .then(resource => {
    if(resource){
      req.resource = resource;
      next();
    }else if (!resource){
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
  

  
module.exports = router;
