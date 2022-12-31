const router = require('express').Router();
const productoService = require('./producto.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(async (req, res) => {
    const results = await productoService.getAllProducto();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
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
        "precio_local": req.body.precio_local,
        "estado": req.body.estado
        
    }
    const results = await productoService.createProducto(producto);
    res.send(results);
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {
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
})

router.get('/:id', async (req, res) => {
    const results = await productoService.getProductoById(req.params.id);
    res.send(results);
})

module.exports = router;