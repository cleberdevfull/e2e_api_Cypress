const Joi = require('joi')

const usuariosSchema = Joi.object({
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string(),
        administrador: Joi.string().valid('true', 'false'),
        _id: Joi.string()
    }),
    quantidade: Joi.number()
})
export default usuariosSchema;
