const mongoose = require('mongoose');

const comentariosSchema = new mongoose.Schema({
    codigo: Number,
    comentario: String,
    nota: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'produtos' }
});

module.exports = mongoose.model('comentarios', comentariosSchema);