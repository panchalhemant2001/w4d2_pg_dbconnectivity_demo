const settings = require('./settings_knex');

const knex = require('knex')(settings);

function addNewFamousPerson(first_name, last_name, dob) {
  var person = {
    first_name: first_name,
    last_name: last_name,
    birthdate: dob
  }

  knex('famous_people').insert(person)
  .then( function (result) {
      //console.log(result);
      console.log("New Person added successfully...");
      knex.destroy();
   })
  .catch(function(err) {
    console.error(err);
  });
}


if(process.argv.length < 5){
  console.log("Not enough arguments...")
} else {
  let first_name = process.argv[2];
  let last_name = process.argv[3];
  let dob = process.argv[4];

  addNewFamousPerson(first_name, last_name, dob);
}



