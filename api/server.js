const express = require('express')
const helmet = require('helmet');
const server = express();

const ProjectRouter = require('../router/projectRouter')
const TaskRouter = require('../router/taskRouter')
const ResourceRouter = require('../router/resourceRouter')
server.use(helmet())
server.use(express.json());


server.use(logger)

server.use('/api/projects', ProjectRouter)
server.use('/api/tasks', TaskRouter)
server.use('/api/resources', ResourceRouter)
server.get('/', (req, res) => {
    res.send('Testing the api')
})

function logger (req, res, next){
    console.log(`${req.method} request the ${req.url}`, Date())
    next();
}

module.exports = server;


