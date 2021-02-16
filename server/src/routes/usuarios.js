const { Router } = require("express");
const router = Router();
const authorization = require("../middleware/authorization");
const { loguear_usuario, verificado } = require('../controllers/usuarios.controller');

router.route("/login")
    .post(loguear_usuario);

router.route("/logout")
    .get();

router.route("/verificado")
    .get(authorization, verificado);


module.exports = router;