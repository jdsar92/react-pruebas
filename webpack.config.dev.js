import webpack from 'webpack'
import path from 'path'

export default {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src/index.js') 
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{ 
		test: /\.js$/, 
		exclude: /node_modules/, 
		loaders: ['babel-loader'] 
	},
	{
        test: /\.css$/,
		loaders: [ 'style-loader', 'css-loader' ]
    },
	{
	  test: /\.(gif|png|jpe?g|svg)$/i,
	  use: [
		'file-loader',
		{
		  loader: 'image-webpack-loader',
		  options: {
			bypassOnDebug: true, // webpack@1.x
			disable: true, // webpack@2.x and newer
		  },
		},
	  ],
	}
	]
  }

}