/* eslint-disable */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

// `ENV='production' webpack` to build for production.
var PRODUCTION = process.env.ENV === 'production' || false;

var buildFolder = '/build/';
var appFolder = './src/';
var appEntry = 'index.js';
var appHtml = 'index.html';
var publicUrl = '';

// Plugins for Webpack.
var webpackPlugins = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
	new InterpolateHtmlPlugin({ PUBLIC_URL: publicUrl }),
	new HtmlWebpackPlugin({ inject: true, template: appFolder + appHtml }),
	new CaseSensitivePathsPlugin(),
	new WatchMissingNodeModulesPlugin('./node_modules')
];

// Compress JavaScript in production builds.
if(PRODUCTION) {
	webpackPlugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			comments: false
		}),
		new webpack.optimize.DedupePlugin()
	]);
}

module.exports = {
	devtool: 'eval',
	entry: {
		app: appFolder + appEntry,
		vendor: ['react', 'react-dom']
	},
  	output: {
		path: __dirname + buildFolder,
		pathinfo: true,
		filename: 'js/app.bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'eslint',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: { cacheDirectory: '' },
				exclude: /(node_modules)/
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file',
				query: {
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.json$/, loader: 'json-loader' }
		]
	},
	plugins: webpackPlugins
};
