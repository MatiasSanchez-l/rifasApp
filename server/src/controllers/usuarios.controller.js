const db = require("../db/index");
const usuariosCtrl = {};

usuariosCtrl.crear_usuario = (req, res) => {
    console.log("creando usuario");
  };

usuariosCtrl.obtener_usuario = async(req, res) => {
    console.log(req.params.id);
    try {
        const resultado = await db.query("SELECT * FROM usuario where usuario_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            data:{
                usuario: resultado.rows[0],
            }
        });
    } catch (e) {
        console.error(e.message);
    }
  };

module.exports = usuariosCtrl;