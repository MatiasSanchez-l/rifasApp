module.exports = function (req, res, next) {
  const { telefono, email } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (!validEmail(email)) {
    return res.status(200).json({ errores: [{ mensaje: "Email no es correcto." }] });
  }

  if (isNaN(telefono) || telefono.toString().length > 10 || telefono.toString().length < 8) {
    return res.status(200).json({ errores: [{ mensaje: "Numero de telefono no es correcto." }] });
  }

  next();
};