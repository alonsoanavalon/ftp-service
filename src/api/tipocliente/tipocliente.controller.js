const router = require('express').Router();
const tipoClienteService = require('./tipocliente.service');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {
    try {
        const results = await tipoClienteService.getAllTipoCliente();
        res.send(results);
    } catch (err) {
        logError(err)
    }
   
})

router.get('/:id', async (req, res) => {

    try {
        const results = await tipoClienteService.getTipoClienteById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }
  
})

module.exports = router;