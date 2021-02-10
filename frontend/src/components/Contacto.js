import React, { Component } from 'react'
import swal from 'sweetalert';
import './css/Contacto.css';
import axios from 'axios';

export default class Contacto extends Component {
    state = {
        isWaiting: false,
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        consulta: ""

    }
    sendEmail = async e => {
        e.preventDefault();

        this.setState({
            isWaiting: true
        });

        const newConsulta = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            telefono: this.state.telefono,
            consulta: this.state.consulta
        }

        try {
            const res = await axios.post("http://localhost:5000/nodemailer/contacto", newConsulta);

            if (res.data.status === "success") {
                swal({
                    title: "Consulta realizada con exito",
                    text: "Le responderemos a la brevedad dejandole un mensaje en la casilla de su email",
                    icon: "success"
                })
                this.setState({
                    isWaiting: false
                });
                console.log("if de que salio todo bien");
                this.vaciarState();
                e.target.reset();
            }
            if (res.data.status === "errorCampos") {
                swal({
                    title: "Ocurrio un error al enviar su consulta!",
                    text: res.data.text,
                    icon: "error"
                })
                this.setState({
                    isWaiting: false
                });
                console.log("if de que salio todo mal")
                this.vaciarState();
                e.target.reset();
            }
        } catch (err) {
            swal({
                title: "Ocurrio un error al enviar su consulta!",
                text: "Por favor intente de nuevo",
                icon: "error"
            })
            this.setState({
                isWaiting: false
            });
            this.vaciarState();
            e.target.reset();
        }

        this.setState({
            isWaiting: false
        });
        this.vaciarState();
        e.target.reset();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    vaciarState = () => {
        this.setState({
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            consulta: ""
        })
    }
    render() {
        return (
            <div className="container mb-3">
                <div>
                    <h2 className="text-center mt-3">¿TEN&Eacute;S DUDAS?</h2>
                    <h3 className="text-center ">Cont&aacute;ctanos</h3>
                    <p>Si ten&eacute;s dudas o consultas, complet&aacute; este formulario y te responderemos a la brevedad.</p>
                    <form className="contact-form mt-3 formulario-datos" onSubmit={this.sendEmail}>
                        <div className="row  mt-1">
                            <div className="col-6">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" type="text" name="nombre" value={this.state.nombre} onChange={this.onChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Apellido</label>
                                <input className="form-control" type="text" name="apellido" value={this.state.apellido} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-6">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label">N&uacute;mero de tel&eacute;fono</label>
                                <input className="form-control" type="number" name="telefono" value={this.state.telefono} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="mt-1">
                            <label className="form-label">Mensaje o consulta</label>
                            <textarea className="form-control" name="consulta" value={this.state.consulta} onChange={this.onChange} />
                        </div>
                        <div className="text-center">
                            <button disabled={this.state.isWaiting} className="btn btn-dark btn-outline-verde-contacto mt-4 text-white" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
                <hr className="mt-4 hr" />
                <div>
                    <h3 className="text-center mt-3">Tambi&eacute;n pod&eacute;s contactarnos a trav&eacute;s de:</h3>
                    <div className="row">
                        <div className="col-12 mt-2">
                            <i className="fas fa-envelope"></i> <span className="fw-bold text-uppercase mx-1">Email:</span> juntosxoscar@gmail.com
                        </div>
                        <div className="col-12 mt-2">
                            <i className="fab fa-facebook-f"></i> <span className="fw-bold text-uppercase mx-1">Facebook:</span> JuntosxOscar
                        </div>
                        <div className="col-12 mt-2">
                            <i className="fab fa-instagram"></i> <span className="fw-bold text-uppercase mx-1">Instagram:</span> @juntosxoscar
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
