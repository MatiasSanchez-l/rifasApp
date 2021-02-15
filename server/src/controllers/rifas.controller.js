const db = require("../db/index");
const mercadopago = require("mercadopago");
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

rifasCtrl.obtener_rifa_random = async (req, res) => {
  try {
    const rifas_compradas = await db.query(
      "SELECT rifa_id FROM rifa WHERE disponible = FALSE;"
    );
    const cantidad_rifas = rifas_compradas.rows.length;

    //rifa aleatorias
    const numero_ramdon = Math.floor(
      Math.random() * cantidad_rifas
    );

    const rifa = rifas_compradas.rows[numero_ramdon].rifa_id;

    res.status(200).json({
      data: {
        rifa: rifa,
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
    const estado = 'aprobado';
    const resultado = await db.query("SELECT SUM(monto) as total FROM compra WHERE estado = $1;",
      [estado]);

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
      } else {
        return res
          .status(401)
          .json(
            "No hay disponible esa cantidad de rifas. Solo quedan: " +
            cantidad_rifas_disponibles +
            "."
          );
      }
    }
  } catch (e) {
    await db.query("ROLLBACK");
    console.error(e.message);
  }
};

rifasCtrl.comprar_rifas_mp = async (req, res) => {
  try {
    // cantidad de rifas a comprar
    const precio_rifa = 200;
    const cantidad_rifas_comprar = req.body.cantidad;
    const monto = cantidad_rifas_comprar * precio_rifa;
    const cliente_nombre = req.body.nombre;
    const cliente_apellido = req.body.apellido;
    const cliente_telefono = req.body.telefono;
    const cliente_email = req.body.email;

    let errores = [];

    if (
      !cantidad_rifas_comprar ||
      !cliente_nombre ||
      !cliente_apellido ||
      !cliente_telefono ||
      !cliente_email
    ) {
      errores.push({ mensaje: "Por favor llene todos los campos." });
    }

    if (errores.length > 0) {
      res.status(200).json({
        errores: errores,
      });
    } else {
      const fecha = new Date();
      const estado = "pendiente";

      await db.query("BEGIN");

      //obtener rifas disponibles
      const rifas_disponibles = await db.query(
        "SELECT rifa_id FROM rifa WHERE disponible = TRUE;"
      );
      const cantidad_rifas_disponibles = rifas_disponibles.rows.length;

      //verificar que la cantidad de rifas a comprar sea menor a la cantidad de rifas disponibles
      if (cantidad_rifas_disponibles > cantidad_rifas_comprar) {

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


          //sacar disponibilida de rifa
          await db.query(
            "UPDATE rifa SET disponible = false::boolean, compra_id = $1 WHERE rifa_id = $2;",
            [compra_id, rifa_a_comprar]
          );
        }

        // Crea un objeto de preferencia
        let preference = {
          items: [
            {
              title: "JuntosXOscar - Bono contribucion",
              currency_id: "ARS",
              description: "rifa",
              quantity: cantidad_rifas_comprar,
              unit_price: precio_rifa,
            },
          ],
          payer: {
            name: cliente_nombre,
            surname: cliente_apellido,
            email: cliente_email,
            phone: {
              number: parseInt(cliente_telefono),
            },
          },
          payment_methods: {
            excluded_payment_types: [
              {
                id: "ticket",
              },
              {
                id: "atm",
              },
            ],
          },
          external_reference: toString(compra_id),
          notification_url: "http://juntosxoscar.com.ar/rifas/notificaciones",
          expires: true,
          binary_mode: true,
        };

        await db.query("COMMIT");

        mercadopago.preferences
          .create(preference)
          .then(function (response) {
            res.send({
              data: {
                preference_id: response.body.id,
                init_point: response.body.init_point,
              },
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        return res
          .status(401)
          .json(
            "No hay disponible esa cantidad de rifas. Solo quedan: " +
            cantidad_rifas_disponibles +
            "."
          );
      }
    }
  } catch (e) {
    await db.query("ROLLBACK");
    console.error(e.message);
  }
};

/*necesito saber como guardar las rifas que se sacaron su disponibilidad para cuando me llegue la notificacion 
devolverle la disponibilidad en caso de que ocurrio un error en el pago o registrar la compra en caso de que se aprovo el pago*/

rifasCtrl.notificacion = async (req, res) => {
  try {
    const { body } = req;
    const { data } = body;

    console.log("body", body);

    const pago = await mercadopago.payment.get(data.id);
    console.log("pago ", pago);

    await db.query("BEGIN");
    const compra_id = pago.external_reference;
    const rifas_compradas = await db.query(
      "SELECT rifa_id FROM rifa WHERE compra_id = $1;",
      [compra_id]
    );

    if (pago.status == "approved") {
      const cliente_nombre = pago.payer.first_name;
      const cliente_apellido = pago.payer.last_name;
      const cliente_telefono = pago.payer.phone.number;
      const cliente_email = pago.payer.email;
      const fecha = new Date();
      const estado = "aprobado";
      const cantidad_rifas_comprar = pago.aditional_info.quantity;
      const precio = pago.aditional_info.unit_price;
      const monto = cantidad_rifas_comprar * precio;

      //registrar cliente
      const cliente_id_json = await db.query(
        "INSERT INTO cliente(nombre, apellido, email, telefono) VALUES ($1, $2, $3, $4) returning cliente_id;",
        [cliente_nombre, cliente_apellido, cliente_email, cliente_telefono]
      );
      const cliente_id = cliente_id_json.rows[0].cliente_id;

      //actualizar estado compra
      await db.query(
        "UPDATE compra SET estado = $1 WHERE compra_id = $2;",
        [estado, compra_id]
      );

      //actualizar cliente de rifa
      await db.query(
        "UPDATE rifa SET cliente_id = $1 WHERE compra_id = $2;",
        [cliente_id, compra_id]
      );

      await db.query("COMMIT");
    } else {
      //volver a poner las rifas en disponibles
      const estado = "denegado";

      await db.query(
        "UPDATE rifa SET disponible = true::boolean, compra_id = $1 WHERE compra_id = $2;",
        [NULL, compra_id]
      );

      //actualizar estado compra
      await db.query(
        "UPDATE compra SET estado = $1 WHERE compra_id = $2;",
        [estado, compra_id]
      );

      await db.query("COMMIT");
    }
  } catch (e) {
    await db.query("ROLLBACK");
    console.error(e.message);
  }
};

module.exports = rifasCtrl;
