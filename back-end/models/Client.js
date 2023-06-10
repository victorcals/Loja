const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    codigoClient: Number,
    nome: String,
    endereco: String,
    telefone: Number,
    cpf: Number,
    cartaoCredito: Number,
    email: String,
    senha: String
});

module.exports = mongoose.model('clients', clientSchema);