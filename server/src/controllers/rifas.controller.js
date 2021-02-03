const db = require("../db/index");
const rifasCtrl = {};

rifasCtrl.obtener_rifas = async (req, res) => {
  try {
    const resultado = await db.query("select rifa_id as numero_rifa, disponible, nombre as cliente_nombre, apellido as cliente_apellido, email as cliente_email, telefono as cliente_telefono, compra_id from rifa r left join cliente cl on cl.cliente_id = r.cliente_id;");
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
    let resultado = "";
    for (let i = 0; i < cantidad_rifas; i++) {
      resultado = await db.query(
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
    const cantidad_rifas_comprar = req.body.cantidad;
    const cliente_nombre = req.body.nombre;
    const cliente_apellido = req.body.apellido;
    const cliente_telefono = req.body.telefono;
    const cliente_email = req.body.email;
    const monto = req.body.valorTotal;
    const fecha = new Date();

    let errores = [];

    if (
      !cantidad_rifas_comprar ||
      !cliente_nombre ||
      !cliente_apellido ||
      !cliente_telefono ||
      !cliente_email ||
      !monto ||
      !fecha
    ) {
      errores.push({ mensaje: "Por favor llene todos los campos." });
    }

    if (errores.length > 0) {
      res.status(200).json({
        errores: errores,
      });
    } else {
      //obtener rifas disponibles
      const rifas_disponibles = await db.query(
        "SELECT rifa_id FROM rifa WHERE disponible = TRUE"
      );
      const cantidad_rifas_disponibles = rifas_disponibles.rows.length;

      let rifas_compradas = [];

      //registrar cliente
      const cliente_id_json = await db.query(
        "INSERT INTO cliente(nombre, apellido, email, telefono) VALUES ($1, $2, $3, $4) returning cliente_id;",
        [cliente_nombre, cliente_apellido, cliente_email, cliente_telefono]
      );
      const cliente_id = cliente_id_json.rows[0].cliente_id;

      //registrar compra
      const compra_id_json = await db.query(
        "INSERT INTO compra(monto, cantidad, fecha) VALUES($1, $2, $3) returning compra_id;",
        [monto, cantidad_rifas_comprar, fecha]
      );
      const compra_id = compra_id_json.rows[0].compra_id;

      //comprar rifas aleatorias
      for (let i = 0; i < cantidad_rifas_comprar; i++) {
        const numero_ramdon = Math.floor(
          Math.random() * cantidad_rifas_disponibles
        );

        const rifa_a_comprar = rifas_disponibles.rows[numero_ramdon].rifa_id;

        rifas_compradas.push(rifa_a_comprar);

        //sacar disponibilida de rifa
        await db.query(
          "UPDATE rifa SET disponible = false::boolean, cliente_id = $1, compra_id = $2 WHERE rifa_id = $3;",
          [cliente_id, compra_id, rifa_a_comprar]
        );
      }

      res.status(200).json({
        cantidad: cantidad_rifas_comprar,
        cliente_nombre: cliente_nombre,
        cliente_apellido: cliente_apellido,
        cliente_telefono: cliente_telefono,
        cliente_email: cliente_email,
        valorTotal: monto,
        rifas_compradas: rifas_compradas,
      });
    }
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = rifasCtrl;
