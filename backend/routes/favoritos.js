const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   FOLLOW / UNFOLLOW AUTOMÁTICO
*/
router.post("/", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.body;

  /*
     VERIFICA SE JÁ SEGUE
  */
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

    /*
       SE JÁ EXISTE → PARA DE SEGUIR
    */
    if (row) {
      const deleteSql = `
        DELETE FROM favoritos
        WHERE usuario_id = ?
        AND estabelecimento_id = ?
      `;

      db.run(deleteSql, [usuario_id, estabelecimento_id], function (err) {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }

        return res.json({
          message: "Você deixou de seguir este estabelecimento",
          seguindo: false,
        });
      });

      return;
    }

    /*
       SE NÃO EXISTE → COMEÇA A SEGUIR
    */
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

      return res.json({
        message: "Agora você segue este estabelecimento",
        seguindo: true,
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
   LISTAR ESTABELECIMENTOS QUE USUÁRIO SEGUE
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

    return res.json(rows);
  });
});

module.exports = router;
