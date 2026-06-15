const express = require("express");
const router = express.Router();
const db = require("../database");


/*
   LISTAR EVENTOS
*/
router.get("/", (req, res) => {

  const sql = "SELECT * FROM eventos";

  db.all(sql, [], (err, rows) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(rows);

  });

});


/*
   CADASTRAR EVENTO
*/
router.post("/", (req, res) => {

  const {
    titulo,
    descricao,
    data_evento,
    local,
    telefone,
    imagem,
    usuario_id
  } = req.body;

  const sql = `
    INSERT INTO eventos
    (
      titulo,
      descricao,
      data_evento,
      local,
      telefone,
      imagem,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      titulo,
      descricao,
      data_evento,
      local,
      telefone,
      imagem,
      usuario_id
    ],
    function(err){

      if(err){
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        message: "Evento criado com sucesso",
        id: this.lastID
      });

    }
  );

});

module.exports = router;