import React, { Component } from 'react';
import './css/Premios.css';
import premio3 from './helper/premio3.jpeg';

export default class Premios extends Component {
    componentDidMount(){
        let urlElements = window.location.href.split('/')
        console.log(urlElements)
        document.getElementById('tercero').scrollIntoView()
    }
    render() {
        return (
            <div className="mt-3 premios">
                <h2 className="text-center fw-bold">PREMIOS</h2>
                <div className="row">
                    <div className="col-6 text-center">
                        <img
                            className="img-fluid img-thumbnail"
                            src="https://http2.mlstatic.com/tostadora-electrica-kanjihome-kjh-tm900sec01-900w-plateada-D_NQ_NP_600821-MLA43694173299_102020-F.webp%202x"
                            alt="Premio tostadora" />
                        <p className="text-center mt-3" >1° Premio</p>
                    </div>
                    <div className="col-6" id="primero">
                        <h5>Tostadora Electrica Kanjihome.</h5>
                        <p>Tostadora Electrica Kanjihome Kjh-tm900sec01 900w Plata</p>
                        <p>
                            Producto: Tostadora Eléctrica <br />
                        Marca: Kanji<br />
                        Modelo: KJH-TM900SEC01<br />
                        Color: Plateado
                        </p>
                        <p>• CARACTERÍSTICAS •</p>
                        <ul>
                            <li> 2 rodajas de pan</li>
                            <li> Potencia: 900W</li>
                            <li> Regulador de tiempo</li>
                            <li>Bandeja recolectora de migas.</li>
                        </ul>

                    </div>
                </div>
                <hr className="hr my-3" />

                <div className="row">
                    <div className="col-6" id="segundo">
                        <h5>Pava Eléctrica Kanji.</h5>
                        <p>La pava eléctrica Kanji de acero inoxidable posee una de capacidad de 1,8 lts y viene con corte automático de temperatura, indicador luminoso de encendido. Su estilo clásico la hace ideal para todo tipo de bebidas.</p>

                        <p>
                            Producto: Pava Eléctrica <br />
                        Marca: Kanji<br />
                        Modelo: KJH-PE0159S<br />
                        Color: Rojo
                        </p>
                        <p>• CARACTERÍSTICAS •</p>
                        <ul>
                            <li>Capacidad: 1.8 Litros</li>
                            <li>Potencia 1500W</li>
                            <li>Base giratoria 360º</li>
                            <li>Acero inoxidable</li>
                            <li>Apagado automático</li>
                            <li>Luz indicadora</li>
                        </ul>

                    </div>
                    <div className="col-6 text-center">
                        <img
                            className="img-fluid img-thumbnail"
                            src="https://http2.mlstatic.com/pava-electrica-kanji-2-lts-1500w-ccorte-mate-castelar-D_NQ_NP_630835-MLA44174088004_112020-F.webp"
                            alt="Premio tostadora" />
                        <p className="text-center mt-3">2° Premio</p>
                    </div>
                </div>
                <hr className="hr my-3" />
                <div className="row">
                    <div className="col-6 text-center">
                        <img
                            className="img-fluid img-thumbnail"
                            src={premio3}
                            alt="Premio tostadora" />
                        <p className="text-center mt-3">3° Premio</p>
                    </div>
                    <div className="col-6" id="tercero">
                        <h5>Box Spa de Manos.</h5>
                        <p>Incluye:</p>
                        <ul>
                            <li>Crema Exfoliante de manos de Lavanda.</li>
                            <li>Crema Hidratante de Manos Lemongrass.</li>
                            <li>Aceite de cuticulas.</li>
                            <li>Lima.</li>
                            <li>Palito de Naranjo.</li>
                            <li>Tarjeta con el paso a paso del Spa en casa.</li>
                        </ul>
                        <p>Las cremas estan hechas con ingredientes 100% naturales y son veganas.</p>
                        <p>Crema manos contiene : aceite de almendras, karite, extracto de manzanilla (super calmante), vitamina E y esencial lemongrass</p>
                        <p>Crema exfoliante contiene: aceite de coco, karite, vitamina e y esencial de lavanda.</p>
                    </div>
                </div>
                <hr className="hr my-3" />

                <div className="row">
                    <div className="col-6">
                        <h5>Parlante Portatil Inalambrico Bluetooth Bt25.</h5>
                        <p>
                            Producto: Parlante Portatil <br />
                        Marca: NogaNet<br />
                        Modelo: NG-BT25<br />
                        Color: Negro
                        </p>
                        <p>• CARACTERÍSTICAS •</p>
                        <ul>
                            <li>Potencia de salida (RMS): 10 W</li>
                            <li>Cantidad de parlantes: 1</li>
                            <li>Configuración de canales: Stereo</li>
                            <li>Formato del parlante: Caja</li>

                        </ul>
                    </div>
                    <div className="col-6 text-center parlante">
                        <img
                            className="img-fluid img-thumbnail"
                            src="https://http2.mlstatic.com/parlante-portatil-inalambrico-bluetooth-bt25-led-rgb-D_NQ_NP_868745-MLA43073032259_082020-F.webp%202x"
                            alt="Premio tostadora" />
                        <p className="text-center mt-3">4° Premio</p>
                    </div>
                </div>
            </div>
        )
    }
}
