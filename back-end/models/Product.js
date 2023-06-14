const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    descricao: String,
    preco: String,
    animal: String,
    comentarios: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias' }
});

module.exports = mongoose.model('produtos', productSchema);