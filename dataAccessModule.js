//module containing database connectivity functions
const pg = require("pg");
const settings = require("./settings");

function connectToTestDB(callback, options) {
    const client = new pg.Client({
      user: settings.user,
      password: settings.password,
      database: settings.database,
      host: settings.hostname,
      port: settings.port,
      ssl: settings.ssl
    });

    client.connect((err) => {
    if(err) {
      return console.error("Connection Error", err);
    }
    callback(client, options);
  });
}

function printPeople (client, options) {
  let nametosearch = options;
  client.query("select * from famous_people where first_name=$1 or last_name=$1", [nametosearch], (err, result) => {
      console.log("Searching ...");
      if(err) {
        console.log("Error running query", err);
      }

      console.log("Found " + result.rows.length + " person(s) by the name " + nametosearch);

      for(let i = 0; i < result.rows.length; i++) {

        console.log("- " + (i+1) + ": " + result.rows[i].first_name +
          " " + result.rows[i].last_name + ", born " +
          "'" + result.rows[i].birthdate.toISOString().substr(0,10) + "'");
      }

      client.end();
    });
  }


module.exports = {
  connectToTestDB: connectToTestDB,
  printPeople: printPeople
};