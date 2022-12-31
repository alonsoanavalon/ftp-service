const router = require('express').Router();
const tipoClienteService = require('./tipocliente.service');

router.route('/')
.get(async (req, res) => {
    const results = await tipoClienteService.getAllTipoCliente();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await tipoClienteService.getTipoClienteById(req.params.id);
    res.send(results);
})

module.exports = router;