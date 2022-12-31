const router = require('express').Router();
const listaPedidoService = require('./listapedido.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(authController.isAuthenticated, async (req, res) => {
    const results = await listaPedidoService.getAllListaPedido();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const listaPedido = {
        "producto_id": req.body.producto_id,
        "pedido_id": req.body.pedido_id,
        "cantidad": req.body.cantidad
    }
    const results = await listaPedidoService.createListaPedido(listaPedido);
    res.send(results);
})

router.get('/:id', authController.isAuthenticated,  async (req, res) => {
    const results = await listaPedidoService.getListaPedidoById(req.params.id);
    res.send(results);
})

module.exports = router;