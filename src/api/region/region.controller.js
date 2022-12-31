const router = require('express').Router();
const regionPagoService = require('./region.service');

router.route('/')
.get(async (req, res) => {
    const results = await regionPagoService.getAllRegion();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await regionPagoService.getRegionById(req.params.id);
    res.send(results);
})

module.exports = router;