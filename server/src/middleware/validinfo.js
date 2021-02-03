module.exports = function(req, res, next) {
    const { nombre_usuario, contrasenia } = req.body;
  
    if (req.path === "/usuarios/login") {
      if (![nombre_usuario, contrasenia].every(Boolean)) {
        return res.json("Missing Credentials");
      }
    }
  
    next();
  };