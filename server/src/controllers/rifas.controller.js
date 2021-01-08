const db = require("../db/index");
const rifasCtrl = {};

rifasCtrl.obtener_rifas = async (req, res) => {
  try {
    const resultado = await db.query("SELECT * FROM rifa");
    res.status(200).json({
      status: "success",
      resultado: resultado.rows.length,
      data: {
        rifas: resultado.rows,
      },
    });
  } catch (e) {
    console.error(e.message);
  }
};

rifasCtrl.crear_rifas = async (req, res) => {
  console.log(req.body);
  try {
    const cantidad_rifas = 50;
    let resultado  = "";
    for (let i = 0; i < cantidad_rifas; i++) {
        resultado  = await db.query(
        "INSERT INTO rifa(disponible) VALUES(FALSE) RETURNING *"
      );
    }

    res.status(200).json({
      status: "success",
      resultado: resultado.rows.length,
      data: {
        rifas: resultado.rows,
      },
    });
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = rifasCtrl;
