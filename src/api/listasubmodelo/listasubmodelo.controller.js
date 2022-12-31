const router = require('express').Router();
const listaSubmodeloService = require('./listasubmodelo.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await listaSubmodeloService.getAllListaSubmodelo();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const listaSubmodelo = {
        "submodelo_id": req.body.submodelo_id,
        "fabricacion_id": req.body.fabricacion_id
    }
    const results = await listaSubmodeloService.createListaSubmodelo(listaSubmodelo);
    res.send(results);
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {
    const listaSubmodelo = {
        'id': req.params.id,
        'producto_id': req.body.producto_id,
        'listasubmodelo_id': req.body.listasubmodelo_id
    }
    const results = await listaSubmodeloService.updateListaSubmodelo(listaSubmodelo);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await listaSubmodeloService.getListaSubmodeloById(req.params.id);
    res.send(results);
})

module.exports = router;