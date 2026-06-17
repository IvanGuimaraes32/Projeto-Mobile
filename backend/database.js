const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "guia_aero_rancho.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Banco SQLite conectado com sucesso.");
  }
});

db.serialize(() => {

  /*
     TABELA USUARIOS
  */
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,

      tipo TEXT NOT NULL DEFAULT 'comum',

      solicitou_upgrade INTEGER DEFAULT 0,

      aprovado_admin INTEGER DEFAULT 0,

      ativo INTEGER DEFAULT 1,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);


  /*
     TABELA ESTABELECIMENTOS
  */
  db.run(`
    CREATE TABLE IF NOT EXISTS estabelecimentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT NOT NULL,
      descricao TEXT,
      endereco TEXT NOT NULL,
      telefone_whatsapp TEXT NOT NULL,
      imagem TEXT,
      usuario_id INTEGER,
      ativo INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);


  /*
     TABELA EVENTOS
  */
  db.run(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data_evento TEXT,
      local TEXT,
      telefone TEXT,
      imagem TEXT,
      usuario_id INTEGER,
      aprovado INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);


  /*
     SOLICITAÇÕES PARA VIRAR EMPREENDEDOR
  */
  db.run(`
    CREATE TABLE IF NOT EXISTS solicitacoes_upgrade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      usuario_id INTEGER NOT NULL,

      status TEXT DEFAULT 'pendente',

      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

});

module.exports = db;