const pg = require("pg");
const settings = require("./settings");

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

  let name = process.argv[2];
  //console.log(name);

  client.query("select * from famous_people where first_name=$1 or last_name=$1", [name], (err, result) => {

    console.log("Searching ...");
    if(err) {
      console.log("Error running query", err);
    }

      console.log("Found " + result.rows.length + " person(s) by the name " + name);

      for(let i = 0; i < result.rows.length; i++) {
        console.log("- " + (i+1) + ": " + result.rows[i].first_name +
          " " + result.rows[i].last_name + ", born " +
          "'" + result.rows[i].birthdate.toISOString().substr(0,10) + "'");
      }

      client.end();
  });
});