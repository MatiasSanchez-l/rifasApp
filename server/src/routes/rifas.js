const { Router } = require("express");
const router = Router();
const validInfo = require("../middleware/validinfo");
const { obtener_rifas, crear_rifas, comprar_rifas } = require('../controllers/rifas.controller');

router.route("/")
    .get(obtener_rifas);

router.route("/crear/:cantidad")
    .post(crear_rifas);

router.route("/comprar")
    .put(validInfo, comprar_rifas);

module.exports = router;