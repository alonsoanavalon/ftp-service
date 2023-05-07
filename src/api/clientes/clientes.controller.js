const router = require('express').Router();
const clientesService = require('./clientes.service');
const authController = require('../../controllers/authControllers')
const { logError } = require('../../errorHandler');


router.route('/')
.get(authController.isAuthenticated, async (req, res) => {


    try {
        const results = await clientesService.getAllClientes();
        res.send(results);  
    } catch (err) {
        logError(err)
    }
})
.post(authController.isAuthenticated, async (req, res) => {


    try {
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
    } catch (err) {
        logError(err)
    }
   
})

router.get('/filter', authController.isAuthenticated, async (req, res) => {

    try {
        const results = await clientesService.clienteByFilter(req.query.email, req.query.phone, req.query.rut)
        res.send(results)
    } catch (err) {
        logError(err)
    }

})

router.put('/:id', authController.isAuthenticated, async (req, res) => {

    try {
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
    } catch (err) {
        logError(err)
    }
   
})

router.get('/:id', authController.isAuthenticated, async (req, res) => {
    try {
        const results = await clientesService.getClienteById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;