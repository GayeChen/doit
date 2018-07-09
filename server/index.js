import Koa from 'koa'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'

import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHotMiddleware from './middleware/webpack-hmr'


const compiler = webpack(webpackConfig)
const app = new Koa()
const {publicPath} = webpackConfig.output

app.use(webpackDevMiddleware(compiler, publicPath))
app.use(webpackHotMiddleware(compiler))

app.listen(8000)
