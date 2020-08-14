
exports.seed = function(knex) {
  debugger
   return knex('resources').truncate()
     .then(function () {
       // Inserts seed entries to the resource table
       return knex('resources').insert([
         {id: 1, project_id: 1, resource_name: "Book", description: "To note and write some plan up" },
         {id: 2, project_id: 1, resource_name: "Pencil", description: "To lecture some material that I do not understand" },
         {id: 3, project_id: 1, resource_name: "Notebook", description: "Writing the address and stuff that have to be done" }
       ]);
     });
 };
 