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
  try {
    const cantidad_rifas = req.params.cantidad;
    let resultado  = "";
    for (let i = 0; i < cantidad_rifas; i++) {
        resultado  = await db.query(
        "INSERT INTO rifa(disponible) VALUES(TRUE) RETURNING *"
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

rifasCtrl.comprar_rifas = async (req, res) => {
  try {
    // cantidad de rifas a comprar
    const cantidad_rifas_comprar = req.params.cantidad;

    //obtener rifas disponibles
    const rifas_disponibles = await db.query("SELECT rifa_id FROM rifa WHERE disponible = TRUE");
    const cantidad_rifas_disponibles = rifas_disponibles.rows.length;
    
    let rifas_compradas = [];

    //comprar rifas aleatorias
   for (let i = 0; i < cantidad_rifas_comprar; i++) {
      const numero_ramdon = Math.floor(Math.random() * cantidad_rifas_disponibles);

      const rifa_a_comprar = rifas_disponibles.rows[numero_ramdon].rifa_id;

      rifas_compradas.push(rifa_a_comprar);
      
      //sacar disponibilida de rifa
      await db.query("UPDATE rifa SET disponible = false::boolean WHERE rifa_id = $1;", [rifa_a_comprar]);
    }
    
    res.status(200).json({
      cantidad: cantidad_rifas_comprar,
      rifas_compradas: rifas_compradas,
    });
  } catch (e) {
    console.error(e.message);
  }
};


module.exports = rifasCtrl;
