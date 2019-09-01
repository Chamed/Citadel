module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const friendship = { ...req.body }
        friendship.id = `${friendship.idFollower}${friendship.idFollowing}`

            app.db('friendship')
                .insert(friendship)
                .then(_ => res.status(204).send())
                .catch(err => console.error(err))
        }

    const remove = async (req, res) => {
            try{
                const rowsDeleted = await app.db('friendship')
                    .where({ idFollower: req.query.idFollower})
                    .where({ idFollowing: req.query.idFollowing}).del()
                existsOrError(rowsDeleted, 'Erro desconhecido')
    
                res.status(204).send()
    
            } catch(msg) {
            res.status(500).send(msg)
        }
    }
    
        const get = async (req, res) =>{
            app.db('friendship')
                .select()
                .where({id:`${req.query.idFollower}${req.query.idFollowing}`})
                .then(friends => res.json({ data: friends}))
                .catch(err => console.error(err))
        } 
        
        const getFollow = async (req, res) =>{
           req.params.type == 'idFollower' ?
            app.db('friendship')
                .select()
                .where({idFollower : req.params.id})
                .then(friends => res.json({ data: friends}))
                .catch(err => console.error(err)):
            app.db('friendship')
                .select()
                .where({idFollowing : req.params.id})
                .then(friends => res.json({ data: friends}))
                .catch(err => console.error(err))
        }  
        return { get, save, remove, getFollow }    
    }