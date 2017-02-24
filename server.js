let webpackConfig = require('./webpack.config');
let webpack = require('webpack');
let opn = require('opn');
let http = require('http');
let express = require('express');
let app = express();
let server = http.createServer(app);
let port = process.env.port || 8080;

let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');

let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  inline: true,
  stats: {
    cached: false,
    colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));

// 路由器定义 mock 数据
app.get('/books', function(req, res) {
  console.log(req);
  res.json({
    code: '000000',
    msg: 'success',
    data: [{
      name: '背影',
      author: '朱自清'
    }]
  });
});

app.post('/books', function(req, res) {
  console.log(req);
  res.json({
    code: '000000',
    msg: 'success',
    data: [{
      name: '背影',
      author: '朱自清'
    }]
  });
});

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log('启动成功，启动端口号：' + port);
  // opn('http://127.0.0.1:' + port);
});
