const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    codigoProduct: Number,
    nome: String,
    descricao: String,
    preco: String,
    modelo: String,
    comentarios: String,
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias' }
});

module.exports = mongoose.model('produtos', productSchema);