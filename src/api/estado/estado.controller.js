const router = require('express').Router();
const estadoService = require('./estado.storageService');

router.route('/')
.get(async (req, res) => {
    const results = await estadoService.getAllEstado();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await estadoService.getEstadoById(req.params.id);
    res.send(results);
})

module.exports = router;