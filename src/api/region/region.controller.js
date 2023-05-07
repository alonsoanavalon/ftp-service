const router = require('express').Router();
const regionPagoService = require('./region.service');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await regionPagoService.getAllRegion();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const results = await regionPagoService.getRegionById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }


})

module.exports = router;