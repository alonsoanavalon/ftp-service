const router = require('express').Router();
const pedidoService = require('./pedido.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await pedidoService.getAllPedido();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {

    try {
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
    } catch (err) {
        logError(err)
    }
  
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {

    try {
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
    } catch (err) {
        logError(err)
    }
   
})

router.get('/:id', async (req, res) => {

    try {
        const results = await pedidoService.getPedidoById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;