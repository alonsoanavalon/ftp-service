const router = require('express').Router();
const marcaService = require('./marca.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await marcaService.getAllMarca();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const marca = {
        "nombre": req.body.nombre
    }
    const results = await marcaService.createMarca(marca);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await marcaService.getMarcaById(req.params.id);
    res.send(results);
})

module.exports = router;