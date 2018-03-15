const path = require("path");
const webpack = require("webpack");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const isDev = process.env.NODE_ENV ==='development';//用来判断是否是开发环境,启动脚本的时候设置的环境变量储存在process.env 这个对象里面的

const config = {
    target: 'web',
    entry:{
        index:path.resolve(__dirname,"src/js/index.js")
    },
    output:{
        filename:'js/[name]_bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                exclude:path.resolve(__dirname+'/node_modules/'),
                include:path.resolve(__dirname+'/src/'),
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                exclude:path.resolve(__dirname+'/node_modules/'),
                include:path.resolve(__dirname+'/src/'),
                use:extractTextPlugin.extract({
                    fallback:{
                        loader:'style-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                sourceMap: true,
                                modules:true,
                                importLoaders:1
                            }
                        },
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap: true,
                                plugins:function () {
                                    return [
                                        require('postcss-import'),
                                        require('autoprefixer')({
                                            browsers:['last 5 versions']
                                        })
                                    ]
                                }
                            }
                        }
                    ]
                })
            },
            {
                test:/\.styl$/,
                exclude:path.resolve(__dirname+'/node_modules/'),
                include:path.resolve(__dirname+'/src/'),
                use:extractTextPlugin.extract({
                    fallback:{
                        loader:'style-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                sourceMap: true,
                                modules:true,
                                importLoaders:1
                            }
                        },
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap: true,
                                plugins:function () {
                                    return [
                                        require('postcss-import'),
                                        require('autoprefixer')({
                                            browsers:['last 5 versions']
                                        })
                                    ]
                                }
                            }
                        },
                        {
                            loader:'stylus-loader'
                        }
                    ]
                })
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)$/i,
                exclude:path.resolve(__dirname+'/node_modules/'),
                use:[
                    {
                        loader:'url-loader',
                        query:{
                            limit:2000,
                            name:'images/[name]_[hash:5].[ext]'
                        }
                    },
                    {
                        loader:"image-webpack-loader"
                    }
                ]
            },
            {
                test:/\.html$/,
                exclude:path.resolve(__dirname+'/node_modules/'),
                include:path.resolve(__dirname+'/src/'),
                use: [ {loader:"html-loader"}]
            },
            {
                test:/\.js$/,
                exclude:path.resolve(__dirname+'/node_modules/'),
                include:path.resolve('/src/'),
                use:[
                    {loader:"babel-loader",
                        /*query:{
                            preset:["env"],//已经使用了配置文件
                            plugins:[
                                'transform-vue-jsx'  //用来支持vue的jsx语法
                            ]
                        }*/
                    }
                ]},

        ]
    },
    plugins:[
        new webpack.DefinePlugin({//用来在编译或写代码的时候判断这个环境，
            //环境不同，打包的功能也不同，因此需要在不同环境使用不同打包方式
           'process.env':{
               NODE_ENV:isDev ? '"development"':'"production"'   //2个引号是因为判断之后调用的是里面的字符串，而不是这个名字的变量
           }
        }),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname+'/src/index.html'),
            filename:"index.html",
            inject:"body",
            minify:{
                removeComments:true,
                removeEmptyElements:true,
                useShortDoctype:true
            },
            chunks:["index"],
            inlineSource:".(js|css)$"
        }),
        new htmlWebpackInlineSourcePlugin(),
        new extractTextPlugin({
            filename:path.resolve(__dirname+'css/style.css')

        }),
        new cleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
            //Vue: ['vue/dist/vue.esm.js', 'default']

        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

if(isDev){
    //config.devtool="source-map", 这样会能完整的显示，但是会导致比较大
    config.devtool="#cheap-module-eval-source-map";//推荐配置
    config.devServer = {
        port:8080,
        //host:'0.0.0.0',//可以通过localhost:127.0.0.1访问，也可以通过本机内网IP访问，因此可以通过其他电脑，手机等访问到
        overlay:{
            error:true,//让编译中出现的错误显示到网页上面
        },
        open:true,
        hot:true
    }
}

module.exports = config;

