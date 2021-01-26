import React, { Component } from 'react';

export default class Home extends Component {

    render() {
        return (
            <div>
                home
                <div className="container">
                    <label for="customRange3" className="form-label">Plata recaudada</label>
                    <input type="range" className="form-range" min="0" max="400000" value="310000" id="customRange3" />
                    <p className="text-center">$</p>
                </div>
            </div>
        )
    }
}
