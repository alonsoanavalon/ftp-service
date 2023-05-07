const router = require('express').Router();
const categoriaService = require('./categoria.service');
const authController = require('../../controllers/authControllers')
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await categoriaService.getAllCategoria();
        res.send(results);     
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {



    try {
        const categoria = {
            "nombre": req.body.nombre,
            "imagen": req.body.imagen
        }
        const results = await categoriaService.createCategoria(categoria);
        res.send(results); 
    } catch (err) {
        logError(err)
    }
})

router.put('/:id', authController.isAuthenticated, async (req, res) => {


    try {
        const categoria = {
            'id': req.params.id,
            "nombre": req.body.nombre,
            "imagen": req.body.imagen
        }
        const results = await categoriaService.updateCategoria(categoria);
        res.send(results);
    } catch (err) {
        logError(err)
    }
})

router.get('/:id',authController.isAuthenticated, async (req, res) => {

    try {
        const results = await categoriaService.getCategoriaById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }
})

module.exports = router;