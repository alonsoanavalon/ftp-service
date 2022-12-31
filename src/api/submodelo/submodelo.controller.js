const router = require('express').Router();
const submodeloService = require('./submodelo.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await submodeloService.getAllSubmodelo();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const submodelo = {
        "modelo_id": req.body.modelo_id,
        "nombre": req.body.nombre,
    }
    const results = await submodeloService.createSubmodelo(submodelo);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await submodeloService.getSubmodeloById(req.params.id);
    res.send(results);
})

module.exports = router;