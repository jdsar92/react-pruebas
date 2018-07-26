import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos.css';
import logo from './assets/images/logo-almundo.svg';
import Filtro from './componentes/Filtro.js';



class App extends React.Component {
 
 render(){
        return(

				<div>
					<header style={{backgroundColor: "#003576"}}>
						<img src={ logo } />				
					</header>

					<Filtro />

				</div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));