const pool = require('../config/db'); // Certifique-se de que o caminho do seu banco/pool está correto aqui

const FornecedoresModel = {
    listar: async () => {
        const [rows] = await pool.execute(
            'SELECT * FROM fornecedores ORDER BY id_fornecedor DESC'
        );
        return rows;
    },

    criar: async (dados) => {
        const {
            empresa,
            cnpj,
            responsavel,
            telefone,
            email,
            endereco,
            produtos
        } = dados;

        const [result] = await pool.execute(
            `INSERT INTO fornecedores
            (empresa, cnpj, responsavel, telefone, email, endereco, produtos)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                empresa,
                cnpj,
                responsavel,
                telefone,
                email,
                endereco,
                produtos
            ]
        );
        return result;
    },

    atualizar: async (id, dados) => {
        const {
            empresa,
            cnpj,
            responsavel,
            telefone,
            email,
            endereco,
            produtos
        } = dados;

        const [result] = await pool.execute(
            `UPDATE fornecedores SET
            empresa = ?,
            cnpj = ?,
            responsavel = ?,
            telefone = ?,
            email = ?,
            endereco = ?,
            produtos = ?
            WHERE id_fornecedor = ?`,
            [
                empresa,
                cnpj,
                responsavel,
                telefone,
                email,
                endereco,
                produtos,
                id
            ]
        );
        return result;
    },

    deletar: async (id) => {
        const [result] = await pool.execute(
            'DELETE FROM fornecedores WHERE id_fornecedor = ?',
            [id]
        );
        return result;
    }
};

module.exports = FornecedoresModel;