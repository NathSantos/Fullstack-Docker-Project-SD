const express = require("express");
const Cidade = require("../models/Cidades");
const Pais = require("../models/Paises");

const router = express.Router();

router.get("/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const [cidade, pais] = await Promise.all([
      Cidade.findOne({ title }),
      Pais.findOne({ title }),
    ]);

    if (cidade && pais) {
      res.send({
        cidade,
        pais,
      });
    } else if (cidade) {
      res.send({
        cidade,
        pais: null,
      });
    } else if (pais) {
      res.send({
        cidade: null,
        pais,
      });
    } else {
      res.send({
        cidade: null,
        pais: null,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


module.exports = router;