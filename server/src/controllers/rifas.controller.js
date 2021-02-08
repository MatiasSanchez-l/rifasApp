const db = require("../db/index");
const rifasCtrl = {};

rifasCtrl.obtener_rifas = async (req, res) => {
  try {
    const resultado = await db.query(
      "select rifa_id as numero_rifa, disponible, nombre as cliente_nombre, apellido as cliente_apellido, email as cliente_email, telefono as cliente_telefono, compra_id from rifa r left join cliente cl on cl.cliente_id = r.cliente_id;"
    );
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
    await db.query("BEGIN");
    const cantidad_rifas = req.params.cantidad;
    if (isNaN(cantidad_rifas) || cantidad_rifas <= 0) {
      res.status(401).json("Debe completar la cantidad de rifas a crear.");
    } else {
      let resultado = "";

      for (let i = 0; i < cantidad_rifas; i++) {
        resultado = await db.query(
          "INSERT INTO rifa(disponible) VALUES(TRUE) RETURNING *"
        );
      }

      await db.query("COMMIT");

      res.status(200).json({
        status: "success",
        resultado: resultado.rows.length,
        data: {
          rifas: resultado.rows,
        },
      });
    }
  } catch (e) {
    await db.query("ROLLBACK");
    console.error(e.message);
  }
};

rifasCtrl.obtener_total = async (req, res) => {
  try {
    const resultado = await db.query("SELECT SUM(monto) as total FROM compra;");

    res.status(200).json({
      status: "success",
      data: {
        monto: resultado.rows,
      },
    });
  } catch (e) {
    console.error(e.message);
  }
};

rifasCtrl.comprar_rifas = async (req, res) => {
  try {
    // cantidad de rifas a comprar
    const precio_rifa = 200;
    const cantidad_rifas_comprar = req.body.cantidad;
    const monto = cantidad_rifas_comprar * precio_rifa;
    const cliente_nombre = req.body.nombre;
    const cliente_apellido = req.body.apellido;
    const cliente_telefono = req.body.telefono;
    const cliente_email = req.body.email;
    const fecha = new Date();
    const estado = "pago";

    let errores = [];

    if (
      !cantidad_rifas_comprar ||
      !cliente_nombre ||
      !cliente_apellido ||
      !cliente_telefono ||
      !cliente_email ||
      !fecha
    ) {
      errores.push({ mensaje: "Por favor llene todos los campos." });
    }

    if (errores.length > 0) {
      res.status(200).json({
        errores: errores,
      });
    } else {
      await db.query("BEGIN");

      //obtener rifas disponibles
      const rifas_disponibles = await db.query(
        "SELECT rifa_id FROM rifa WHERE disponible = TRUE;"
      );
      const cantidad_rifas_disponibles = rifas_disponibles.rows.length;
      
      //verificar que la cantidad de rifas a comprar sea menor a la cantidad de rifas disponibles
      if (cantidad_rifas_disponibles > cantidad_rifas_comprar) {
        let rifas_compradas = [];

        //registrar cliente
        const cliente_id_json = await db.query(
          "INSERT INTO cliente(nombre, apellido, email, telefono) VALUES ($1, $2, $3, $4) returning cliente_id;",
          [cliente_nombre, cliente_apellido, cliente_email, cliente_telefono]
        );
        const cliente_id = cliente_id_json.rows[0].cliente_id;

        //registrar compra
        const compra_id_json = await db.query(
          "INSERT INTO compra(monto, cantidad, estado, fecha) VALUES($1, $2, $3, $4) returning compra_id;",
          [monto, cantidad_rifas_comprar, estado, fecha]
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

        await db.query("COMMIT");

        res.status(200).json({
          cantidad: cantidad_rifas_comprar,
          valorTotal: monto,
          rifas_compradas: rifas_compradas,
        });
      }else{
        return res.status(401).json("No hay disponible esa cantidad de rifas. Solo quedan: " + cantidad_rifas_disponibles + ".");
      }
    }
  } catch (e) {
    await db.query("ROLLBACK");
    console.error(e.message);
  }
};

module.exports = rifasCtrl;
