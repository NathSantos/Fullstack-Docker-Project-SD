const mongoose = require("mongoose");

const dbUrl = "mongodb://db-paises/volume2";

const paisesDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Conectado ao MongoDB-Paises: " + dbUrl);


const close = () => paisesDB.close();

module.exports = { paisesDB, close, url: dbUrl };
