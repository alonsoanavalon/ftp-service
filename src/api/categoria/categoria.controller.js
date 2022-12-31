const router = require('express').Router();
const categoriaService = require('./categoria.service');
const authController = require('../../controllers/authControllers')

router.route('/')
.get(async (req, res) => {
    const results = await categoriaService.getAllCategoria();
    res.send(results);
})
.post(authController.isAuthenticated, async (req, res) => {
    const categoria = {
        "nombre": req.body.nombre,
        "imagen": req.body.imagen
    }
    const results = await categoriaService.createCategoria(categoria);
    res.send(results);
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {
    const categoria = {
        'id': req.params.id,
        "nombre": req.body.nombre,
        "imagen": req.body.imagen
    }
    const results = await categoriaService.updateCategoria(categoria);
    res.send(results);
})

router.get('/:id',authController.isAuthenticated, async (req, res) => {
    const results = await categoriaService.getCategoriaById(req.params.id);
    res.send(results);
})

module.exports = router;