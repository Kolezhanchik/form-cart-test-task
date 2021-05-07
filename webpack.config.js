const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDevMood = process.env.NODE_ENV === 'development';
const cssLoad = (preprocessor) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
    },
        'css-loader'
    ]
    if (preprocessor.length>0) preprocessor.forEach(item => loaders.push(item))
    return loaders
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (!isDevMood) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    }
    return config;
}

const filename = extension => isDevMood ? `[name].${extension}` : `[name].[hash].${extension}`

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@Components': path.resolve(__dirname, 'src/Components'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3100,
        hot: isDevMood
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDevMood
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoad([])
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoad(['resolve-url-loader', 'sass-loader']),
            },
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: ['file-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}