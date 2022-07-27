const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserValidator = require('../validators/user');


exports.signup = (req, res, next) => {
    if (!UserValidator.validateEmail(req.body.email)) {
        return res.status(400).json({message: "Merci de rentrer une adresse valide !"})
    };
    if (!UserValidator.validatePassword(req.body.password)) {
        return res.status(400).json({message: "Votre mot de passe doit comprendre au moins 8 caractères, une lettre majuscule et un chiffre"})
    };

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        })
        user.save()
        .then(() => res.status(201).json('Utilisateur créé !'))
        .catch(error => res.status(409).json({message: "Soucis d'identifiant"}))
    })
    .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if (!user) {
            res.status(401).json({message: 'Utilisateur non trouvé !'});
        }else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Identifiant/mot de passe incorrect'});
                }else{
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(500).json({error}))
};

exports.getAllUser = (req, res, next) => {
    User.find()
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(500).json({error}))
}

exports.modifyUser = (req, res, next) => {
    User.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(500).json({error}))
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(500).json({error}))
}

