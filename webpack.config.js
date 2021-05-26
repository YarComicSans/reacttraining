const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    context: __dirname,
    mode: 'development',
    entry: './src/index.tsx',
    target: 'web',
    output: {
        path: path.resolve( __dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                // use: ['css-loader', {
                //     loader: 'style-loader',
                //     options: {
                //         insert: 'head',
                //         injectType: 'singletonStyleTag'
                //     }
                // }],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'public', 'index.html'),
            filename: 'index.html'
        })
    ]
}