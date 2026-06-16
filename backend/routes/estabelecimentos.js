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
   BUSCAR UM ESTABELECIMENTO PELO ID
*/
router.get("/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT * FROM estabelecimentos
    WHERE id = ?
  `;

  db.get(sql, [id], (err, row) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(row);

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
      telefone_whatsapp,
      imagem,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      nome,
      categoria,
      descricao,
      endereco,
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
   ATUALIZAR ESTABELECIMENTO
*/
router.put("/:id", (req, res) => {

  const { id } = req.params;

  const {
    nome,
    categoria,
    descricao,
    endereco,
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
   DELETAR ESTABELECIMENTO
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