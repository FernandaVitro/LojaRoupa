const Venda = require('../models/vendasModels');

const vendasController = {
    index: async (req, res) => {
        try {
            const vendas = await Venda.listarTodos();
            res.json(vendas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    store: async (req, res) => {
        try {
            const insertId = await Venda.criar(req.body);
            res.status(201).json({ id_vendas: insertId, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Venda.atualizar(id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Venda não encontrada" });
            }
            res.json({ id_vendas: id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Venda.deletar(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Venda não encontrada" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = vendasController;