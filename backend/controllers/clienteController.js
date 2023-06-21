const clienteModel = require('../models/clienteModel');
const multer = require("multer");
const auth = require('../auth/auth');

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}. ${file.originalname}`)
    }
  }); 
  const upload = multer({
    storage:imgconfig,
  });

class ClienteController {
    async salvar(req, res) {
        try {
            const cliente = req.body;
            const max = await clienteModel.findOne({}).sort({ codigo: -1 });
            cliente.codigo = max == null ? 1 : max.codigo + 1;
            cliente.image = req.file.path; // Adiciona o caminho da imagem ao objeto client
    
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
