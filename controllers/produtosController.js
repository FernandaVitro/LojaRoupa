// Corrigido: Apontando para o model correto de produtos
const Produto = require('../models/produtosModel'); 

const produtosController = {
    index: async (req, res) => {
        try {
            const produto = await Produto.listarTodos();
            res.json(produto);
        } catch (error) {
            // Corrigido: de error.mensagem para error.message
            res.status(500).json({ error: error.message }); 
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Produto.deletar(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Registro nao encontrado' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    store: async (req, res) => {
        try {
            const insertId = await Produto.criar(req.body);
            res.status(201).json({ id: insertId, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Produto.atualizar(id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            res.json({ id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = produtosController;