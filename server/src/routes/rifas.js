const { Router } = require("express");
const router = Router();
const validInfo = require("../middleware/validinfo");
const { obtener_rifas, crear_rifas, comprar_rifas, obtener_total } = require('../controllers/rifas.controller');

router.route("/")
    .get(obtener_rifas);

router.route("/crear/:cantidad")
    .post(crear_rifas);

router.route("/comprar")
    .get(validInfo, comprar_rifas);

router.route("/total")
    .get(obtener_total);

module.exports = router;