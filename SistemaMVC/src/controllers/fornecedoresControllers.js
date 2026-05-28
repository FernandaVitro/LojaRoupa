// Correção aqui: o seu arquivo na pasta model começa com 'f' minúsculo
const FornecedoresModel = require('../model/fornecedoresModel');

const FornecedoresController = {
    listar: async (req, res) => {
        try {
            const proveedores = await FornecedoresModel.listar();
            res.json(proveedores);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Erro ao listar fornecedores'
            });
        }
    },

    criar: async (req, res) => {
        try {
            await FornecedoresModel.criar(req.body);
            res.status(201).json({
                message: 'Fornecedor cadastrado com sucesso'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Erro ao cadastrar fornecedor'
            });
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            await FornecedoresModel.atualizar(id, req.body);
            res.json({
                message: 'Fornecedor atualizado com sucesso'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Erro ao atualizar fornecedor'
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            await FornecedoresModel.deletar(id);
            res.json({
                message: 'Fornecedor deletado com sucesso'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Erro ao deletar fornecedor'
            });
        }
    }
};

module.exports = FornecedoresController;