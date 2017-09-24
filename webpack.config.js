module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8090',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot-loader!babel-loader'
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/assets/',
        filename: 'bundle.js',
        sourceMapFilename: "bundle.map"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        hot: true,
        port: 8090
    }
};