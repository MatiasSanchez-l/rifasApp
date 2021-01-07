require("dotenv").config();
const express = require("express");
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//rutas
app.use(require('./routes/index'));

puerto = process.env.PORT || 5005;
app.listen(puerto, () => {
  console.log(`Escuchando el puerto ${puerto}`);
});
