const router = require('express').Router();
const comunaService = require('./comuna.service');
const authController = require('../../controllers/authControllers')

router.route('/')
.get(async (req, res) => {
    const results = await comunaService.getAllComuna();
    res.send(results);
})
router.get('/:id', async (req, res) => {
    const results = await comunaService.getComunaById(req.params.id);
    res.send(results);
})

module.exports = router;