const router = require('express').Router();
const usuarioService = require('./usuario.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');

router.route('/')
.get(authController.isAuthenticated, async (req, res) => {

    try {
        const results = await usuarioService.getAllUsuario();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

router.get('/:id', authController.isAuthenticated, async (req, res) => {
    try {
        const results = await usuarioService.getUsuarioById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }


})

module.exports = router;