const Pessoa = require('../models/pessoasModel');

const pessoaController ={
    index: async (req,res)=>{
        try {
            const pessoa = await Pessoa.listarTodos();
            res.json(pessoa);
        } catch (error) {
            res.status(500).json({error: error.mensagem})
        }
    },
    delete: async (req,res)=>{
        const {id} = req.params;
        try {
            const affectedRows = await Pessoa.deletar(id);
            if(affectedRows === 0){
                return res.status(404).json({message:'Registro nao encontrado'});
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    store: async (req, res) => {
            try {
                const insertId = await Pessoa.criar(req.body);
                res.status(201).json({ id: insertId, ...req.body });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }                           mmmmmmmmmm                                                                                                                                                                                                              
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
        }
};

module.exports = pessoaController;