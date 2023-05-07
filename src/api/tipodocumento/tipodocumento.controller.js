const router = require('express').Router();
const tipoDocumentoService = require('./tipodocumento.service');
const { logError } = require('../../errorHandler');

router.route('/')
.get(async (req, res) => {

    try {
        const results = await tipoDocumentoService.getAllTipoDocumento();
        res.send(results);
    } catch (err) {
        logError(err)
    }
   

})

router.get('/:id', async (req, res) => {
    try {
        const results = await tipoDocumentoService.getTipoDocumentoById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;