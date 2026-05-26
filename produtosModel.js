const pool = require('../config/db');

const Produto = {
    listarTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        return rows;
    },
    deletar: async (id) => {
        const [result] = await pool.execute('DELETE FROM produtos WHERE id = ?', [id]);
        return result.affectedRows;
    },
    criar: async (dados) => {
        // Corrigido: Removida a 5ª interrogação que sobrava
        const query = `
            INSERT INTO produtos (nome, descricao, preco, categoria)
            VALUES (?, ?, ?, ?)
        `;
        const values = [
            dados.nome,
            dados.descricao || null,
            dados.preco || null,
            dados.categoria || null
        ];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },
    atualizar: async (id, dados) => {
        // Corrigido: Adicionado '=' em preco e removida a vírgula antes do WHERE
        const query = `
            UPDATE produtos
            SET nome = ?, descricao = ?, preco = ?, categoria = ?
            WHERE id = ?
        `;
        const values = [
            dados.nome,
            dados.descricao || null,
            dados.preco || null,
            dados.categoria || null,
            id
        ];
        const [result] = await pool.execute(query, values);
        return result.affectedRows;
    }
};

module.exports = Produto;