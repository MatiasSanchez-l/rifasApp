const path = require('path');
console.log(path.join(__dirname, "../.env"));
require("dotenv").config({ path: path.join(__dirname, "../.env") });
console.log(process.env.ACCESS_TOKEN)
const express = require("express");
const cors = require("cors");
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const app = express();

//middlewares
app.use('/matisanti', express.static(path.join(__dirname, '../../frontend/build')));
app.use('/contactomatisanti', express.static(path.join(__dirname, '../../frontend/build')));
app.use('/comprarBonomatisanti', express.static(path.join(__dirname, '../../frontend/build')));
app.use('/loginmatisanti', express.static(path.join(__dirname, '../../frontend/build')));
app.use('/dashboardmatisanti', express.static(path.join(__dirname, '../../frontend/build')));
app.use('/premiosmatisanti', express.static(path.join(__dirname, '../../frontend/build')));

app.use(express.json());
app.use(cors());

// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

//rutas
app.use("/rifas", require("./routes/rifas"));
app.use("/usuarios", require("./routes/usuarios"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/nodemailer", require("./routes/nodemailer"));
app.use((err, req, res) => {
  //console.log(err)
  //res.sendStatus(500);
});

puerto = process.env.PORT || 5005;
app.listen(puerto, () => {
  console.log(`Escuchando el puerto ${puerto}`);
});