const router = require('express').Router();
const tipoUniversalService = require('./tipouniversal.service');

router.route('/')
.get(async (req, res) => {
    const results = await tipoUniversalService.getAllTipoUniversal();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await tipoUniversalService.getTipoUniversalById(req.params.id);
    res.send(results);
})

module.exports = router;