const db = require('../../dbConfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
  getResourceProject,
  findProject
};

function get(id) {
  let query = db('resources');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((resource) => {
        if (resource) {
          return mappers.resourcesTobody(resource);
        } else {
          return null;
        }
      });
  } else {
    return query.then((resources) => {
      return resources.map((resource) => mappers.resourcesTobody(resource));
    });
  }
}

function insert(resource) {
  return db('resources')
    .insert(resource, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('resources')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('resources').where('id', id).del();
}
// find project by resource Id
function findProject(id){
    let query = db('project');
    if(id) {
        query
        .join('resources')
        .where('projects.id', id)
        .first();
        const promise = [query, getResourceProject(id)];
        return Promise.all(promise)
            .then( results => {
                const [projects,  resources] = results;
                if (projects){
                    projects.resources= resources;
                    return mappers.resourcesTobody(projects);
                }else{
                    return null;
                }
            });
        
    }else{
        return query.then(project=> {
            return project.map(pro => mappers.resourcesTobody(pro));
        })
    }
    
}

function getResourceProject (projectId){
    return db('projects')
    .join('resources')
    .where('resources.id',projectId)
    .then(projects => projects.map(resource => mappers.projectToBody(resource)));
}