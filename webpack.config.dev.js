
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist/"),
		filename: "bundle.js"
	},
    mode: "development",
	resolve: {
		extensions: [".js", ".jsx"]
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
	devServer: {
		static: path.join(__dirname, "dist"),
		compress: true,
		port: 8080
	}
}