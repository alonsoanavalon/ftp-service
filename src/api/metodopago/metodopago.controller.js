const router = require('express').Router();
const metodoPagoService = require('./metodopago.service');

router.route('/')
.get(async (req, res) => {
    const results = await metodoPagoService.getAllMetodoPago();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await metodoPagoService.getMetodoPagoById(req.params.id);
    res.send(results);
})

module.exports = router;