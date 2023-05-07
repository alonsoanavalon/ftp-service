const router = require('express').Router();
const productoService = require('./producto.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await productoService.getAllProducto();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {

    try {
        const producto = {
            "codigo": req.body.codigo,
            "categoria_id": req.body.categoria_id,
            "tipouniversal_id": req.body.tipouniversal_id,
            "SKU": req.body.SKU,
            "nombre": req.body.nombre,
            "precio": req.body.precio,
            "marca": req.body.marca,
            "descripcion": req.body.descripcion,
            "cantidad": req.body.cantidad,
            "imagen": req.body.imagen,
            "imagen_2": req.body.imagen_2,
            "imagen_3": req.body.imagen_3,
        }
        const results = await productoService.createProducto(producto);
        res.send(results);
    } catch (err) {
        logError(err)
    }
   
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {

    try {
        const listaProducto = {
            'id': req.params.id,
            "codigo": req.body.codigo,
            "categoria_id": req.body.categoria_id,
            "tipouniversal_id": req.body.tipouniversal_id,
            "SKU": req.body.SKU,
            "nombre": req.body.nombre,
            "precio": req.body.precio,
            "marca": req.body.marca,
            "descripcion": req.body.descripcion,
            "cantidad": req.body.cantidad,
            "imagen": req.body.imagen,
            "imagen_2": req.body.imagen_2,
            "imagen_3": req.body.imagen_3,
        }
        const results = await productoService.updateProducto(listaProducto);
        res.send(results);
    } catch (err) {
        logError(err)
    }
    
})

router.get('/:id', async (req, res) => {

    try {
        const results = await productoService.getProductoById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;