const { Router } = require("express");
const router = Router();

const { contacto } = require('../controllers/nodemailer.controller');

router.route("/contacto")
    .post(contacto);

module.exports = router;