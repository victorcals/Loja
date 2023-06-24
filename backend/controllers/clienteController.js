const clienteModel = require('../models/clienteModel');
const multer = require("multer");
const auth = require('../auth/auth');

class ClienteController {
    async salvar(req, res) {
        try {
            const max = await clienteModel.findOne({}).sort({ codigo: -1 });
            const cliente = req.body;
            const file = req.file.buffer;
            cliente.codigo = max == null ? 1 : max.codigo + 1;
            cliente.image = file; 
            
            if (await clienteModel.findOne({ email: cliente.email })) {
                res.status(400).send({ error: 'Cliente já cadastrado!' });
                return;
            }
    
            const resultado = await clienteModel.create(cliente);
            auth.incluirToken(resultado);
            res.status(201).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).send( error);
        }
    }
    

    async listar(req, res) {
        const resultado = await clienteModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        const resultado = await clienteModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);

        const cliente = req.body;

        await clienteModel.findByIdAndUpdate(String(_id), cliente);
        res.status(200).send();
    }

    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);

        await clienteModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    }
}

module.exports = new ClienteController();
