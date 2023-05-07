const router = require('express').Router();
const submodeloService = require('./submodelo.service');
const authController = require('../../controllers/authControllers');
const { logError } = require('../../errorHandler');

router.route('/')
.get(async (req, res) => {
    try {
        const results = await submodeloService.getAllSubmodelo();
    res.send(results);
    } catch (err) {
        logError(err)
    }

})
.post(authController.isAuthenticated, async (req, res) => {

    try {
        const submodelo = {
            "modelo_id": req.body.modelo_id,
            "nombre": req.body.nombre,
        }
        const results = await submodeloService.createSubmodelo(submodelo);
        res.send(results);
    } catch (err) {
        logError(err)
    }
 
})

router.get('/:id', async (req, res) => {
    try {
        const results = await submodeloService.getSubmodeloById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;