const router = require('express').Router();
const tipoDocumentoService = require('./tipodocumento.service');

router.route('/')
.get(async (req, res) => {
    const results = await tipoDocumentoService.getAllTipoDocumento();
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await tipoDocumentoService.getTipoDocumentoById(req.params.id);
    res.send(results);
})

module.exports = router;