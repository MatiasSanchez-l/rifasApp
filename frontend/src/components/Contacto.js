import React, { Component } from 'react'
import emailjs from 'emailjs-com';
import swal from 'sweetalert';
import './Contacto.css';

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
            <div className="container">
                <div>
                    <h2 className="text-center mt-3">¿TEN&Eacute;S DUDAS?</h2>
                    <h3 className="text-center ">Cont&aacute;ctanos</h3>
                    <p>Si ten&eacute;s dudas o consultas, complet&aacute; este formulario y te responderemos a la brevedad.</p>
                    <form className="contact-form mt-3 formulario-datos" onSubmit={this.sendEmail}>
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
                                <label className="form-label">N&uacute;mero de tel&eacute;fono</label>
                                <input className="form-control" type="number" name="user_number" />
                            </div>
                        </div>
                        <div className="mt-1">
                            <label className="form-label">Mensaje o consulta</label>
                            <textarea className="form-control" name="message" />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-dark btn-outline-verde-contacto mt-4 text-white" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
                <hr className="mt-4 hr" />
                <div>
                    <h3 className="text-center mt-3">Tambi&eacute;n pod&eacute;s contactarnos a trav&eacute;s de:</h3>
                    <div className="row">
                        <div className="col-12 mt-2">
                            <i className="fas fa-phone-alt"></i> <span className="fw-bold text-uppercase mx-1">Tel&eacute;fono Fijo:</span> 4444-4444
                        </div>
                        <div className="col-12 mt-2">
                            <i className="fas fa-envelope"></i> <span className="fw-bold text-uppercase mx-1">Email:</span> email@email.com
                        </div>
                        <div className="col-12 mt-2">
                            <i className="fab fa-whatsapp"></i> <span className="fw-bold text-uppercase mx-1">Whatsapp:</span> 11-4444-4444
                        </div>
                        <div className="col-12 mt-2">
                            <i className="fab fa-facebook-f"></i> <span className="fw-bold text-uppercase mx-1">Facebook:</span> rifasapp
                        </div>
                        <div className="col-12 mt-2">
                            <i className="fab fa-instagram"></i> <span className="fw-bold text-uppercase mx-1">Instagram:</span> @rifasApp
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
