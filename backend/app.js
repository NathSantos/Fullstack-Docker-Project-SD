const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/index");
const cidadesRoutes = require("./routes/cidades");
const paisesRoutes = require("./routes/paises");
const compareRoutes = require("./routes/compare");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", homeRoutes);
app.use("/api/cidades", cidadesRoutes);
app.use("/api/paises", paisesRoutes);
app.use("/api/compare", compareRoutes);

module.exports = app;
