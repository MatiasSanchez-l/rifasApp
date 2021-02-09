require("dotenv").config();
const express = require("express");
const cors = require("cors");
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const app = express();

//middlewares
app.use('/', express.static('../frontend/build'));
app.use(express.json());
app.use(cors());

// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

//rutas
app.use("/rifas", require("./routes/rifas"));
app.use("/usuarios", require("./routes/usuarios"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/nodemailer", require("./routes/nodemailer"));

puerto = process.env.PORT || 5005;
app.listen(puerto, () => {
  console.log(`Escuchando el puerto ${puerto}`);
});