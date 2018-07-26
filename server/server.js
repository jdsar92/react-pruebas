import express from 'express';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';


import hoteles from './data/data.json';

const port = 3000;
const app = express();
const compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/hoteles', function (req, res) {
	console.log('/hoteles');
    res.status(200).send(hoteles);;
});

app.get('/hoteles/:numEstrellaHotel', function (req, res) {
	
	var numEstrellaHotel = req.params.numEstrellaHotel;
	
	var resp = [];
	
	if(numEstrellaHotel != 0){
		for(var indexHotel in hoteles){
			var refHotel = hoteles[indexHotel];
			
			if(refHotel.stars == numEstrellaHotel){
				resp.push(refHotel);			
			}
		}
	}else{
		resp = hoteles;
	}
    res.status(200).send(resp);;
});

app.get('/hoteles/nombre/:nombreHotel', function (req, res) {
	
	var nombreHotel = req.params.nombreHotel;
	
	var resp = [];
	
	if(nombreHotel != ""){
		for(var indexHotel in hoteles){
			var refHotel = hoteles[indexHotel];
			
			if(refHotel.name.includes(nombreHotel)){
				resp.push(refHotel);			
			}
		}
	}else{
		resp = hoteles;
	}
    res.status(200).send(resp);;
});


app.listen(port, function (error) {
    if(error) {
        console.log(error);
    } else {
        open(`http://localhost:${port}`)
    }
});