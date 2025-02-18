const { authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcripty = require ('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password){
            return res.status(400).send('Usuário ou senha invalidos')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if(!user){
             return res.status(400).send('Usuário não foi encontrado')
        }
        const isMatch = bcripty.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(400).send('E-mail ou senha inválidos')


        const now = Math.floor(Date.now()/1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + ((60 * 60 * 24))
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch(e){
            //algo errado com token
        }

        res.send(false)
    }
    return { signin, validateToken }
}