const { Router } = require("express");
const router = Router();

const { rifas, contacto } = require('../controllers/nodemailer.controller');

router.route("/rifas")
    .post(rifas);

router.route("/contacto")
    .post(contacto);

module.exports = router;