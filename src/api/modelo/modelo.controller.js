const router = require('express').Router();
const modeloService = require('./modelo.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await modeloService.getAllModelo();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {

    try {
        const modelo = {
            "marca_id": req.body.marca_id,
            "nombre": req.body.nombre
        }
        const results = await modeloService.createModelo(modelo);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const results = await modeloService.getModeloById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

  
})

module.exports = router;