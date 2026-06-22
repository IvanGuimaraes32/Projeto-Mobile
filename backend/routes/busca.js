const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   BUSCA GLOBAL
*/
router.get("/:termo", (req, res) => {
  const { termo } = req.params;

  const busca = `%${termo}%`;

  const sql = `
    SELECT
      id,
      nome AS titulo,
      categoria,
      'estabelecimento' AS tipo
    FROM estabelecimentos
    WHERE nome LIKE ?

    UNION

    SELECT
      id,
      titulo,
      categoria,
      'evento' AS tipo
    FROM eventos
    WHERE titulo LIKE ?

    UNION

    SELECT
      promocoes.id,
      promocoes.titulo,
      '' AS categoria,
      'promocao' AS tipo
    FROM promocoes
    WHERE titulo LIKE ?
  `;

  db.all(sql, [busca, busca, busca], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json(rows);
  });
});

module.exports = router;