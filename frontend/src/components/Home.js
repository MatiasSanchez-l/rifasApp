import React, { Component } from 'react';
import './css/home.css';
import { Link } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import regaloVerde from './helper/cajaVerde.png';
import axios from 'axios';

const marks = [
    {
        value: 0,
        label: '0%'
    },
    {
        value: 200000,
        label: '50%'
    },
    {
        value: 400000,
        label: '100%'
    }
]

export default class Home extends Component {
    state = {
        recaudado: ""
    }
    irAlInstagram = () => {
        let win = window.open("https://www.instagram.com/juntosxoscar/", '_blank');
        win.focus();
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/rifas/total');
        let cantidad = (res.data.data.monto[0].total * 100) / 1000000;
        this.setState({ recaudado: cantidad });
    }

    render() {
        return (
            <div className="container mt-3 mb-3">
                <h2 className="text-center">BONO CONTRIBUCI&Oacute;N</h2>
                <div className="text-center my-4">
                    <hr className="hr" />
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Nuestra Historia</h3>
                        <div className="texto_inicio">
                            <p>
                                -“Che, Cabezón, tenemos que pensar en hacerte un cuarto abajo…
                            </p>
                            <p>
                                - No sé… Vemos…. Cualquier cosa cuando no pueda subir y bajar más, me quedo arriba y listo
                            </p>
                            <p>
                                - Cabezón! ¿Vos sos b…?
                            </p>
                            <p>
                                El cabezón es Oscar Fagliano, un hombre de 55 años que el 11 de septiembre de 2020 fue diagnosticado con ELA (Esclerosis Lateral Amiotrófica). Un balde de agua fría que le anticipó que sus músculos se iban a ir perdiendo, y con ellos, todas sus posibilidades de moverse y valerse por sí mismo.
                            </p>
                            <p>
                                El diálogo con el que empieza este texto lo tuvo Oscar con sus amigos de la infancia, los del Fiat 600. Ellos arrancaron esta idea que hoy es una necesidad concreta. Vivimos en un dúplex, nuestro cuarto está arriba y la escalera es cada vez más imposible. Queremos hacer una habitación abajo. Somos gente de trabajo y no nos sobra nada. Por eso nos atrevemos a pedir ayuda.
                            </p>
                            <p>
                                La ELA cambió la vida de Oscar y también la de toda la familia, los amigos y las comunidades a las que pertenecemos. Armamos entre todos una red de amor que sostiene y contiene, y ayuda a encontrar alegría y esperanza, incluso en estos momentos.
                            </p>
                            <p>
                                Tenemos una profunda fe en Dios. Oscar más que nadie. Sabemos que estamos en sus manos, y que no nos va a dejar solos. Por eso, estamos convencidos que Dios obrará a través de cada uno de ustedes ayudando a cumplir esta necesidad.
                            </p>
                            <p>
                                Creemos que tenemos que defender la alegría porque la vida de Oscar, hijo, hermano, esposo, padre, tío, sobrino, amigo, merece ser celebrada y bendecida. Y porque “delante nunca está la muerte. Delante siempre está la vida”
                            </p>
                        </div>

                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Proyecto</h3>
                        <iframe
                            title="video papa"
                            width="100%" height="315"
                            src="https://www.youtube.com/embed/UwRIsl4G72c"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="videoHome"></iframe>
                        <div className="d-flex justify-content-between p-2">
                            <Slider
                                valueLabelDisplay="off"
                                value={this.state.recaudado}
                                min={0}
                                max={400000}
                                marks={marks}
                            />
                            <i className="p-1 fas fa-home"></i>
                        </div>
                        <div className="d-flex justify-content-center fs-5">
                            <p className="p-1 m-auto text-center">Para poder acompañarnos durante el proceso del proyecto seguinos en
                                <span
                                    className="pointer p-1 instagram-home"
                                    onClick={this.irAlInstagram}> <i className="fab fa-instagram "></i> @juntosxoscar
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="fondo-home1" >
                    <h5 className="text-center">Premios a sortear</h5>
                    <div className="row p-2">
                    </div>
                    <div className="row justify-content-center p-2">
                        <div className="col-12 col-md-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">1° premio</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">2° premio</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">3° premio</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">4° premio</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-dark btn-outline-verde-home" to="/premios">Ver premios</Link>
                    </div>
                </div>
                <hr />
                <div>
                    <h3 className="text-center">¿C&oacute;mo funciona el sorteo?</h3>
                    <div className="p-5 text-center">
                        CADA RIFA COMPRADA TIENE UN NÚMERO ÚNICO
                        E IRREPETIBLE, TODOS LOS NÚMEROS SERAN
                        SORTEADOS EL DIA __________ . HABRA TRES
                        FUTUROS GANADORES, QUE SERÁN CONTACTADOS
                        PARA OBTENER SU PREMIO.
                    </div>
                </div>
                <div className="p-2 text-end ">
                    <Link className="login-home" to="/login">Login</Link>
                </div>
            </div>
        )
    }
}
/*

                        <div className="col-4">
                            <div className="row premio">
                                <div>s</div>
                            </div>
                            <p className="text-center">1° premio</p>
                        </div>
                        <div className="col-4">
                            <div className="row premio">
                                <div>s</div>
                            </div>
                            <p className="text-center">2° premio</p>
                        </div>
                        <div className="col-4">
                            <div className="row premio">
                                <div>s</div>
                            </div>
                            <p className="text-center">3° premio</p>
                        </div>
*/
