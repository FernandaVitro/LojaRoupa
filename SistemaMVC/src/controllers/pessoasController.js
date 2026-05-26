const Pessoa = require('../models/pessoasModel');

const pessoasController = {
    index: async (req, res) => {
        try {
            const pessoa = await Pessoa.listarTodos();
            res.json(pessoa);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    post: async (req, res) => {
        try {
            // 1. Pegar os dados vindos do corpo da requisição (JSON ou formulário)
            const dadosPessoa = req.body;

            // 2. Passar esses dados para a função do Model
            const resultado = await Pessoa.criarPessoa(dadosPessoa);

            // 3. Retornar um status 201 (Created) que é o ideal para POST
            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Pessoa.deletar(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Registro não encontrado' })
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message })
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
}


    module.exports = pessoasController;