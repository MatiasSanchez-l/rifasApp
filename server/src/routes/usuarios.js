const { Router } = require("express");
const router = Router();
const authorization = require("../middleware/authorization");
const { obtener_usuario, crear_usuario, loguear_usuario, verificado} = require('../controllers/usuarios.controller');

router.route("/")
    .post(crear_usuario);


router.route("/obtener/:id")
    .get(obtener_usuario);

router.route("/login")
    .post(loguear_usuario);

router.route("/logout")
    .get();

router.route("/verificado")
    .get(authorization, verificado);


module.exports = router;