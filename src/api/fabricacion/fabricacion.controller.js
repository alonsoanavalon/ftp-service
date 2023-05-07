const router = require('express').Router();
const fabricacionService = require('./fabricacion.service');
const authController = require('../../controllers/authControllers')
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {
    try {
        const results = await fabricacionService.getAllFabricacion();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {
    try {
        const fabricacion = {
            "fecha": req.body.fecha
        }
        const results = await fabricacionService.createFabricacion(fabricacion);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const results = await fabricacionService.getFabricacionById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;