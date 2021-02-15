module.exports = function(req, res, next) {
    const { telefono, email } = req.body;

    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (!validEmail(email)) {
      return res.status(200).json({error: "Email no es correcto."});
    }

    if(isNaN(telefono)){
      return res.status(401).json("Numero de telefono no es correcto.");
    }
  
    next();
  };