const router = require('express').Router();
const metodoEntregaService = require('./metodoentrega.service');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await metodoEntregaService.getAllMetodoEntrega();
        res.send(results);
    } catch (err) {
        logError(err)
    }
 
})

router.get('/:id', async (req, res) => {

    try {
        const results = await metodoEntregaService.getMetodoEntregaById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;