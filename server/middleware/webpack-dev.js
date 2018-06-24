import WebpackDevMiddleware from 'webpack-dev-middleware'
import applyExpressMiddleware from '../lib/apply-express-middleware'
import _debug from 'debug'

const debug = _debug('app:server:webpack-dev')

export default function (compiler, publicPath) {
  debug('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    // contentBase: '',
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats:  {
      chunks: false,
      chunkModules: false,
      colors: true
    },
  })

  return async function koaWebpackDevMiddleware (ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments)
      }
    })

    if (hasNext) {
      await next()
    }
  }
}
