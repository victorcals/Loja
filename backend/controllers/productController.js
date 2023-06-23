const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');

const multer = require("multer");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads")
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}. ${file.originalname}`)
  }
})

const upload = multer({
  storage: imgconfig,
});

class ProductController {
  async salvarProduct(req, res) {
    try {
      const max = await productModel.findOne({}).sort({ codigo: -1 });
      const product = req.body;
      const file = req.file.buffer;
      product.codigo = max == null ? 1 : max.codigo + 1;
      product.image = file

      const category = await categoryModel.findOne({ codigo: product.category.codigo });
      if (category) {
        product.category = category._id;

        const resultado = await productModel.create(product);
        if (resultado) {
          res.status(201).json('Produto cadastrado com sucesso. Verifique no banco!');
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


  async listarProduct(req, res) {
    try {
      const resultado = await productModel.find();
      if (resultado)
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
      const codigo = req.params.codigo;
      const resultado = await productModel.findOne({ 'codigo': codigo });
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
      const codigo = req.params.codigo;
      const dadoExistente = await productModel.findOne({ 'codigo': codigo });

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
      const codigo = req.params.codigo;
      const dadoExistente = await productModel.findOne({ 'codigo': codigo });

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