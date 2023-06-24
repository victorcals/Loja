const comentariosModel = require('../models/comentariosModel');
const productModel = require('../models/productModel');

const multer = require("multer");

class ComentariosController {
    async salvarComentarios(req, res) {
         try {  
        const max = await comentariosModel.findOne({}).sort({ codigo: -1 });
        const comentarios = req.body;
      
        comentarios.codigo = max == null ? 1 : max.codigo + 1;
        
        
        const product = await productModel.findOne({ codigo: comentarios.product.codigo });
        if (product) {
          comentarios.product = product._id;

          const resultado = await comentariosModel.create(comentarios);
          if (resultado) {
            res.status(201).json('Comentario cadastrado com sucesso. Verifique no banco!');
          } else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } else {
          res.status(404).json({ error: 'Categoria não encontrada' });
        }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao salvar dado' });
        } 
      }
      
       
      async listarComentarios(req, res) {
        try {
          const resultado = await comentariosModel.find();
          if(resultado)
          res.status(200).json(resultado);
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao listar dados' });
        }
      }
      
      async buscarPorCodigoComentarios(req, res) {
        try {
          const codigo = req.params.codigo;
          const resultado = await comentariosModel.findOne({ 'codigo': codigo });
          if (resultado) {
            res.status(200).json(resultado);
          } else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar dado por ID' });
        }
      }


      async buscarPorProductComentarios(req, res) {
        try {
          const codigo = req.params.codigo;
          const resultado = await comentariosModel.findOne({ 'nota': codigo });
          if (resultado) {
            res.status(200).json(resultado);
          } else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar dado por ID' });
        }
      }

      async atualizarComentarios(req, res) {
        try {
          const codigo = req.params.codigo;
          const dadoExistente = await comentariosModel.findOne({ 'codigo': codigo });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          await comentariosModel.findByIdAndUpdate(_id, req.body);
      
          res.status(200).json({ message: 'Registro atualizado com sucesso. Verifique no banco!' });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar dado' });
        }
      }        
      
      async excluirComentarios(req, res) {
        try {
          const codigo = req.params.codigo;
          const dadoExistente = await comentariosModel.findOne({ 'codigo': codigo });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          const dadoDeletado = await comentariosModel.findByIdAndRemove(_id);
      
          res.status(200).json({ message: 'Registro deletado com sucesso', deletedData: dadoDeletado });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao excluir dado' });
        }
      }  
}

module.exports = new ComentariosController();