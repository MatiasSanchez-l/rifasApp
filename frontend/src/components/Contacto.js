import React, { Component } from 'react'
import emailjs from 'emailjs-com';
import swal from 'sweetalert'

export default class Contacto extends Component {
    sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_myznhyg', 'template_0ox8qt3', e.target, 'user_BZzmPmLVZ1sJ2alDio8vi')
            .then((result) => {
                console.log(result.text);
                swal({
                    title: "Consulta realizada con exito",
                    text: "Este es el texto",
                    icon: "success"

                })
            }, (error) => {
                swal({
                    title: error,
                    text: "Ocurrio un error en el envio del email, por favor intente de nuevo.",
                    icon: "error"

                })
            });
        e.target.reset();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

    };


    render() {
        return (
            <div>
                <div className="container">
                    <h3 className="text-center mt-3">Cont&aacute;ctanos</h3>
                    <p>Ante cualquier duda o consulta que nos quieras realizar podes completar el siguiente formulario y se lo resolveremos lo antes posible</p>
                    <form className="contact-form mt-3 " onSubmit={this.sendEmail}>
                        <div className="row  mt-1">
                            <div className="col-6">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" type="text" name="user_name" />

                            </div>
                            <div className="col-6">
                                <label className="form-label">Apellido</label>
                                <input className="form-control" type="text" name="user_lastname" />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-6">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="email" name="user_email" />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Numero de telefono</label>
                                <input className="form-control" type="number" name="user_number" />
                            </div>
                        </div>
                        <div className="mt-1">
                            <label className="form-label">Mensaje o consulta</label>
                            <textarea className="form-control" name="message" />
                        </div>
                        <input className="form-control mt-5 bg-dark text-white" type="submit" value="Enviar" />
                    </form>
                </div>
                <div className="container">
                    <h3 className="text-center mt-3">Otros medios para contactarnos</h3>
                    <ul class="list-group list-group-flush lista-contacto">
                        <li class="list-group-item"> <i class="fas fa-phone-alt"></i> <span className="fw-bold ">Telefono Fijo:</span> 4444-4444</li>
                        <li class="list-group-item"> <i class="fas fa-envelope"></i> <span className="fw-bold ">Email:</span> email@email.com</li>
                        <li class="list-group-item"> <i class="fab fa-whatsapp"></i> <span className="fw-bold ">Whatsapp:</span> 11-4444-4444</li>
                        <li class="list-group-item"> <i class="fab fa-facebook-f"></i> <span className="fw-bold ">Facebook:</span> rifasapp</li>
                        <li class="list-group-item"> <i class="fab fa-instagram"></i> <span className="fw-bold ">Instagram:</span> @rifasApp</li>
                    </ul>

                </div>

            </div>
        )
    }
}
