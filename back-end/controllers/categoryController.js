const categoryModel = require('../models/Category');

class ProductController {
    async salvarCategoria(req, res) {
        try {
          let category = req.body;
          const max = await categoryModel.findOne({}).sort({ codigoCategory: -1 });
          category.codigoCategory = max == null ? 1 : max.codigoCategory + 1;
          const resultado = await categoryModel.create(category);
          if(resultado)
          res.status(201).json('Usuário cadastrado com sucesso. Verifique no banco!');
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao salvar dado' });
        } 
      }
       
      async listarCategoria(req, res) {
        try {
          const resultado = await categoryModel.find({});
          if(resultado)
          res.status(200).json(resultado);
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao listar dados' });
        }
      }
      
      async buscarPorCodigoCategoria(req, res) {
        try {
          const codigoCategory = req.params.codigoCategory;
          const resultado = await categoryModel.findOne({ 'codigoCategory': codigoCategory });
          if (resultado) {
            res.status(200).json(resultado);
          } else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar dado por ID' });
        }
      }

    async atualizarCategoria(req, res) {
        try {
          const codigoCategory = req.params.codigoCategory;
          const dadoExistente = await categoryModel.findOne({ 'codigoCategory': codigoCategory });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          await categoryModel.findByIdAndUpdate(_id, req.body);
      
          res.status(200).json({ message: 'Registro atualizado com sucesso. Verifique no banco!' });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar dado' });
        }
      }      
      
      async excluirCategoria(req, res) {
        try {
          const codigoCategory = req.params.codigoCategory;
          const dadoExistente = await categoryModel.findOne({ 'codigoCategory': codigoCategory });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          const dadoDeletado = await categoryModel.findByIdAndRemove(_id);
      
          res.status(200).json({ message: 'Registro deletado com sucesso', deletedData: dadoDeletado });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao excluir dado' });
        }
      }
      
      
}

module.exports = new ProductController();