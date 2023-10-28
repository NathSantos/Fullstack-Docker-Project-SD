const mongoose = require("mongoose")
const {cidadesDB} = require("../db1");

const Cidades = cidadesDB.model('Cidades', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Cidades; 