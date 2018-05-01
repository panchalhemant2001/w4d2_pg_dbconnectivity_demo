let daModule = require("./dataAccessModule");

let nameToSearch = process.argv[2];
daModule.connectToTestDB(daModule.printPeople, nameToSearch);

