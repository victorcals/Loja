const productModel = require('../models/Product');
const categoryModel = require('../models/Category');


class ProductController {
    async salvarProduct(req, res) {
        try {
          let product = req.body;
          const max = await productModel.findOne({}).sort({ codigoProduct: -1 });
          product.codigoProduct = max == null ? 1 : max.product + 1;

          const category = await categoryModel.findOne({codigoCategory: category.codigoCategory });
          product.category = category._id;

          const resultado = await productModel.create(product);
          if(resultado)
          res.status(201).json('Usuário cadastrado com sucesso. Verifique no banco!');
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao salvar dado' });
        } 
      }
       
      async listarProduct(req, res) {
        try {
          const resultado = await productModel.find({});
          if(resultado)
          res.status(200).json(resultado);
          else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao listar dados' });
        }
      }
      
      async buscarPorCodigoProduct(req, res) {
        try {
          const codigoProduct = req.params.codigoProduct;
          const resultado = await productModel.findOne({ 'codigoProduct': codigoProduct });
          if (resultado) {
            res.status(200).json(resultado);
          } else {
            res.status(404).json({ error: 'Dado não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar dado por ID' });
        }
      }

    async atualizarProduct(req, res) {
        try {
          const codigoProduct = req.params.codigoProduct;
          const dadoExistente = await productModel.findOne({ 'codigoProduct': codigoProduct });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          await productModel.findByIdAndUpdate(_id, req.body);
      
          res.status(200).json({ message: 'Registro atualizado com sucesso. Verifique no banco!' });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar dado' });
        }
      }      
      
      async excluirProduct(req, res) {
        try {
          const codigoProduct = req.params.codigoProduct;
          const dadoExistente = await productModel.findOne({ 'codigoProduct': codigoProduct });
      
          if (!dadoExistente) {
            return res.status(404).json({ error: 'Dado não encontrado' });
          }
      
          const _id = String(dadoExistente._id);
          const dadoDeletado = await productModel.findByIdAndRemove(_id);
      
          res.status(200).json({ message: 'Registro deletado com sucesso', deletedData: dadoDeletado });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao excluir dado' });
        }
      }
      
      
}

module.exports = new ProductController();