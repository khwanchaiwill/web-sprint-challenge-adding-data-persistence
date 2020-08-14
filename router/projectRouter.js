const express = require('express');

const Projects = require('../data/helper/projects');
const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(Projects => {
    res.json(Projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Projects' }, err);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.findById(id)
  .then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Projects' },err);
  });
});

router.get('/:id/tasks',(req, res) => {
  const { id } = req.params;
  Projects.findTask(id)
  .then(task => {
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.post('/', (req, res) => {
  const projectData = req.body;
  Projects.add(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.get('/:id/resources',(req, res) => {
    const { id } = req.params;
    Projects.findResource(id)
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Could not find task for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });
  
  router.post('/', (req, res) => {
    const projectData = req.body;
    Projects.add(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
  });

router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  console.log(taskData)
  const { id } = req.params; 
  taskData.project_id = Number(id);
  
  Projects.findById(id)
  .then(project => {
    console.log(project)
    if (project) {
      Projects.addTask(taskData, id)
      .then(task => {
        res.status(201).json(task);
      })
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findById(id)
  .then(project => {
    if (project) {
      Projects.update(changes, id)
      .then(updatedproject => {
        res.json(updatedproject);
      });
    } else {
      res.status(404).json({ message: project });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

router.delete('/:id', (req, res) => {
const id = req.params.id;
const body = req.body
  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(200).json({ removed: id, body});
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});


module.exports = router;