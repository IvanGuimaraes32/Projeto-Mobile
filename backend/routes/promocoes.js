const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   LISTAR PROMOÇÕES APROVADAS
*/
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM promocoes
    WHERE aprovado = 1
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

/*
   LISTAR PROMOÇÕES DOS COMÉRCIOS QUE O USUÁRIO SEGUE
*/
router.get("/seguindo/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT
      promocoes.*,
      estabelecimentos.nome AS estabelecimento_nome

    FROM promocoes

    INNER JOIN favoritos
      ON promocoes.estabelecimento_id = favoritos.estabelecimento_id

    INNER JOIN estabelecimentos
      ON estabelecimentos.id = promocoes.estabelecimento_id

    WHERE favoritos.usuario_id = ?

    ORDER BY promocoes.created_at DESC
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

/*
   CRIAR PROMOÇÃO + DISPARAR PUSH
*/
router.post("/", (req, res) => {
  const { titulo, descricao, estabelecimento_id, usuario_id } = req.body;

  const sql = `
    INSERT INTO promocoes
    (
      titulo,
      descricao,
      estabelecimento_id,
      usuario_id
    )
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sql,
    [titulo, descricao, estabelecimento_id, usuario_id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      /*
         BUSCAR SEGUIDORES
      */
      const sqlSeguidores = `
        SELECT usuarios.expo_push_token

        FROM favoritos

        INNER JOIN usuarios
          ON favoritos.usuario_id = usuarios.id

        WHERE favoritos.estabelecimento_id = ?
        AND usuarios.expo_push_token IS NOT NULL
      `;

      db.all(sqlSeguidores, [estabelecimento_id], async (err, seguidores) => {
        if (err) {
          console.log("Erro seguidores:", err);
        }

        /*
             ENVIAR PUSH
          */
        if (seguidores.length > 0) {
          const mensagens = seguidores.map((seguidor) => ({
            to: seguidor.expo_push_token,
            sound: "default",
            title: "Nova promoção disponível 🎉",
            body: titulo,
          }));

          try {
            await fetch("https://exp.host/--/api/v2/push/send", {
              method: "POST",

              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },

              body: JSON.stringify(mensagens),
            });

            console.log("Push enviado com sucesso");
          } catch (error) {
            console.log("Erro ao enviar push:", error);
          }
        }

        return res.json({
          message: "Promoção criada com sucesso",
          id: this.lastID,
        });
      });
    },
  );
});

module.exports = router;
