module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const like = { ...req.body }

            app.db('likes')
                .insert(like)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    const remove = async (req, res) => {
            try{
                const rowsDeleted = await app.db('likes')
                    .where({ userId: req.query.id})
                    .where({ postId: req.query.postId}).del()
                existsOrError(rowsDeleted, 'Like não existe')
    
                res.status(204).send()
    
            } catch(msg) {
            res.status(500).send(msg)
        }
    }
    
        
        
        const get = async (req, res) =>{
            const post = req.query.id
            
            app.db('likes')
                .select()
                .where({postId: post})
                .then(posts => res.json({ data: posts}))
                .catch(err => res.status(500).send(err))
        }    
        return { get, save, remove }    
    }