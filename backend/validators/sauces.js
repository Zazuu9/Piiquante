const wordRegex = /[a-zA-Z\d\W]{4,}/;
const numberRegex = /\d/g;

module.exports = {
    wordRegex,

    validateName : (name) => {
        return wordRegex.test(name)
    },

    validateManufacturer : (manufacturer) => {
        return wordRegex.test(manufacturer)
    },

    validateDesc : (description) => {
        return wordRegex.test(description)
    },

    validateMainPepper : (mainPepper) => {
        return wordRegex.test(mainPepper)
    },

    validateHeat : (heat) => {
        return numberRegex.test(heat)
    },

};
