const FuncionariosModel = require('../model/funcionariosModel');

const FuncionariosControllers = {

    listar: async (req, res) => {

        try {

            const funcionarios = await FuncionariosModel.listar();

            res.json(funcionarios);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: 'Erro ao listar funcionários'
            });
        }
    },
    criar: async (req, res) => {

        try {

            await FuncionariosModel.criar(req.body);

            res.status(201).json({
                message: 'Funcionário cadastrado com sucesso'
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: 'Erro ao cadastrar funcionário'
            });
        }
    },
    atualizar: async (req, res) => {

        try {

            const { id } = req.params;

            await FuncionariosModel.atualizar(id, req.body);

            res.json({
                message: 'Funcionário atualizado'
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: 'Erro ao atualizar funcionário'
            });
        }
    },
    deletar: async (req, res) => {

        try {

            const { id } = req.params;

            await FuncionariosModel.deletar(id);

            res.json({
                message: 'Funcionário deletado'
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: 'Erro ao deletar funcionário'
            });
        }
    }
}
module.exports = FuncionariosControllers;