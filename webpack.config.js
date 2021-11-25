const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { version } = require("./package.json");
const partners = require("./partners-templates/index.json");

module.exports = {
	mode: process.env.NODE_ENV === "dev" ? "development" : "production",
	target: "web",
	entry: "./public/index.tsx",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		clean: true,
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [{
				loader: "thread-loader",
			}, {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-react"]
				}
			}],
			exclude: /(node_modules)/,
		}, {
			test: /\.tsx?$/,
			use: [{
				loader: "thread-loader",
			}, {
				loader: "ts-loader",
				options: {
					happyPackMode: true
				}
			}]
		}, {
			test: /\.less$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader"
			}]
		}, {
			test: /\.css$/,
			use: [{
				loader: "style-loader",
			}, {
				loader: "css-loader"
			}]
		}, {
			test: /\.otf$/,
			loader: "file-loader"
		}, {
			test: /\.(hbs|handlebars)$/,
			loader: "handlebars-loader",
			options: {
				rootRelative: path.resolve(__dirname, "partners-templates"),
				helperDirs: [
					path.resolve(__dirname, "partners-templates/helpers")
				],
				knownHelpers: [
					"hasContent",
					"isDefaultLanguage"
				],
			}
		}]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/].+/,
					name: "vendor",
					chunks: "initial",
					priority: 1,
				},
				react: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/].+/,
					name: "react.vendor",
					chunks: "initial",
					priority: 2,
				},
				partners: {
					test: /[\\/](partners-templates|node_modules[\\/]handlebars)[\\/].+/,
					name: "partners",
					priority: 2,
					chunks: "initial"
				}
			},
		}
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		alias: {
			"@pkvd/passkit-types": path.resolve(__dirname, "./packages/passkit-types"),
			"@pkvd/pass": path.resolve(__dirname, "./src/Pass/"),
			"@pkvd/store": path.resolve(__dirname, "./src/store/")
		}
	},
	devServer: {
		port: 3000,
		host: "0.0.0.0",
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Passkit Visual Designer",
			template: "./public/index.html",
			filename: "./index.html",
			description: "A web tool to make it easier designing Apple Wallet Passes graphically",
			chunks: "all",
		}),
		new forkTsCheckerWebpackPlugin(),
		new DefinePlugin({
			__DEV__: process.env.NODE_ENV === "dev",
			partners: JSON.stringify(partners),
			version: JSON.stringify(version),
		}),
	]
};
