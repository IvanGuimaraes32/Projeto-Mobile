const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

/*
   PROTEÇÃO CONTRA BRUTEFORCE LOGIN
*/
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto

  max: 5, // máximo 5 tentativas

  message: {
    error: "Muitas tentativas. Tente novamente em 1 minuto."
  }
});


/*
   CADASTRAR USUÁRIO
*/
router.post("/register", async (req, res) => {

  const {
    nome,
    email,
    senha
  } = req.body;

  try {

    const senhaCriptografada = await bcrypt.hash(
      senha,
      10
    );

    const sql = `
      INSERT INTO usuarios
      (
        nome,
        email,
        senha
      )
      VALUES (?, ?, ?)
    `;

    db.run(
      sql,
      [
        nome,
        email,
        senhaCriptografada
      ],
      function (err) {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json({
          message: "Usuário criado com sucesso",
          id: this.lastID
        });

      }
    );

  } catch (error) {

    return res.status(500).json({
      error: "Erro ao criar usuário"
    });

  }

});


/*
   LOGIN
*/
router.post("/login", loginLimiter, (req, res) => {

  const {
    email,
    senha
  } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE email = ?
  `;

  db.get(
    sql,
    [email],
    async (err, usuario) => {

      if (err) {
        return res.status(500).json({
          error: "Erro interno"
        });
      }

      /*
         NÃO REVELAR SE EMAIL EXISTE
      */
      if (!usuario) {
        return res.status(401).json({
          error: "Credenciais inválidas"
        });
      }

      /*
         COMPARAR HASH DA SENHA
      */
      const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaCorreta) {
        return res.status(401).json({
          error: "Credenciais inválidas"
        });
      }

      /*
         LOGIN OK
      */
      return res.json({
        message: "Login realizado com sucesso",

        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo
        }
      });

    }
  );

});


module.exports = router;