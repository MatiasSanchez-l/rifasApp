const nodemailer = require('nodemailer');
const nodemailerCtrl = {};

nodemailerCtrl.contacto = async (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const consulta = req.body.consulta;

    if (!nombre || !apellido || !email || !telefono || !consulta) {
        res.status(401).json({
            status: "errorCampos",
            text: "Por favor complete todos los campos para enviar la consulta"
        });
    } else {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "juntosxoscar@gmail.com",
                    pass: "xqjjnyzmmxlxmufe"
                },
            });
            try {
                await transporter.sendMail({
                    from: 'juntosxoscar@gmail.com', // sender address
                    to: 'juntosxoscar@gmail.com', // list of receivers
                    subject: "Bono Contribucion - Juntos x Oscar", // Subject line
                    html: '<!doctype html><html lang="es"><head>    <meta charset="utf-8">    <meta name="viewport" content="width=device-width, initial-scale=1">    <title>Hello, world!</title></head><body>    <header>       <h1>#JuntosxOscar</h1>    </header>    <main class="container mt-2">        <h3 class="text-center">Familia Fagliano tienen una nueva consulta</h3>        <hr class="hr">        <h4>Datos:</h4> <span><b>Nombre: </b> "' + req.body.nombre + '"</span><br> <span> <b>Apellido:            </b>"' + req.body.apellido + '"</span><br> <span><b>Email: </b>"' + req.body.email + '"</span><br> <span><b>Telefono:            </b>"' + req.body.telefono + '"</span><br> <span><b>Consulta: </b>"' + req.body.consulta + '"</span>    </main>    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js"        integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi"        crossorigin="anonymous"></script>    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"        integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"        crossorigin="anonymous"></script></body></html>'
                });
                res.status(200).json({
                    status: "success"
                });
            } catch (err) {
                res.status(401).json({
                    status: "error"
                });
            }
        } catch (e) {
            console.error(e.message);
            throw e;
        }
    }
};

module.exports = nodemailerCtrl;