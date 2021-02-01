require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();


//middlewares
app.use(express.json());
app.use(cors());



//rutas
//app.use(require('./routes/index'));
app.use("/rifas", require("./routes/rifas"));
app.use("/usuarios", require("./routes/usuarios"));

puerto = process.env.PORT || 5005;
app.listen(puerto, () => {
  console.log(`Escuchando el puerto ${puerto}`);
});
