const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   ROTA TEMPORÁRIA PARA VERIFICAR TABELAS
*/
router.get("/check-db", (req, res) => {
  db.all(
    `
    SELECT name
    FROM sqlite_master
    WHERE type='table'
  `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    }
  );
});

module.exports = router;