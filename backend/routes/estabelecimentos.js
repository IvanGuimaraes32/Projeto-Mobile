const express = require("express");
const router = express.Router();
const db = require("../database");

/*
   LISTAR TODOS ESTABELECIMENTOS
*/
router.get("/", (req, res) => {
  console.log("REQUISIÇÃO RECEBIDA DO APP");

  const sql = `
    SELECT *
    FROM estabelecimentos
    WHERE ativo = 1
    ORDER BY nome ASC
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
   LISTAR POR CATEGORIA  <-- NOVO
*/
router.get("/categoria/:categoria", (req, res) => {
  const { categoria } = req.params;

  const sql = `
    SELECT *
    FROM estabelecimentos
    WHERE ativo = 1
    AND categoria = ?
    ORDER BY nome ASC
  `;

  db.all(sql, [categoria], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json(rows);
  });
});

/*
   LISTAR MEUS ESTABELECIMENTOS
*/
router.get("/meus/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT *
    FROM estabelecimentos
    WHERE usuario_id = ?
    ORDER BY nome ASC
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
   IMPORTAR CSV
*/
router.post("/importar-csv", (req, res) => {
  const { estabelecimentos } = req.body;

  if (!estabelecimentos || estabelecimentos.length === 0) {
    return res.status(400).json({
      error: "Nenhum estabelecimento enviado",
    });
  }

  let inseridos = 0;

  estabelecimentos.forEach((item) => {
    const sql = `
      INSERT INTO estabelecimentos
      (
        nome,
        categoria,
        endereco,
        telefone_whatsapp,
        ativo,
        usuario_id
      )
      VALUES (?, ?, ?, ?, 1, NULL)
    `;

    db.run(
      sql,
      [item.nome, item.categoria, item.endereco, item.telefone_whatsapp],
      function (err) {
        if (err) {
          console.log(err);
        }

        inseridos++;

        if (inseridos === estabelecimentos.length) {
          return res.json({
            message: `${inseridos} registros importados`,
          });
        }
      },
    );
  });
});

/*
   ESTABELECIMENTOS SEM DONO
*/
router.get("/sem-dono", (req, res) => {
  const sql = `
    SELECT *
    FROM estabelecimentos
    WHERE usuario_id IS NULL
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
   EMPREENDEDOR SOLICITA ASSOCIAÇÃO
*/
router.post("/solicitar-associacao", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.body;

  const sql = `
    INSERT INTO solicitacoes_estabelecimento
    (
      usuario_id,
      estabelecimento_id
    )
    VALUES (?, ?)
  `;

  db.run(sql, [usuario_id, estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json({
      message: "Solicitação enviada com sucesso",
    });
  });
});

/*
   ADMIN LISTA SOLICITAÇÕES ASSOCIAÇÃO
*/
router.get("/solicitacoes-associacao", (req, res) => {
  const sql = `
    SELECT
      solicitacoes_estabelecimento.id,
      solicitacoes_estabelecimento.usuario_id,
      solicitacoes_estabelecimento.estabelecimento_id,
      solicitacoes_estabelecimento.status,

      usuarios.nome AS usuario_nome,

      estabelecimentos.nome AS estabelecimento_nome

    FROM solicitacoes_estabelecimento

    INNER JOIN usuarios
      ON usuarios.id = solicitacoes_estabelecimento.usuario_id

    INNER JOIN estabelecimentos
      ON estabelecimentos.id = solicitacoes_estabelecimento.estabelecimento_id

    WHERE solicitacoes_estabelecimento.status = 'pendente'
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
   ADMIN APROVAR ASSOCIAÇÃO
*/
router.post("/aprovar-associacao", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.body;

  const sqlAssociar = `
    UPDATE estabelecimentos
    SET usuario_id = ?
    WHERE id = ?
  `;

  db.run(sqlAssociar, [usuario_id, estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    const sqlAprovar = `
      UPDATE solicitacoes_estabelecimento
      SET status = 'aprovado'
      WHERE usuario_id = ?
      AND estabelecimento_id = ?
    `;

    db.run(sqlAprovar, [usuario_id, estabelecimento_id], function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      const sqlRejeitarOutros = `
        UPDATE solicitacoes_estabelecimento
        SET status = 'rejeitado'
        WHERE estabelecimento_id = ?
        AND usuario_id != ?
      `;

      db.run(
        sqlRejeitarOutros,
        [estabelecimento_id, usuario_id],
        function (err) {
          if (err) {
            return res.status(500).json({
              error: err.message,
            });
          }

          return res.json({
            message: "Associação aprovada com sucesso",
          });
        },
      );
    });
  });
});

/*
   ADMIN RECUSAR ASSOCIAÇÃO
*/
router.post("/recusar-associacao", (req, res) => {
  const { usuario_id, estabelecimento_id } = req.body;

  const sql = `
    UPDATE solicitacoes_estabelecimento
    SET status = 'rejeitado'
    WHERE usuario_id = ?
    AND estabelecimento_id = ?
    AND status = 'pendente'
  `;

  db.run(sql, [usuario_id, estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json({
      message: "Associação recusada com sucesso",
    });
  });
});

/*
   ASSOCIAR DIRETO (LEGADO)
*/
router.put("/associar", (req, res) => {
  const { estabelecimento_id, usuario_id } = req.body;

  const sql = `
    UPDATE estabelecimentos
    SET usuario_id = ?
    WHERE id = ?
  `;

  db.run(sql, [usuario_id, estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json({
      message: "Estabelecimento associado com sucesso",
    });
  });
});

/*
   BUSCAR POR ID
*/
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM estabelecimentos
    WHERE id = ?
  `;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(row);
  });
});

/*
   CADASTRAR
*/
router.post("/", (req, res) => {
  const {
    nome,
    categoria,
    descricao,
    endereco,
    telefone_whatsapp,
    imagem,
    usuario_id,
    tipo_usuario,
  } = req.body;

  let ativo = 0;

  if (tipo_usuario === "admin") {
    ativo = 1;
  }

  const sql = `
    INSERT INTO estabelecimentos
    (
      nome,
      categoria,
      descricao,
      endereco,
      telefone_whatsapp,
      imagem,
      usuario_id,
      ativo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
      usuario_id,
      ativo,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Estabelecimento enviado com sucesso",
        id: this.lastID,
      });
    },
  );
});

/*
   APROVAR ESTABELECIMENTO
*/
router.post("/aprovar", (req, res) => {
  const { estabelecimento_id } = req.body;

  const sql = `
    UPDATE estabelecimentos
    SET ativo = 1
    WHERE id = ?
  `;

  db.run(sql, [estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Estabelecimento aprovado",
    });
  });
});

/*
   RECUSAR ESTABELECIMENTO
*/
router.post("/recusar", (req, res) => {
  const { estabelecimento_id } = req.body;

  const sql = `
    UPDATE estabelecimentos
    SET ativo = -1
    WHERE id = ?
  `;

  db.run(sql, [estabelecimento_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Estabelecimento recusado",
    });
  });
});

/*
   LISTAR PENDENTES
*/
router.get("/pendentes/lista", (req, res) => {
  const sql = `
    SELECT *
    FROM estabelecimentos
    WHERE ativo = 0
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
   ATUALIZAR
*/
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { nome, categoria, descricao, endereco, telefone_whatsapp, imagem } =
    req.body;

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
    [nome, categoria, descricao, endereco, telefone_whatsapp, imagem, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Estabelecimento atualizado com sucesso",
      });
    },
  );
});

/*
   DELETAR
*/
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM estabelecimentos
    WHERE id = ?
  `;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Estabelecimento removido com sucesso",
    });
  });
});

module.exports = router;
