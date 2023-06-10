const clientModel = require('../models/Client');

class ClientController {
    async salvar(req, res) {
        try {
          let client = req.body;
          const max = await clientModel.findOne({}).sort({ codigoClient: -1 });
          client.codigoClient = max == null ? 1 : max.codigoClient + 1;
          const resultado = await clientModel.create(client);
          if(resultado)
          res.status(201).json('Usuário cadastrado com sucesso. Verifique no banco!');
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao salvar dado' });
        } 
      }
       
      async listar(req, res) {
        try {
          const resultado = await clientModel.find({});
          if(resultado)
          res.status(200).json(resultado);
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao listar dados' });
        }
      }
      
      async buscarPorCodigo(req, res) {
        try {
          const codigoClient = req.params.codigoClient;
          const resultado = await clientModel.findOne({ 'codigoClient': codigoClient });
          if (resultado) {
            res.status(200).json(resultado);
          } else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar dado por ID' });
        }
      }

    async atualizar(req, res) {
        try {
          const codigoClient = req.params.codigoClient;
          const dadoExistente = await clientModel.findOne({ 'codigoClient': codigoClient });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          await clientModel.findByIdAndUpdate(_id, req.body);
      
          res.status(200).json({ message: 'Registro atualizado com sucesso. Verifique no banco!' });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar dado' });
        }
      }      
      
      async excluir(req, res) {
        try {
          const codigoClient = req.params.codigoClient;
          const dadoExistente = await clientModel.findOne({ 'codigoClient': codigoClient });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          const dadoDeletado = await clientModel.findByIdAndRemove(_id);
      
          res.status(200).json({ message: 'Registro deletado com sucesso', deletedData: dadoDeletado });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao excluir dado' });
        }
      }
      
      
}

module.exports = new ClientController();