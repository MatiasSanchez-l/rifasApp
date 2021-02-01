import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Donativo</h3>
                        <p className="lh-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum fuga dolorum aspernatur consequatur exercitationem?
                        Blanditiis dolor sunt modi quam totam iure ipsa veritatis soluta at, vel voluptatibus eveniet, quod fugit.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quia, labore ducimus animi sapiente sed tempore laborum omnis ipsum, assumenda quo unde, optio laboriosam minus voluptas soluta! Quia, quidem minima.</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <iframe 
                        title="video papa"
                        width="560" height="315" 
                        src="https://www.youtube.com/embed/vdE_cZgx_L0" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        className="videoHome"></iframe>
                    </div>
                </div>
                <hr/>
                <div>
                    <h5 className="text-center">Premios a sortear</h5>
                    <div className="row">
                        <div className="col-12 col-md-4 text-center img-premio mb-3">
                            <img className="img-fluid img-thumbnail"
                            src="https://http2.mlstatic.com/tostadora-electrica-kanjihome-kjh-tm900sec01-900w-plateada-D_NQ_NP_600821-MLA43694173299_102020-O.webp" alt=""/>
                        </div>
                        <div className="col-12 col-md-4 text-center img-premio mb-3">
                            <img className="img-fluid img-thumbnail img-2"
                            src="https://http2.mlstatic.com/pava-electrica-kanji-2-lts-1500w-ccorte-mate-castelar-D_NQ_NP_630835-MLA44174088004_112020-O.webp" alt=""/>
                        </div>
                        <div className="col-12 col-md-4 text-center img-premio mb-3">
                            <img className="img-fluid img-thumbnail img-3"
                            src="https://http2.mlstatic.com/D_NQ_NP_2X_693190-MLA44170440500_112020-F.webp" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
