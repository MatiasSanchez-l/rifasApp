module.exports = function(req, res, next) {
    const { nombre_usuario, contrasenia, email } = req.body;

    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/usuarios/login") {
      if (![nombre_usuario, contrasenia].every(Boolean)) {
        return res.status(401).json("Falta completar campos.");
      }
    }

    if (!validEmail(email)) {
      return res.status(401).json("Email no es correcto.");
    }
  
    next();
  };