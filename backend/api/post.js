const queries = require ('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const post = { ...req.body }
        if(req.params.id) post.id = req.params.id

        try{
            existsOrError(post.name, 'Nome não foi informado')
            existsOrError(post.description, 'Descrição não pode ficar em branco')
            existsOrError(post.categoryId, 'Categoria não selecionada')
            existsOrError(post.userId, 'Autor não foi informado')
            existsOrError(post.content, 'Conteúdo não pode ficar em branco')
        }catch(msg){
            res.status(400).send(msg)
        }
        if(post.id) {
            app.db('posts')
                .update(post)
                .where({ id: post.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else {
            app.db('posts')
                .insert(post)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }
    const remove = async (req, res) => {
        try{
            const rowsDeleted = await app.db('posts')
                .where({ id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Postagem não foi encontrada')

            res.status(204).send()

        } catch(msg) {
                res.status(500).send(msg)
            }
        }
        const limit = 10 //paginação

        const get = async (req, res) =>{
            const page = req.query.page || 1

            const user = req.query.userId
            const result = await app.db('posts').count('id').first()
            const count = parseInt(result.count)
        
            const query = user ? {userId:user}: {}

            app.db('posts')
                .select()
                .where(query)
                .limit(limit).offset(page * limit - limit)
                .then(posts => res.json({ data: posts, count, limit}))
                .catch(err => res.status(500).send(err))
        }    

        const getPostById = (req, res) => {
            app.db('posts')
                .where({id: req.params.id})
                .first()
                .then(post => {
                    post.content = post.content.toString()
                    return res.json(post)
                })
                .catch(err => res.status(500).send(err))
        }

        const getByCategory = async (req, res) => {
            const categoryId = req.params.id
            const page = req.query.page || 1
            const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
            const ids = categories.rows.map(c => c.id)

            app.db({p: 'posts', u: 'users'})
                .select('p.id', 'p.name', 'p.description', 'p.imageUrl', {author: 'u.name'})
                .limit(limit).offset(page * limit - limit)
                .whereRaw('?? = ??', ['u.id', 'p.userId'])
                .whereIn('categoryId', ids)
                .orderBy('p.id', 'desc')
                .then(posts => res.json(posts))
                .catch(err => console.error(err))
        }
        return { get, save, remove, getPostById, getByCategory  }
    }
