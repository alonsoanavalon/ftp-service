const router = require('express').Router();
const clientesService = require('./clientes.service');
const authController = require('../../controllers/authControllers')

router.route('/')
.get(authController.isAuthenticated, async (req, res) => {
    const results = await clientesService.getAllClientes();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const cliente = {
        'nombre': req.body.nombre || '', 
        'apellido': req.body.apellido || '', 
        'contraseña': req.body.contraseña || '', 
        'email': req.body.email || '', 
        'telefono': req.body.telefono || '', 
        'rut': req.body.rut || '', 
        'giroempresa': req.body.giroempresa || '', 
        'tipocliente_id': req.body.tipocliente_id || ''
    }
    const results = await clientesService.createCliente(cliente);
    res.send(results);
})

router.get('/filter', authController.isAuthenticated, async (req, res) => {
    const results = await clientesService.clienteByFilter(req.query.email, req.query.phone, req.query.rut)
    res.send(results)
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {
    const cliente = {
        'id': req.params.id,
        'nombre': req.body.nombre || '', 
        'apellido': req.body.apellido || '', 
        'contraseña': req.body.contraseña || '', 
        'email': req.body.email || '', 
        'telefono': req.body.telefono || '', 
        'rut': req.body.rut || '', 
        'giroempresa': req.body.giroempresa || '', 
        'tipocliente_id': req.body.tipocliente_id || ''
    }
    const results = await clientesService.updateCliente(cliente);
    res.send(results);
})

router.get('/:id', authController.isAuthenticated, async (req, res) => {
    const results = await clientesService.getClienteById(req.params.id);
    res.send(results);
})

module.exports = router;