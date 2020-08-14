
exports.seed = function(knex) {
 
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries to projects
      return knex('projects').insert([
        {id: 1, name: 'Moving to new house', description: "Need to make plan prepare for the new house", completed: false},
        {id: 2, name: 'Finish the sprint chanllange', description: "Need to make plan to study for material", completed: false},
        {id: 3, name: 'Finish module projects', description: "Need to make plan, go through training kit", completed: false}
      ]);
    });
};
