const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    rating: Number,
});

const productSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    image: {
        type: Buffer
    },
    descricao: String,
    preco: String,
    animal: String,
    comentarios: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias' },
    comments: [commentSchema],

});

productSchema.virtual('averageRating').get(function () {
    if (this.comments.length === 0) {
        return 0;
    }

    const totalRating = this.comments.reduce((sum, comment) => {
        return sum + comment.rating;
    }, 0);

    return totalRating / this.comments.length;
});

module.exports = mongoose.model('produtos', productSchema);