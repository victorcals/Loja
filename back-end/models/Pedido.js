const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    codigoPedido: Number,
    preco: String,
    mensalidade: Number
},
{timestamps: true});

module.exports = mongoose.model('pedidos', pedidoSchema);