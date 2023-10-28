const mongoose = require("mongoose");

const dbUrl = "mongodb://db-cidades/volume1";

const cidadesDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Conectado ao MongoDB-Cidades: " + dbUrl);


const close = () => cidadesDB.close();

module.exports = { cidadesDB, close, url: dbUrl };