
exports.up = function(knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments('id');
        tbl.string('name', 255).notNullable().unique();
        tbl.text('description').notNullable();
        tbl.boolean('completed').defaultTo(false);

    })    
    .createTable('resources', tbl => {
        tbl.increments('id');
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');   
        tbl.string('resource_name',255).notNullable().unique();
        tbl.string('description').notNullable();
    })
    .createTable('tasks', tbl => {
        tbl.increments('id');
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('projects.id')
            // .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');   
        tbl.integer('resources_id')
            .unsigned()
            .notNullable()
            .references('resources.id')
            // .inTable('resources')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');   
        tbl.string('task_name').notNullable();
        tbl.string('description').notNullable();
        tbl.text('notes');
        tbl.boolean('completed').defaultTo(false);    
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExistes('tasks')
        .dropTableIfExistes('resources')
        .dropTableIfExistes('projects');

};
