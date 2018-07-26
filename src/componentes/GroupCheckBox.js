import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import estrella from '../assets/icons/filters/star.svg';


export default class GroupCheckBox extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {

		};
		this.childs = [{pos: 0, checked:true},{pos: 5,checked:false},{pos: 4, checked:false},{pos: 3, checked:false},{pos: 2, checked:false},{pos: 1, checked:false}]
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange(val,index) {  	  
	  this.childs.forEach((data)=>{
	  data.checked = false;
	  })
	  this.childs[index].checked=val;
	  this.setState({})
	  this.props.onUpdate(this.childs[index].pos);
	}
	
		
	render () {
		
        return (
            <div>
				   				   
				{this.childs.map(
					(val, index) => (
						<div  key={index} style={{paddingTop: "6px"}}> 
						
							<div>
								<Input key={val.pos}  type="checkbox" checked={val.checked} onClick={(e)=>{this.handleInputChange(e.target.value, index)}} />
							</div>
							
							{(()=>{
								let component = '';
								let outputArray = [];
								switch(val.pos){
								  case 0:
									outputArray.push(<strong key={val.pos} style={{color: "#444444", fontSize: "13px"}}>Todas las estrellas</strong>);
									break;
								  case 5: case 4: case 3: case 2: case 1:
									for(var x=1; x<=val.pos; x++){
										outputArray.push( <img key={val.pos+x} src={ estrella } style={{width: "16px", filter : "invert(.5) sepia(1) saturate(5) hue-rotate(-2deg)", marginBottom: "6px"}} />)										
									}
									break;
								  default:
									break;
								}
								return outputArray;
							})()}
							
						</div> 
					   
					)
				)}				
			   
			</div>
        );
    }
}