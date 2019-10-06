module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const rate = { ...req.body }
        if(req.query.id ) rate.id = req.query.id
        if(rate.id) {
            app.db('rating')
            .update(rate)
            .where({ id: rate.id })
            .then(_ => res.status(204).send())
            .catch(err => console.error(err))
        }else{
            app.db('rating')
                .insert(rate)
                .then(_ => res.status(204).send())
                .catch(err => console.error(err))
        }
    }

    const remove = async (req, res) => {
            try{
                const rowsDeleted = await app.db('rating')
                    .where({ userId: req.query.id})
                    .where({ ownerId: req.query.owner}).del()
                existsOrError(rowsDeleted, 'Não podemos realizar essa operação')
    
                res.status(204).send()
    
            } catch(msg) {
            res.status(500).send(msg)
        }
    }
    
        
        
        const get = async (req, res) =>{
            const user = req.query.id
            
            app.db('rating')
                .select()
                .where({ownerId: user})
                .then(rates => res.json({ data: rates}))
                .catch(err => res.status(500).send(err))
        }    
        return { get, save, remove }    
    }