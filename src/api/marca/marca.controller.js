const router = require('express').Router();
const marcaService = require('./marca.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await marcaService.getAllMarca();
        res.send(results);
    } catch (err) {
        logError(err)
    }
 
})
.post(authController.isAuthenticated, async (req, res) => {

    try {
        const marca = {
            "nombre": req.body.nombre
        }
        const results = await marcaService.createMarca(marca);
        res.send(results);
    } catch (err) {
        logError(err)
    }
  
})

router.get('/:id', async (req, res) => {

    try {
        const results = await marcaService.getMarcaById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;