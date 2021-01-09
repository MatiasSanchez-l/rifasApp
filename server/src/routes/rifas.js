const { Router } = require("express");
const router = Router();
const { obtener_rifas, crear_rifas } = require('../controllers/rifas.controller');

//obtener todas las rifa
router.route("/")
    .get(obtener_rifas)

router.route("/:cantidad")
    .post(crear_rifas);

module.exports = router;