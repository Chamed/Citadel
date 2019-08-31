module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const comment = { ...req.body }

        if(req.params.id) comment.id = req.params.id

        try{
            existsOrError(comment.comment, 'Você não pode fazer um comentário em branco.')
        }catch(msg){
            res.status(400).send(msg)
        }
        if(comment.id) {
            app.db('comments')
                .update(comment)
                .where({ id: comment.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else {
            app.db('comments')
                .insert(comment)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }
    const remove = async (req, res) => {
    
        try{
            const rowsDeleted = await app.db('comments')
                .where({ id: req.query.id}).del()
            existsOrError(rowsDeleted, 'Comentario não foi encontrado')

            res.status(204).send()

        } catch(msg) {
                res.status(500).send(msg)
            }
        }

        const get = async (req, res) =>{
            const post = req.query.id

            app.db({c: 'comments', u: 'users'})
                .select('c.id', 'c.comment', 'c.createdAt', {author: 'u.name'}, {email: 'u.email'})
                .where({postId: post})
                .whereRaw('?? = ??', ['u.id', 'c.userId'])
                .then(posts => res.json({ data: posts}))
                .catch(err => res.status(500).send(err))
        }    
        return { get, save, remove }
    }
