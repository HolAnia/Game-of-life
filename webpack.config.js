const path = require('path');

module.exports = {
    watch: true,
    mode: 'development',
    entry: {
        main: path.join(__dirname, 'js', 'app.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].out.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(c|a)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}