const Pessoa = require('../model/pessoasModel');

const pessoaControllers = {
    index: async (req, res) => {
        try {
            const pessoas = await Pessoa.listarTodos();
            res.json(pessoas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Pessoa.deletar(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Registro não encontrado" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Pessoa.atualizar(id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            res.json({ id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    store: async (req, res) => {
        try {
            const insertId = await Pessoa.criar(req.body);
            res.status(201).json({ id: insertId, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pessoaControllers;