const path = require('path')

module.exports = {
    entry: {
        index: './src/index.jsx'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: '[name].map'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        wrappedContextRecursive: true, // Tells the search to also look into sub-folders
        rules: [{
                test: /\.[tj]sx$/,
                exclude: [/node_modules/, '/js/lib/'],
                loader: 'babel-loader',
                options: {
                    "presets": ['@babel/preset-react', '@babel/preset-typescript'],
                    "plugins": [
                        ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
                    ],
                }
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                include: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.ts$/,
                exclude: [/node_modules/, '/js/lib/'],
                use: 'ts-loader',
            }
        ]
    },
    devServer: {
        writeToDisk: true
    },
    optimization: {
        splitChunks: { chunks: 'async' }
    }
}