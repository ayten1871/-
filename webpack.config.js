const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //produce a seperate css file after built
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3010,
        historyApiFallback: true,
        static: ['dist'],
        //contentBase: './build',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_nodules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    //'style-loader', //MiniCssExtractPlugin will take care of it
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|svg|jepg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                        limit: 2048, //小於用base64 大於生成檔案用請求
                    },
                },
            },
        ],
    },
    // optimization: {
    //     splitChunks: {
    //         // minSize: 30,  //提取出的chunk的最小大小,以字節為單位
    //         cacheGroups: {
    //             default: {
    //                 name: 'common',
    //                 chunks: 'initial',
    //                 minChunks: 2, //模塊被引用2次以上的才抽離
    //                 priority: -20,
    //             },
    //             vendors: {
    //                 //拆分第三方庫（通過npm|yarn安裝的庫）
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendor',
    //                 chunks: 'initial',
    //                 priority: -10,
    //             },
    //         },
    //     },
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            filename: '[name].html',
        }),
    ],
};
