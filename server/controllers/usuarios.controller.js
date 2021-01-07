const db = require("../db/index");

const obtener_usuario = async(req, res) => {
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

module.exports = {
    obtener_usuario
  };