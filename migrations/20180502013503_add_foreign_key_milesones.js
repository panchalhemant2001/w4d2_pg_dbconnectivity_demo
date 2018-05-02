
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.bigint('famous_person_id').references('id').inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.dropColumn('famous_person_id');
    })
  ])
};
