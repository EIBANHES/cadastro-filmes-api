const sqliteConnection = require("../../sqlite")

async function migrationsRun() {
  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}
module.exports = migrationsRun;