import './App.css';
import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import CompraRifa from './components/CompraRifa';
import Contacto from './components/Contacto';


function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/comprarRifa" component={CompraRifa} />
        <Route exact path="/contacto" component={Contacto} />
      </div>
    </Router>
  );
}

export default App;
