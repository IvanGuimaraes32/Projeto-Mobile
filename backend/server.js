const express = require("express");
const cors = require("cors");

const db = require("./database");

const usuariosRoutes = require("./routes/usuarios");
const estabelecimentosRoutes = require("./routes/estabelecimentos");
const eventosRoutes = require("./routes/eventos");

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/estabelecimentos", estabelecimentosRoutes);
app.use("/eventos", eventosRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend Guia Aero Rancho funcionando"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});