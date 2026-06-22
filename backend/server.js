const express = require("express");
const cors = require("cors");

const db = require("./database");

const usuariosRoutes = require("./routes/usuarios");
const estabelecimentosRoutes = require("./routes/estabelecimentos");
const eventosRoutes = require("./routes/eventos");
const favoritosRoutes = require("./routes/favoritos");
const debugRoutes = require("./routes/debug");
const promocoesRoutes = require("./routes/promocoes");
const relatoriosRoutes = require("./routes/relatorios");
const buscaRoutes = require("./routes/busca");

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/estabelecimentos", estabelecimentosRoutes);
app.use("/eventos", eventosRoutes);
app.use("/favoritos", favoritosRoutes);
app.use("/debug", debugRoutes);
app.use("/promocoes", promocoesRoutes);
app.use("/relatorios", relatoriosRoutes);
app.use("/busca", buscaRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend Guia Aero Rancho funcionando",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
