const router = require('express').Router();
const tipoUniversalService = require('./tipouniversal.service');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {
    try {
        const results = await tipoUniversalService.getAllTipoUniversal();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const results = await tipoUniversalService.getTipoUniversalById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;