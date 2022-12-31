const router = require('express').Router();
const usuarioService = require('./usuario.service');
const authController = require('../../controllers/authControllers');

router.route('/')
.get(authController.isAuthenticated, async (req, res) => {
    const results = await usuarioService.getAllUsuario();
    res.send(results);
})

router.get('/:id', authController.isAuthenticated, async (req, res) => {
    const results = await usuarioService.getUsuarioById(req.params.id);
    res.send(results);
})

module.exports = router;