const router = require('express').Router();
const listaProductoService = require('./listaproducto.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {
    try {
        const results = await listaProductoService.getAllListaProducto();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {

    try {
        const listaProducto = {
            'producto_id': req.body.producto_id,
            'listasubmodelo_id': req.body.listasubmodelo_id
        }
        const results = await listaProductoService.createListaProducto(listaProducto);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.put('/:id', authController.isAuthenticated, async (req, res) => {

    try {
        const listaProducto = {
            'id': req.params.id,
            'producto_id': req.body.producto_id,
            'listasubmodelo_id': req.body.listasubmodelo_id
        }
        const results = await listaProductoService.updateListaProducto(listaProducto);
        res.send(results);
    } catch (err) {
        logError(err)
    }


})

router.get('/:id', async (req, res) => {

    try {
        const results = await listaProductoService.getListaProductoById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;