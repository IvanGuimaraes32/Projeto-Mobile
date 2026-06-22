const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   LISTAR EVENTOS
*/
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM eventos
    WHERE aprovado = 1
    ORDER BY destaque DESC, data_evento ASC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
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
    categoria,
    descricao,
    data_evento,
    endereco,
    valor_entrada,
    link_ingresso,
    usuario_id,
  } = req.body;

  const sql = `
    INSERT INTO eventos
    (
      titulo,
      categoria,
      descricao,
      data_evento,
      endereco,
      valor_entrada,
      link_ingresso,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      titulo,
      categoria,
      descricao,
      data_evento,
      endereco,
      valor_entrada,
      link_ingresso,
      usuario_id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Evento criado com sucesso",
        id: this.lastID,
      });
    }
  );
});

/*
   APROVAR EVENTO (ADMIN)
*/
router.post("/aprovar", (req, res) => {
  const { evento_id } = req.body;

  const sql = `
    UPDATE eventos
    SET aprovado = 1
    WHERE id = ?
  `;

  db.run(sql, [evento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Evento aprovado com sucesso",
      changes: this.changes,
    });
  });
});

/*
   RECUSAR EVENTO (ADMIN)
*/
router.post("/recusar", (req, res) => {
  const { evento_id } = req.body;

  const sql = `
    UPDATE eventos
    SET aprovado = -1
    WHERE id = ?
  `;

  db.run(sql, [evento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Evento recusado com sucesso",
      changes: this.changes,
    });
  });
});

/*
   LISTAR EVENTOS PENDENTES (ADMIN)
*/
router.get("/pendentes", (req, res) => {
  const sql = `
    SELECT *
    FROM eventos
    WHERE aprovado = 0
    ORDER BY created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(rows);
  });
});

module.exports = router;