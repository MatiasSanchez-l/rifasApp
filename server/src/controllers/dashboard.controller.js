const { Pool } = require("pg");
const db = require("../db/index");
const dashboardCtrl = {};

dashboardCtrl.algo = async (req, res) => {
    try {
        const user = await db.query(
            "SELECT nombre_usuario FROM usuario where usuario_id = $1",
            [req.user]
          );

          res.json(user.rows[0]);
      
          res.status(200).json({
            status: "success",
            data: {
              usuario: user.rows[0],
            },
          });
    } catch (e) {
        console.error(e.message);
        res.status(500).send(e);
      }
  };

module.exports = dashboardCtrl;