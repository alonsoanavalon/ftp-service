const router = require('express').Router();
const comunaService = require('./comuna.service');
const authController = require('../../controllers/authControllers')
const { logError } = require('../../errorHandler');


router.route('/')
.get(async (req, res) => {

    try {
        const results = await comunaService.getAllComuna();
        res.send(results);
    } catch (err) {
        logError(err)
    }

})
router.get('/:id', async (req, res) => {
    try {
        const results = await comunaService.getComunaById(req.params.id);
        res.send(results);
    } catch (err) {
        logError(err)
    }

})

module.exports = router;