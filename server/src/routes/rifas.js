const { Router } = require("express");
const router = Router();
const validInfo = require("../middleware/validinfo");
const { obtener_rifas, crear_rifas, comprar_rifas, obtener_total, comprar_rifas_mp, notificacion, obtener_rifa_random, obtener_rifas_compra } = require('../controllers/rifas.controller');

router.route("/")
    .get(obtener_rifas);

router.route("/rifa_rand")
    .get(obtener_rifa_random);

router.route("/crear/:cantidad")
    .post(crear_rifas);

router.route("/comprar")
    .put(validInfo, comprar_rifas);

router.route("/comprar_mp")
    .put(validInfo, comprar_rifas_mp);

router.route("/notificaciones")
    .post(notificacion);

router.route("/obtener_rifas_compra/:external_reference")
    .get(obtener_rifas_compra);

router.route("/total")
    .get(obtener_total);



module.exports = router;