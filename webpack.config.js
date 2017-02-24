let exclude = /(node_modules|bower_components|.DS_Store)/;
// 获取配置文件
let configs = require('./server/configs').getConfigs();
let env = configs.env;
// nodejs 中的path模块
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let plugins = [new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_console: env == 'prd' ? true : false
  }
})];

// 添加配置文件
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"' + env + '"'
  }
}));

if (env == 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './app/main.html',
  inject: true,
  minify: {
    removeComments: env == 'prd',
    collapseWhitespace: env == 'prd',
    removeAttributeQuotes: env == 'prd'
  }
}));

let entry = {};
if (env == 'dev') {
  entry.index = ['webpack-hot-middleware/client?reload=true', './app/main.js'];
} else {
  entry.index = ['./app/main.js'];
}

module.exports = {
  entry: entry,
  plugins: plugins,
  // 输出配置
  output: {
    path: env == 'dev' ? '/dist' : './dist',
    filename: env == 'dev' ? '[name].[hash:8].js' : '[name].[chunkhash:8].js'
  },
  resolve: {
    alias: {
      Vue: 'vue/dist/vue.js',
      components: __dirname + '/app/components'
    }
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: exclude
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: exclude
    }]
  }
};
