const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimisation = () => {
    const config = {
        runtimeChunk: 'single',
        minimizer: [],
    }
    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            `...`,
            new CssMinimizerPlugin(),
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {

    const loaders = [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // hmr: isDev,
                        // reloadAll: true
                    },
                },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                // {from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist')},
                // {from: path.resolve(__dirname, 'src/assets/'), to: path.resolve(__dirname, 'dist')},
                {from: path.resolve(__dirname, 'src/assets/'), to: path.resolve(__dirname, 'dist/assets/')},
                {from: path.resolve(__dirname, 'src/PHPMailer/'), to: path.resolve(__dirname, 'dist/PHPMailer/')},
                {from: path.resolve(__dirname, 'src/sendmail.php'), to: path.resolve(__dirname, 'dist')},
            ]
        }),
    ]

    if (isProd){
        base.push(new BundleAnalyzerPlugin())
    }

    return base

}





module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./index.js'], //подключен полифил
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimisation(),
    devServer: {
        port:4200,
        hot:isDev
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader")
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                type: "asset/resource",
            },
            {
                //XML
                test: /\.xml$/,
                use: [{
                        loader: "xml-loader"
                    }
                ]
            },
            {
                //CSV
                test: /\.csv$/,
                use: [{
                    loader: "csv-loader"
                }
                ]
            },
            {
                //Babel
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }

}