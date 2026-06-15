const express = require("express");
const router = express.Router();
const db = require("../database");


/*
   LISTAR TODOS ESTABELECIMENTOS
*/
router.get("/", (req, res) => {
  console.log("REQUISIÇÃO RECEBIDA DO APP");
  const sql = "SELECT * FROM estabelecimentos";

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
   CADASTRAR ESTABELECIMENTO
*/
router.post("/", (req, res) => {

  const {
    nome,
    categoria,
    descricao,
    endereco,
    latitude,
    longitude,
    telefone_whatsapp,
    imagem,
    usuario_id
  } = req.body;

  const sql = `
    INSERT INTO estabelecimentos
    (
      nome,
      categoria,
      descricao,
      endereco,
      latitude,
      longitude,
      telefone_whatsapp,
      imagem,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      nome,
      categoria,
      descricao,
      endereco,
      latitude,
      longitude,
      telefone_whatsapp,
      imagem,
      usuario_id
    ],
    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        message: "Estabelecimento cadastrado com sucesso",
        id: this.lastID
      });

    }
  );
});


/*
   Essa parte abaixo é para atualizar estabelecimentos.
*/
router.put("/:id", (req, res) => {

  const { id } = req.params;

  const {
    nome,
    categoria,
    descricao,
    endereco,
    latitude,
    longitude,
    telefone_whatsapp,
    imagem
  } = req.body;

  const sql = `
    UPDATE estabelecimentos
    SET
      nome = ?,
      categoria = ?,
      descricao = ?,
      endereco = ?,
      latitude = ?,
      longitude = ?,
      telefone_whatsapp = ?,
      imagem = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [
      nome,
      categoria,
      descricao,
      endereco,
      latitude,
      longitude,
      telefone_whatsapp,
      imagem,
      id
    ],
    function(err){

      if(err){
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        message: "Estabelecimento atualizado com sucesso"
      });

    }
  );

});

/*
   E aqui para deletar.
*/
router.delete("/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM estabelecimentos
    WHERE id = ?
  `;

  db.run(
    sql,
    [id],
    function(err){

      if(err){
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        message: "Estabelecimento removido com sucesso"
      });

    }
  );

});

module.exports = router;