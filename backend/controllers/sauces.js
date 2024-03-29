const fs = require('fs');
const jwt = require("jsonwebtoken");
const Sauce = require('../models/Sauces');
const SaucesValidator = require('../validators/sauces');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    if (!SaucesValidator.validateName(sauceObject.name)) {
        return res.status(400).json({message: "Merci d'entrer un nom valide !"})
    };console.log(sauceObject.name);

    if (!SaucesValidator.validateManufacturer(sauceObject.manufacturer)) {
        return res.status(400).json({message: "Merci d'entrer une Manufacturer valide !"})
    };console.log(sauceObject.manufacturer);

    if (!SaucesValidator.validateDesc(sauceObject.description)) {
        return res.status(400).json({message: "Merci d'entrer une description valide !"})
    };console.log(sauceObject.description);

    if (!SaucesValidator.validateMainPepper(sauceObject.mainPepper)) {
        return res.status(400).json({message: "Merci d'entrer un mainPepper valide !"})
    };console.log(sauceObject.mainPepper);

    if (!SaucesValidator.validateHeat(sauceObject.heat)) {
        return res.status(400).json({message: "Merci d'entrer un heat valide !"})
    };console.log(sauceObject.heat);

    delete sauceObject._id;
    const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersDisliked: [" "],
    });
    sauce.save()
    .then(() =>res.status(201).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}))
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(401).json({error}))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
    .then((sauce) => res.status(201).json({message: 'Sauce supprimé !'}))
    .catch(error => res.status(401).json({error}))
};

exports.likeSauce = (req, res, next) => {
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Ajout Like' }))
            .catch(error => res.status(400).json({ error }))
    } else if (req.body.like === -1) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Ajout Dislike' }))
            .catch(error => res.status(400).json({ error }))
    } else {
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then((sauce) => { res.status(200).json({ message: 'Suppression Like' }) })
                    .catch(error => res.status(400).json({ error }))
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                    .then((sauce) => { res.status(200).json({ message: 'Suppression Dislike' }) })
                    .catch(error => res.status(400).json({ error }))
                }
            })
        .catch(error => res.status(400).json({ error }))
    }
}
