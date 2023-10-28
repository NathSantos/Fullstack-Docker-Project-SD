const mongoose = require('mongoose');
const {paisesDB} = require("../db2");

const Paises = paisesDB.model('Paises', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Paises; 