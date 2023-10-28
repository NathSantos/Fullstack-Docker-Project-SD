const express = require("express");
const validateId = require("../middleware/validateId");
const Cidades = require("../models/Cidades");

const router = express.Router();

router.get("/", async (req, res) => {
  const cidades = await Cidades.find().sort("title");
  res.send(cidades);
});

router.get("/:id", validateId, async (req, res) => {
  const cidade = await Cidades.findById(req.params.id);
  if (!cidade) return res.status(404).send();
  res.send(cidade);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("O título é obrigatório.");

  const cidade = new Cidades({ title: req.body.title });
  await cidade.save();
  res.status(201).send(cidade);
});

router.delete("/:id", async (req, res) => {
  const cidade = await Cidades.findByIdAndDelete(req.params.id);

  if (!cidade)
    return res.status(404).send("A cidade com o ID informado não foi encontrada.");

  res.status(204).send();
});

module.exports = router;
