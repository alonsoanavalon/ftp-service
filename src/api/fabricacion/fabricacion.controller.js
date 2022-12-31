const router = require('express').Router();
const fabricacionService = require('./fabricacion.service');
const authController = require('../../controllers/authControllers')

router.route('/')
.get(async (req, res) => {
    const results = await fabricacionService.getAllFabricacion();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const fabricacion = {
        "fecha": req.body.fecha
    }
    const results = await fabricacionService.createFabricacion(fabricacion);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await fabricacionService.getFabricacionById(req.params.id);
    res.send(results);
})

module.exports = router;