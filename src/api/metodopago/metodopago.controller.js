const router = require('express').Router();
const metodoPagoService = require('./metodopago.service');
const { logError } = require('../../errorHandler');

router.route('/')
.get(async (req, res) => {

    try {
        const results = await metodoPagoService.getAllMetodoPago();
        res.send(results);
    } catch (err) {
        logError(err)
    }
 

})

router.get('/:id', async (req, res) => {

    try {
        const results = await metodoPagoService.getMetodoPagoById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }
 

})

module.exports = router;