const router = require('express').Router();
const estadoService = require('./estado.storageService');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {
    try {
        const results = await estadoService.getAllEstado();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const results = await estadoService.getEstadoById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;