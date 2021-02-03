const { Router } = require("express");
const router = Router();
const authorization = require("../middleware/authorization");
const { algo } = require('../controllers/dashboard.controller');

router.route("/")
    .get(authorization, algo);

module.exports = router;