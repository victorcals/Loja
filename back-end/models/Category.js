const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    codigoCategory: Number,
    nome: String,
    descricao: String
});

module.exports = mongoose.model('categorias', categorySchema);