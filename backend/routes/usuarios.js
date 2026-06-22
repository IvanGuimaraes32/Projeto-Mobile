const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

/*
   PROTEÇÃO CONTRA BRUTE FORCE LOGIN
*/
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,

  max: 5,

  message: {
    error: "Muitas tentativas. Tente novamente em 1 minuto.",
  },
});

/*
   CADASTRAR USUÁRIO
*/
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO usuarios
      (
        nome,
        email,
        senha
      )
      VALUES (?, ?, ?)
    `;

    db.run(sql, [nome, email, senhaCriptografada], function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      return res.json({
        message: "Usuário criado com sucesso",
        id: this.lastID,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar usuário",
    });
  }
});

/*
   LOGIN
*/
router.post("/login", loginLimiter, (req, res) => {
  const { email, senha } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE email = ?
  `;

  db.get(sql, [email], async (err, usuario) => {
    if (err) {
      return res.status(500).json({
        error: "Erro interno",
      });
    }

    if (!usuario) {
      return res.status(401).json({
        error: "Credenciais inválidas",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        error: "Credenciais inválidas",
      });
    }

    return res.json({
      message: "Login realizado com sucesso",

      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        solicitou_upgrade: usuario.solicitou_upgrade,
      },
    });
  });
});

/*
   USUÁRIO COMUM SOLICITA VIRAR EMPREENDEDOR
*/
router.post("/solicitar-upgrade", (req, res) => {
  const { usuario_id } = req.body;

  const sqlSolicitacao = `
    INSERT INTO solicitacoes_upgrade
    (
      usuario_id
    )
    VALUES (?)
  `;

  db.run(sqlSolicitacao, [usuario_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Erro ao criar solicitação",
      });
    }

    const sqlUsuario = `
      UPDATE usuarios
      SET solicitou_upgrade = 1
      WHERE id = ?
    `;

    db.run(sqlUsuario, [usuario_id], function (err) {
      if (err) {
        return res.status(500).json({
          error: "Erro ao atualizar usuário",
        });
      }

      return res.json({
        message: "Solicitação enviada com sucesso",
      });
    });
  });
});

/*
   LISTAR SOLICITAÇÕES
*/
router.get("/solicitacoes", (req, res) => {
  const sql = `
    SELECT
      solicitacoes_upgrade.id,
      solicitacoes_upgrade.usuario_id,
      solicitacoes_upgrade.status,

      usuarios.nome,
      usuarios.email

    FROM solicitacoes_upgrade

    INNER JOIN usuarios
      ON usuarios.id = solicitacoes_upgrade.usuario_id

    WHERE solicitacoes_upgrade.status = 'pendente'
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
   ADMIN APROVAR UPGRADE
*/
router.post("/aprovar-upgrade", (req, res) => {
  const { usuario_id } = req.body;

  const sqlUsuario = `
    UPDATE usuarios
    SET
      tipo = 'empreendedor',
      aprovado_admin = 1,
      solicitou_upgrade = 0
    WHERE id = ?
  `;

  db.run(sqlUsuario, [usuario_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Erro ao aprovar usuário",
      });
    }

    const sqlSolicitacao = `
      UPDATE solicitacoes_upgrade
      SET status = 'aprovado'
      WHERE usuario_id = ?
    `;

    db.run(sqlSolicitacao, [usuario_id], function (err) {
      if (err) {
        return res.status(500).json({
          error: "Erro ao atualizar solicitação",
        });
      }

      return res.json({
        message: "Usuário aprovado com sucesso",
      });
    });
  });
});

/*
   ADMIN RECUSAR UPGRADE
*/
router.post("/recusar-upgrade", (req, res) => {
  const { usuario_id } = req.body;

  const sqlUsuario = `
    UPDATE usuarios
    SET solicitou_upgrade = 0
    WHERE id = ?
  `;

  db.run(sqlUsuario, [usuario_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Erro ao atualizar usuário",
      });
    }

    const sqlSolicitacao = `
      UPDATE solicitacoes_upgrade
      SET status = 'rejeitado'
      WHERE usuario_id = ?
      AND status = 'pendente'
    `;

    db.run(sqlSolicitacao, [usuario_id], function (err) {
      if (err) {
        return res.status(500).json({
          error: "Erro ao rejeitar solicitação",
        });
      }

      return res.json({
        message: "Solicitação recusada com sucesso",
      });
    });
  });
});

/*
   DEBUG EVENTOS
*/
router.get("/debug-eventos", (req, res) => {
  const sql = `
    PRAGMA table_info(eventos)
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
   MIGRAÇÃO - CRIAR COLUNA PUSH TOKEN
*/
router.get("/migrar-push", (req, res) => {
  const sql = `
    ALTER TABLE usuarios
    ADD COLUMN expo_push_token TEXT
  `;

  db.run(sql, function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json({
      message: "Coluna expo_push_token criada com sucesso",
    });
  });
});

/*
   SALVAR PUSH TOKEN
*/
router.post("/push-token", (req, res) => {
  const { usuario_id, expo_push_token } = req.body;

  const sql = `
    UPDATE usuarios
    SET expo_push_token = ?
    WHERE id = ?
  `;

  db.run(sql, [expo_push_token, usuario_id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.json({
      message: "Push token salvo com sucesso",
    });
  });
});

/*
   DEBUG USUARIOS
*/
router.get("/debug-usuarios", (req, res) => {
  const sql = `
    PRAGMA table_info(usuarios)
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
   LISTAR EMPREENDEDORES
*/
router.get("/empreendedores", (req, res) => {
  const sql = `
    SELECT id, nome
    FROM usuarios
    WHERE tipo = 'empreendedor'
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

module.exports = router;