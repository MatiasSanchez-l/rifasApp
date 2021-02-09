const nodemailer = require('nodemailer');
const nodemailerCtrl = {};

nodemailerCtrl.rifas = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "fagliano.santi@gmail.com",
                pass: "cmqycuzfxxoijyfu"
            },
        });
        await transporter.sendMail({
            from: "<juntosxoscar@gmail.com>", // sender address
            to: "" + req.body.email + "", // list of receivers
            subject: "Bono Contribucion - Juntos x Oscar", // Subject line
            html: "<div>  <p>Gracias por su contribucion!</p> <br> <p>Los numeros que le tocaron fueron: </p> <b>" + req.body.rifas.map(rifa => " " + rifa) + "</b> <br> <p>Buena Suerte y gracias por su colaboracion!</p></div>", // plain text body
        });

    } catch (e) {
        console.error(e.message);
    }
};


nodemailerCtrl.contacto = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "fagliano.santi@gmail.com",
                pass: "cmqycuzfxxoijyfu"
            },
        });
        try {
            await transporter.sendMail({
                from: 'juntosxoscar@gmail.com', // sender address
                to: 'juntosxoscar@gmail.com', // list of receivers
                subject: "Bono Contribucion - Juntos x Oscar", // Subject line
                html: "<div> <h3>Nueva Consulta!</h3> <p>Nombre: " + req.body.nombre + "</p> <p>Apellido: " + req.body.apellido + "</p>  <p>Email: " + req.body.email + "</p> <p>Telefono: " + req.body.telefono + "</p> <p>Consulta : " + req.body.consulta + "</p> </div>", // plain text body
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
    }
};

module.exports = nodemailerCtrl;