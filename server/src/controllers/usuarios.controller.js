const { Pool } = require("pg");
const db = require("../db/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const usuariosCtrl = {};

usuariosCtrl.loguear_usuario = async (req, res) => {
  try {
    //1. destructure the req.body
    const { nombre_usuario, contrasenia } = req.body;

    if (![nombre_usuario, contrasenia].every(Boolean)) {
      return res.json("Completar todos lo campos.");
    }

    //2. check if user doesn't exist(If not then we throw error)
    const user = await db.query(
      'SELECT * FROM "usuario" WHERE nombre_usuario = $1',
      [nombre_usuario]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Contrasenia o nombre de usuario incorrecto");
    }

    //3. check if incoming password is the same the database password

    /*try{
        const saltRound  = 10;
        const salt = await bcrypt.genSalt(saltRound);
        console.log("encriptada es: " + await bcrypt.hash(contrasenia, salt));
    }catch (e) {
        console.error(e.message);
      }*/

    const validPassword = await bcrypt.compare(
      contrasenia,
      user.rows[0].contrasenia
    );

    if (!validPassword) {
      return res.status(401).json("Contrasenia o nombre de usuario incorrecto");
    }

    //4. give them jwt token

    const token = jwtGenerator(user.rows[0].usuario_id);

    res.status(200).json({ token });
  } catch (e) {
    console.error(e.message);
  }
};

usuariosCtrl.verificado = async (req, res) => {
  try {
    res.json(true);
  } catch (e) {
    console.error(e.message);
  }

};

module.exports = usuariosCtrl;