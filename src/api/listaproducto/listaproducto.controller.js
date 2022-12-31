const router = require('express').Router();
const listaProductoService = require('./listaproducto.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await listaProductoService.getAllListaProducto();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const listaProducto = {
        'producto_id': req.body.producto_id,
        'listasubmodelo_id': req.body.listasubmodelo_id
    }
    const results = await listaProductoService.createListaProducto(listaProducto);
    res.send(results);
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {
    const listaProducto = {
        'id': req.params.id,
        'producto_id': req.body.producto_id,
        'listasubmodelo_id': req.body.listasubmodelo_id
    }
    const results = await listaProductoService.updateListaProducto(listaProducto);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await listaProductoService.getListaProductoById(req.params.id);
    res.send(results);
})

module.exports = router;