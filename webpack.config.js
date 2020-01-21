const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	target: "web",
	entry: "./src/public/index.tsx",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: "babel-loader",
			exclude: /(node_modules)/,
			options: {
				presets: ["@babel/preset-react"]
			}
		}, {
			test: /\.tsx?$/,
			loader: "ts-loader"
		}, {
			test: /\.less$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader"
			}]
		}]
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	devServer: {
		port: 3000,
		host: "0.0.0.0",
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Passkit Visual Designer",
			template: "./src/public/index.html",
			filename: "./index.html"
		})
	]
};
