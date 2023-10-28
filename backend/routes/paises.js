const express = require("express");
const validateId = require("../middleware/validateId");
const Paises = require("../models/Paises");

const router = express.Router();

router.get("/", async (req, res) => {
  const paises = await Paises.find().sort("title");
  res.send(paises);
});

router.get("/:id", validateId, async (req, res) => {
  const pais = await Paises.findById(req.params.id);
  if (!pais) return res.status(404).send();
  res.send(pais);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("O título é obrigatório.");

  const pais = new Paises({ title: req.body.title });
  await pais.save();
  res.status(201).send(pais);
});

router.delete("/:id", async (req, res) => {
  const pais = await Paises.findByIdAndDelete(req.params.id);

  if (!pais)
    return res.status(404).send("O país com o ID fornecido não foi encontrado.");

  res.status(204).send();
});

module.exports = router;
