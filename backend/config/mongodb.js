const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/citadel_stats', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'Não foi possível conectar com MongoDB'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })