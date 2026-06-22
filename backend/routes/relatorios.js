const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   RELATÓRIO USUÁRIOS
*/
router.get("/usuarios", (req, res) => {
  const sql = `
    SELECT
      id,
      nome,
      email,
      tipo,
      ativo,
      created_at
    FROM usuarios
    ORDER BY id ASC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json(rows);
  });
});

/*
   RELATÓRIO ESTABELECIMENTOS
*/
router.get("/estabelecimentos", (req, res) => {
  const sql = `
    SELECT
      id,
      nome,
      categoria,
      endereco,
      ativo,
      usuario_id
    FROM estabelecimentos
    ORDER BY nome ASC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json(rows);
  });
});

/*
   RELATÓRIO EVENTOS
*/
router.get("/eventos", (req, res) => {
  const sql = `
    SELECT
      id,
      titulo,
      categoria,
      data_evento,
      aprovado
    FROM eventos
    ORDER BY data_evento DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json(rows);
  });
});

/*
   RELATÓRIO PROMOÇÕES
*/
router.get("/promocoes", (req, res) => {
  const sql = `
    SELECT
      id,
      titulo,
      descricao,
      estabelecimento_id,
      usuario_id,
      created_at
    FROM promocoes
    ORDER BY created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json(rows);
  });
});

module.exports = router;
