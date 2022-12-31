const router = require('express').Router();
const modeloService = require('./modelo.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await modeloService.getAllModelo();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const modelo = {
        "marca_id": req.body.marca_id,
        "nombre": req.body.nombre
    }
    const results = await modeloService.createModelo(modelo);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await modeloService.getModeloById(req.params.id);
    res.send(results);
})

module.exports = router;