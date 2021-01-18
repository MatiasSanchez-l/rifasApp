require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
//const session= require("express-session");
//const flash = require("express-flash");

//middlewares
app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));
/*app.use(session ({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false
}))*/
//app.use(flash());


//rutas
//app.use(require('./routes/index'));
app.use("/rifas", require("./routes/rifas"));
app.use("/usuarios", require("./routes/usuarios"));

puerto = process.env.PORT || 5005;
app.listen(puerto, () => {
  console.log(`Escuchando el puerto ${puerto}`);
});
