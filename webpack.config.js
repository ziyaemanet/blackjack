module.exports = {
  entry: './src/index.js',
  output: {path:'./build',filename:'bundle.js', publicPath:'/build/'},
  devtool: 'inline-source-map',
  module:{
    loaders:[
      {
        loader:'babel-loader',
        test:/\.jsx?$/,
        exclude:/node_modules/,
        query:{
          presets:['es2015','react']
        }
      },
      {
        loader:"style-loader!css-loader",
        test:/\.css$/
      }
    ]
  }
}
