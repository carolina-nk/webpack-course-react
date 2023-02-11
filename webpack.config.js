
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist/"),
		filename: "bundle.js",
		publicPath: "./",
		clean: true
	},
	mode: "production",
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@components": path.resolve(__dirname, "src/compnents/"),
			"@styles": path.resolve(__dirname, "src/styles/")
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
            {
                test: /\.html$/,
                use: [
                    { loader: "html-loader" }
                ]
            },
			{
				test: /\.s[ac]ss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
		new MiniCSSExtractPlugin({
			filename: "[name].css"
		})
    ],
	optimization: {
		minimize: true,
		minimizer: [
			new CSSMinimizerPlugin(),
			new TerserPlugin()
		]
	}
}