const router = require('express').Router();
const listaSubmodeloService = require('./listasubmodelo.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');

router.route('/')
.get(async (req, res) => {

    try {
        const results = await listaSubmodeloService.getAllListaSubmodelo();
    res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {

    try {
        const listaSubmodelo = {
            "submodelo_id": req.body.submodelo_id,
            "fabricacion_id": req.body.fabricacion_id
        }
        const results = await listaSubmodeloService.createListaSubmodelo(listaSubmodelo);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.put('/:id', authController.isAuthenticated, async (req, res) => {

    try {
        const listaSubmodelo = {
            'id': req.params.id,
            'producto_id': req.body.producto_id,
            'listasubmodelo_id': req.body.listasubmodelo_id
        }
        const results = await listaSubmodeloService.updateListaSubmodelo(listaSubmodelo);
        res.send(results);
    } catch (err) {
        logError(err)
    }



})

router.get('/:id', async (req, res) => {

    try {
        const results = await listaSubmodeloService.getListaSubmodeloById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;