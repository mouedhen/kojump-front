const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'dev';

let cssLoader = [
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            minimize: !dev
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                }),
            ]
        }
    },
];

let config = {
    entry: {
        app: ["./src/scss/app.scss", "./src/js/app.js"]
    },
    output: {
        path: path.resolve("./public/assets"),
        filename: dev ? '[name].bundle.js' : '[name].[chunkhash:8].bundle.js',
        publicPath: "/assets"
    },
    resolve: {
        alias: {
            '@css': path.resolve('./src/css/'),
            '@': path.resolve('./src/js/'),
        }
    },
    watch: dev,
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",
    devServer: {
        overlay: true,
        contentBase: path.resolve('./public')
    },
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: ['eslint-loader']
            // },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoader
                })
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [...cssLoader, 'sass-loader']
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:8].ext'
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            enable: !dev
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: dev ? '[name].bundle.css' : '[name].[contenthash:8].css',
            //disable: dev
        }),
        new CleanWebpackPlugin(['public/assets'], {
            root: path.resolve('./'),
            verbose: true,
            dry: dev
        }),
        //new HtmlWebpackPlugin(),
    ]
};

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: true
    }));
    config.plugins.push(new ManifestPlugin({}))
}

module.exports = config;
