
const { Router } = require("express");
const router = Router();
const { obtener_rifas, crear_rifas } = require('../controllers/rifas.controller');
const { obtener_usuario } = require('../controllers/usuarios.controller');

//obtener todas las rifa
router.get("/rifas", obtener_rifas);

//obtener un usuario
router.get("/usuario/:id", obtener_usuario);

//crear rifas
router.post("/rifas", crear_rifas);

//crear un usuario
router.post("/usuario", (req, res) => {
  console.log("creando usuario");
});

module.exports = router;
