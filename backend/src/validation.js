const joi = require('@hapi/joi')

const barrowerRegisterValidation = (data) => {
    const schema = {
        name: joi.string().min(6).required(),
        mail: joi.string().min(6).required().email(),
        pass: joi.string().min(6).required(),
        phone: joi.string().min(10).required().max(10),
        pincode: joi.string().required(),
        address: joi.string().required(),
        age: joi.number().required(),
        sex: joi.string().required(),
        pan: joi.string().required(),
        aadhar: joi.string().required(),
        purpose: joi.string().required().min(10),
        accno: joi.string().required().min(10),
        money: joi.number().required(),
    }
    return joi.validate(data, schema)
}

const lenderRegisterValidation = (data) => {
    const schema = {
        name: joi.string().min(6).required(),
        mail: joi.string().min(6).required().email(),
        pass: joi.string().min(6).required(),
        phone: joi.string().min(10).required().max(10),
        pincode: joi.string().required(),
        address: joi.string().required(),
        age: joi.number().required(),
        sex: joi.string().required(),
        pan: joi.string().required(),
        aadhar: joi.string().required(),
        accno: joi.string().required().min(10)
    }
    return joi.validate(data, schema)
}

const loginValidation = (data) => {
    const schema = {
        mail: joi.string().required().min(6).email(),
        pass: joi.string().required().min(6)
    }
    return joi.validate(data, schema)
}

const transacValidator = (data) => {
    const schema = {
        frommail: joi.string().required().min(6).email(),
        toMail: joi.string().required().min(6).email(),
        pass: joi.string().required().min(6),
        amount: joi.number.required()
    }
    return joi.validate(data, schema)
}

module.exports.transacValidator = transacValidator
module.exports.loginValidation = loginValidation
module.exports.barrowerRegisterValidation = barrowerRegisterValidation
module.exports.lenderRegisterValidation = lenderRegisterValidation