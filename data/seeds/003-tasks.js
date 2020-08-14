
exports.seed = function(knex) {
 
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries for tasks
      return knex('tasks').insert([
        { 
          id: 1,
          project_id: 1, 
          resources_id: 1, 
          task_name: "Plans", 
          description: "Write the plan how to make thing done step by step", 
          notes: "Need some resource", 
          completed: false
        },
        { 
          id: 2,
          project_id: 1, 
          resources_id: 1, 
          task_name: "Pack", 
          description: "organize stuff before pack", 
          notes: "Need some box", completed: false
        },
        { 
          id: 3,
          project_id: 3, 
          resources_id: 1, 
          task_name: "Study training kit", 
          description: "Log in to the dashboard to study in training kit and guided project", 
          notes: "Guided project for the project day", 
          completed: false}
      ]);
    });
};
 