module.exports = function(req, res, next) {
    const { nombre_usuario, contrasenia, email } = req.body;

    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (!validEmail(email)) {
      return res.status(401).json("Email no es correcto.");
    }
  
    next();
  };