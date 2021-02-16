const db = require("../db/index");
const mercadopago = require("mercadopago");
const nodemailer = require('nodemailer');
const rifasCtrl = {};

rifasCtrl.obtener_rifas = async (req, res) => {
  try {
    const resultado = await db.query(
      "SELECT rifa_id AS numero_rifa, disponible, nombre AS cliente_nombre, apellido AS cliente_apellido, email AS cliente_email, telefono AS cliente_telefono, r.compra_id, c.estado, c.fecha FROM rifa r LEFT JOIN cliente cl ON cl.cliente_id = r.cliente_id LEFT JOIN compra c ON c.compra_id = r.compra_id;"
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
    throw e;
  }
};

rifasCtrl.obtener_rifa_random = async (req, res) => {
  try {
    const estado = 'aprobado';
    const rifas_compradas = await db.query(
      "SELECT r.rifa_id, cli.nombre, cli.apellido, cli.email, cli.telefono FROM rifa r JOIN compra c ON c.compra_id = r.compra_id JOIN cliente cli ON cli.cliente_id = r.cliente_id WHERE r.disponible = FALSE AND c.estado=$1;",
      [estado]
    );
    const cantidad_rifas = rifas_compradas.rows.length;

    //rifa aleatorias
    const numero_ramdon = Math.floor(Math.random() * cantidad_rifas);

    const rifa = rifas_compradas.rows[numero_ramdon].rifa_id;
    const nombre = rifas_compradas.rows[numero_ramdon].nombre;
    const apellido = rifas_compradas.rows[numero_ramdon].apellido;
    const email = rifas_compradas.rows[numero_ramdon].email;
    const telefono = rifas_compradas.rows[numero_ramdon].telefono;

    res.status(200).json({
      data: {
        rifa: rifa,
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono
      },
    });
  } catch (e) {
    console.error(e.message);
    throw e;
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
    throw e;
  }
};

rifasCtrl.obtener_total = async (req, res) => {
  try {
    const estado = 'aprobado';
    const resultado = await db.query(
      "SELECT SUM(monto) as total FROM compra WHERE estado = $1;",
      [estado]
    );

    res.status(200).json({
      status: "success",
      data: {
        monto: resultado.rows,
      },
    });
  } catch (e) {
    console.error(e.message);
    throw e;
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
    throw e;
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
      if (cantidad_rifas_disponibles >= cantidad_rifas_comprar) {
        try {
          //registrar compra
          const compra_id_json = await db.query(
            "INSERT INTO compra(monto, cantidad, estado, fecha) VALUES($1, $2, $3, $4) returning compra_id;",
            [monto, cantidad_rifas_comprar, estado, fecha]
          );
          const compra_id = compra_id_json.rows[0].compra_id;

          //creacion de array numeros random 
          let numeros_random = [];

          //comprar rifas aleatorias
          for (let i = 0; i < cantidad_rifas_comprar; i++) {
            let numero_ramdon = Math.floor(
              Math.random() * cantidad_rifas_disponibles
            );

            while (numeros_random.includes(numero_ramdon)) {
              numero_ramdon = Math.floor(
                Math.random() * cantidad_rifas_disponibles
              );
              console.log(numero_ramdon)
            }
            numeros_random.push(numero_ramdon);

            const rifa_a_comprar =
              rifas_disponibles.rows[numero_ramdon].rifa_id;

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
            back_urls: {
              success: "https://juntosxoscar.com.ar/comprarBono/",
              failure: "https://juntosxoscar.com.ar/comprarBono/"
            },
            auto_return: "approved",
            external_reference: compra_id.toString(),
            /*notification_url:
              "https://www.juntosxoscar.com.ar/rifas/notificaciones",*/
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
        } catch (err) {
          await db.query("ROLLBACK");
          console.error(err.message);
        }
      } else {
        return res
          .status(200)
          .json({
            errores: [
              {
                mensaje:
                  "No hay disponible esa cantidad de rifas. Solo quedan: " +
                  cantidad_rifas_disponibles +
                  ".",
              },
            ],
          });
      }
    }
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

rifasCtrl.notificacion = async (req, res) => {
  try {
    const { body } = req;
    const { data } = body;

    const pago = await mercadopago.payment.get(data.id);

    await db.query("BEGIN");
    const compra_id = pago.response.external_reference;

    if (pago.response.status === "approved") {
      const cliente_nombre = pago.response.payer.first_name;
      const cliente_apellido = pago.response.payer.last_name;
      const cliente_telefono = pago.response.payer.phone.number;
      const cliente_email = pago.response.payer.email;
      const fecha = new Date();
      const estado = "aprobado";

      //registrar cliente
      const cliente_id_json = await db.query(
        "INSERT INTO cliente(nombre, apellido, email, telefono) VALUES ($1, $2, $3, $4) returning cliente_id;",
        [cliente_nombre, cliente_apellido, cliente_email, cliente_telefono]
      );
      const cliente_id = cliente_id_json.rows[0].cliente_id;

      //actualizar estado compra
      await db.query("UPDATE compra SET estado = $1 WHERE compra_id = $2;", [
        estado,
        compra_id,
      ]);

      //actualizar cliente de rifa
      await db.query("UPDATE rifa SET cliente_id = $1 WHERE compra_id = $2;", [
        cliente_id,
        compra_id,
      ]);
      const resultado = await db.query(
        "select rifa_id, nombre, apellido, email FROM rifa r JOIN cliente c ON c.cliente_id = r.cliente_id WHERE compra_id = $1;",
        [compra_id]
      );
      const rifas_compradas = [];

      for (let i = 0; i < resultado.rows.length; i++) {
        rifas_compradas.push(resultado.rows[i].rifa_id);
      }
      await db.query("COMMIT");
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "juntosxoscar@gmail.com",
            pass: "xqjjnyzmmxlxmufe"
          },
        });
        await transporter.sendMail({
          from: "<juntosxoscar@gmail.com>", // sender address
          to: "santifagliano@live.com.ar", // list of receivers
          subject: "Bono Contribucion - Juntos x Oscar", // Subject line
          html: "<div>  <p>Gracias por su contribucion!</p> <hr>  <p>" + cliente_nombre + " " + cliente_apellido + "</p> <p>Los numeros que le tocaron fueron: </p> <b>" + rifas_compradas.map(rifa => " " + rifa) + "</b> <br> <hr> <p>Buena Suerte y gracias por su colaboracion!</p></div>", // plain text body
        });
        console.log("mandamos email")
        res.sendStatus(200)
      } catch (e) {
        console.error(e.message);
      }
    } else {
      //volver a poner las rifas en disponibles
      const estado = "denegado";

      await db.query(
        "UPDATE rifa SET disponible = true::boolean, compra_id = null WHERE compra_id = $1;",
        [compra_id]
      );

      //actualizar estado compra
      await db.query("UPDATE compra SET estado = $1 WHERE compra_id = $2;", [
        estado,
        compra_id,
      ]);

      await db.query("COMMIT");
    }
  } catch (e) {
    await db.query("ROLLBACK");
    console.error(e.message);
    res.status(500).send(e);
  }
};

rifasCtrl.obtener_rifas_compra = async (req, res) => {
  try {
    const compra_id = req.params.external_reference;

    const resultado = await db.query(
      "select rifa_id, nombre, apellido, email FROM rifa r JOIN cliente c ON c.cliente_id = r.cliente_id WHERE compra_id = $1;",
      [compra_id]
    );
    const rifas_compradas = [];

    for (let i = 0; i < resultado.rows.length; i++) {
      rifas_compradas.push(resultado.rows[i].rifa_id);
    }

    res.status(200).json({
      rifas_compradas: rifas_compradas,
      email: resultado.rows[0].email,
      nombre: resultado.rows[0].nombre,
      apellido: resultado.rows[0].apellido
    });
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

module.exports = rifasCtrl;
