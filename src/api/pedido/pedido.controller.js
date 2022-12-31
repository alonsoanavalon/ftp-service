const router = require('express').Router();
const pedidoService = require('./pedido.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await pedidoService.getAllPedido();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const pedido = {
        "cliente_id": req.body.cliente_id,
        "metodopago_id": req.body.metodopago_id,
        "tipodocumento_id": req.body.tipodocumento_id,
        "estado_id": req.body.estado_id,
        "metodoentrega_id": req.body.metodoentrega_id,
        "fecha": req.body.fecha,
        "receptor": req.body.receptor,
        "pedido": req.body.pedido,
        "precio": req.body.precio,
        "direccion": req.body.direccion
    }
    const results = await pedidoService.createPedido(pedido);
    res.send(results);
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {
    const pedido = {
        'id': req.params.id,
        "cliente_id": req.body.cliente_id,
        "metodopago_id": req.body.metodopago_id,
        "tipodocumento_id": req.body.tipodocumento_id,
        "estado_id": req.body.estado_id,
        "metodoentrega_id": req.body.metodoentrega_id,
        "fecha": req.body.fecha,
        "receptor": req.body.receptor,
        "pedido": req.body.pedido,
        "precio": req.body.precio,
        "direccion": req.body.direccion
    }
    const results = await pedidoService.updatePedido(pedido);
    res.send(results);
})

router.get('/:id', async (req, res) => {
    const results = await pedidoService.getPedidoById(req.params.id);
    res.send(results);
})

module.exports = router;