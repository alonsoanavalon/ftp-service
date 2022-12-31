const router = require('express').Router();
const metodoEntregaService = require('./metodoentrega.service');

router.route('/')
.get(async (req, res) => {
    const results = await metodoEntregaService.getAllMetodoEntrega();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await metodoEntregaService.getMetodoEntregaById(req.params.id);
    res.send(results);
})

module.exports = router;