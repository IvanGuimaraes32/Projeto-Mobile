const express = require("express");
const router = express.Router();
const db = require("../database");


/*
   CADASTRAR USUÁRIO
*/
router.post("/register", (req, res) => {

  const {
    nome,
    email,
    senha,
    tipo
  } = req.body;

  const sql = `
    INSERT INTO usuarios
    (
      nome,
      email,
      senha,
      tipo
    )
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      nome,
      email,
      senha,
      tipo
    ],
    function(err){

      if(err){
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        message: "Usuário cadastrado com sucesso",
        id: this.lastID
      });

    }
  );

});


/*
   LOGIN
*/
router.post("/login", (req, res) => {

  const {
    email,
    senha
  } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE email = ?
    AND senha = ?
  `;

  db.get(
    sql,
    [email, senha],
    (err, row) => {

      if(err){
        return res.status(500).json({
          error: err.message
        });
      }

      if(!row){
        return res.status(401).json({
          message: "Usuário não encontrado"
        });
      }

      res.json({
        message: "Login realizado com sucesso",
        usuario: row
      });

    }
  );

});

module.exports = router;