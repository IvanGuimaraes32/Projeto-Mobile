const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   ACOMPANHAR ESTABELECIMENTO
*/
router.post("/", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.body;

  const verificarSql = `
    SELECT *
    FROM favoritos
    WHERE usuario_id = ?
    AND estabelecimento_id = ?
  `;

  db.get(verificarSql, [usuario_id, estabelecimento_id], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (row) {
      return res.status(400).json({
        error: "Você já acompanha este estabelecimento",
      });
    }

    const insertSql = `
        INSERT INTO favoritos
        (
          usuario_id,
          estabelecimento_id
        )
        VALUES (?, ?)
      `;

    db.run(insertSql, [usuario_id, estabelecimento_id], function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Acompanhamento realizado com sucesso",
      });
    });
  });
});

/*
   VERIFICAR SE USUÁRIO SEGUE ESTABELECIMENTO
*/
router.get("/verificar/:usuario_id/:estabelecimento_id", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.params;

  const sql = `
    SELECT *
    FROM favoritos
    WHERE usuario_id = ?
    AND estabelecimento_id = ?
  `;

  db.get(sql, [usuario_id, estabelecimento_id], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json({
      seguindo: !!row,
    });
  });
});

/*
   LISTAR ESTABELECIMENTOS QUE USUÁRIO ACOMPANHA
*/
router.get("/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT
      favoritos.id,
      estabelecimentos.id as estabelecimento_id,
      estabelecimentos.nome,
      estabelecimentos.categoria,
      estabelecimentos.endereco

    FROM favoritos

    INNER JOIN estabelecimentos
      ON favoritos.estabelecimento_id = estabelecimentos.id

    WHERE favoritos.usuario_id = ?
  `;

  db.all(sql, [usuario_id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(rows);
  });
});

/*
   PARAR DE ACOMPANHAR
*/
router.delete("/", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.body;

  const sql = `
    DELETE FROM favoritos
    WHERE usuario_id = ?
    AND estabelecimento_id = ?
  `;

  db.run(sql, [usuario_id, estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Acompanhamento removido com sucesso",
    });
  });
});

module.exports = router;
