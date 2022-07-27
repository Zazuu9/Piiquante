const mongoose = require('mongoose');
const SaucesValidator = require('../validators/sauces')

const saucesSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, match: SaucesValidator.wordRegex},
    manufacturer: { type: String, required: true, match: SaucesValidator.wordRegex},
    description: { type: String, required: true, match: SaucesValidator.wordRegex},
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: Array, required: false, },
    usersDisliked: { type: Array, required: false },
})

module.exports = mongoose.model('Sauces', saucesSchema);