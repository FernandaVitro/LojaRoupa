const pool = require('../config/db');

const FuncionariosModel = {
    listar: async () => {

        const [rows] = await pool.execute(
            'SELECT * FROM funcionarios ORDER BY id_funcionario DESC'
        );

        return rows;
    },

    Criar: async (dados) => {

        const {
            nome,
            cpf,
            cargo,
            salario,
            telefone,
            email,
            data_admissao
        } = dados;

        const [result] = await pool.execute(
            `INSERT INTO funcionarios
            (nome, cpf, cargo, salario, telefone, email, data_admissao)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                nome,
                cpf,
                cargo,
                salario,
                telefone,
                email,
                data_admissao
            ]
        );

        return result;
    },

    buscarPorId: async (id) => {

        const [rows] = await pool.execute(
            'SELECT * FROM funcionarios WHERE id_funcionario = ?',
            [id]
        );

        return rows[0];
    },
    atualizar: async (id, dados) => {

        const {
            nome,
            cpf,
            cargo,
            salario,
            telefone,
            email,
            data_admissao
        } = dados;

        const [result] = await pool.execute(
            `UPDATE funcionarios SET
            nome = ?,
            cpf = ?,
            cargo = ?,
            salario = ?,
            telefone = ?,
            email = ?,
            data_admissao = ?
            WHERE id_funcionario = ?`,
            [
                nome,
                cpf,
                cargo,
                salario,
                telefone,
                email,
                data_admissao,
                id
            ]
        );

        return result;
    },
    deletar: async (id) => {

        const [result] = await pool.execute(
            'DELETE FROM funcionarios WHERE id_funcionario = ?',
            [id]
        );

        return result;
    }
};

module.exports = FuncionariosModel;