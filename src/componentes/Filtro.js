import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Input, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Hoteles from './Hoteles.js';
import lupa from '../assets/icons/filters/search.svg';
import estrella from '../assets/icons/filters/star.svg';
import GroupCheckBox from './GroupCheckBox.js';

export default class Filtro extends React.Component{

	constructor(props) {
		super(props);
		
		this.state = {hoteles:[], numeroEstrella: 0, nombreHotel: ""};
		
		
		fetch('/hoteles', {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			})
		  .then(response => {
			if (!response.ok) {
			  throw Error("Network request failed")
			}

			return response
		  })
		  .then(d => d.json())
		  .then(d => {
			this.setState({
			  hoteles: d
			})
		  }, () => {
			this.setState({
			  hoteles: []
			})
		  })
		  
	}
	onUpdate (data) { 
		this.setState({ numeroEstrella: data });	
		
		fetch('/hoteles/'+data, {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			})
		  .then(response => {
			if (!response.ok) {
			  throw Error("Network request failed")
			}

			return response
		  })
		  .then(d => d.json())
		  .then(d => {
			this.setState({
			  hoteles: d
			})
		  }, () => {
			this.setState({
			  hoteles: []
			})
		  })
	}
	
	handleChange(e) {
		 this.setState({ nombreHotel: e.target.value });
	}
	
	handleButton(e) {
	
		fetch('/hoteles/nombre/'+this.state.nombreHotel, {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			})
		  .then(response => {
			if (!response.ok) {
			  throw Error("Network request failed")
			}

			return response
		  })
		  .then(d => d.json())
		  .then(d => {
			this.setState({
			  hoteles: d
			})
		  }, () => {
			this.setState({
			  hoteles: []
			})
		  })
	}
	
	
	render () {
		var numeroEstrella = this.state.numeroEstrella;
        return (

			<Container>
				<Row>
					<Col>
						<div id= "filtro" style={{backgroundColor: "#FFF", width: "345px", marginTop: "10px"}}>
							<div style={{paddingLeft: "8px",paddingBottom: "8px",paddingRight: "8px",paddingTop: "8px"}}>
								<strong style={{paddingLeft: "12px", color: "#444444"}}>Filtros</strong>
							</div>

							<div style={{backgroundColor: "#F4F4F4", height: "4px"}} />

							<div style={{paddingLeft: "8px",paddingBottom: "8px",paddingRight: "8px",paddingTop: "8px", display: "inline-grid"}}>

								<div style={{paddingTop: "4px", paddingLeft: "12px"}}>
									<img src={ lupa } style={{width: "17px", filter : "invert(.5) sepia(1) saturate(50) hue-rotate(173deg)", marginBottom: "6px"}} /><strong style={{paddingLeft: "8px", color: "#157ab1"}}>Nombre de hotel</strong>
									
								</div>
								<div style={{paddingLeft: "12px",paddingTop: "4px", display: "inline-flex"}}>	
									<div style={{paddingRight: "12px"}}>
										<Input  type="text" bsSize="20px" name="hotel" onChange={this.handleChange.bind(this)} id="hotel" placeholder="Ingrese el nombre del hotel" />
									</div>	
									<div>	
										<Button style={{backgroundColor: "#002c77"}} color="primary" onClick={this.handleButton.bind(this)} >Aceptar</Button>
									</div>		
								</div>

							</div>
							
							<div style={{backgroundColor: "#F4F4F4", height: "4px"}} />
							
							<div style={{paddingLeft: "8px",paddingBottom: "8px",paddingRight: "8px",paddingTop: "8px", display: "inline-grid"}}>

								<div style={{paddingTop: "4px", paddingLeft: "12px"}}>
									<img src={ estrella } style={{width: "17px", filter : "invert(.5) sepia(1) saturate(50) hue-rotate(173deg)", marginBottom: "6px"}} /><strong style={{paddingLeft: "8px", color: "#157ab1"}}>Estrellas</strong>
									
								</div>
								<div style={{paddingLeft: "35px",paddingTop: "4px"}}>	
									<GroupCheckBox onUpdate={this.onUpdate.bind(this)}/>
								</div>

							</div>
						</div>
					</Col>
					<Col>
						<div style={{backgroundColor: "#FFF", width: "735px", marginTop: "10px"}}>
				
						{this.state.hoteles.map(
							(item, index) => (
								<div>
									<div className="panelInfoHotel" key={index} > 
										
										<img src={require('../assets/images/hotels/'+item.image)} width="256px" height="169px" />
										
										<div>	
											<div>
												<strong style={{paddingLeft: "8px", color: "#157ab1"}}>	
													{item.name}
												</strong>
											</div>

											<div style={{paddingLeft: "6px"}}>	
												{(()=>{
													let outputArray = [];
													for(var x=1; x<=item.stars; x++){
														outputArray.push( <img key={item.stars+x} src={ estrella } style={{width: "16px", height:"16px", filter : "invert(.5) sepia(1) saturate(5) hue-rotate(-2deg)", marginBottom: "6px"}} />)
													}
													return outputArray;
												})()}
											</div>
											<div style={{paddingLeft: "6px"}}>	
												{(()=>{
													let outputArray = [];
													
													
													for(var x=0; x<item.amenities.length; x++){
														var refAmenities = item.amenities[x];
														outputArray.push( <img key={x} src={require('../assets/icons/amenities/'+refAmenities+'.svg')} style={{width: "16px", height:"16px", marginBottom: "6px", marginRight: "4px"}} />)
													}
													return outputArray;
												})()}
											</div>
										</div>
									</div> 
									<div className="panelPrecioHotel">	
										<div style={{display: "flex"}}>
											<strong style={{paddingLeft: "8px", color: "#444444", fontSize: "10px", height: "40px"}}>	
												<p>Precio por noche por habitación</p>
											</strong>
										</div>
										
										<div style={{color: "#df6800", paddingBottom: "10px"}}>
											ARS
											<strong  style={{paddingLeft: "8px"}}>	
												{item.price}
											</strong>
										</div>
										
										<div>
											<Button style={{backgroundColor: "#002c77"}} color="primary">Ver hotel</Button>
										</div>

										
									</div>
									<div style={{backgroundColor: "#F4F4F4", height: "15px"}} />
								</div>
							   
							)
						)}	
					</div>
					</Col>
				</Row>
			</Container>

        );
    }
}