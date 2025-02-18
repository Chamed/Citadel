const bcrypt = require ('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError} = app.api.validation   

    const encryptPass = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    const save = async(req, res) => {
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id
    
        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false
    try{
        existsOrError(user.name, 'Nome não foi informado')
        existsOrError(user.email, 'E-mail não foi informado')
        existsOrError(user.password, 'Senha não foi informado')
        existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
        equalsOrError(user.password, user.confirmPassword, 'As senhas não conferem')

        const userFromDB = await app.db('users')
            .where({email: user.email}).first()
            if(!user.id){
        notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        
    }catch(msg){
        return res.status(500).send(err)
    }
    user.update ? null :user.password = encryptPass(req.body.password)
    delete user.confirmPassword
    delete user.update

    if(user.id){
        app.db('users')
            .update(user)
            .where({id: user.id})
            .whereNull('deletedAt')
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }else{
        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
}

    const get = (req, res) => {
        app.db('users')
            .select()
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getUserById = (req, res) => {
        app.db('users')
            .select()
            .where({id: req.params.id})
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }
    const remove = async (req, res) => {
        try {
            const posts = await app.db('posts')
            .where({ userId: req.params.id })
        notExistsOrError(posts, 'Usuário possui postagens')

        const rowsUpdated = await app.db('users')
            .update({deletedAt : new Date})
            .where({ id: req.params.id })
        existsOrError(rowsUpdated, 'Não foi possível localizar o usuário')

        res.status(204).send()
        }catch(err){
            res.status(400).send(err)
        }
    }
    return {save, get, getUserById, remove}
}