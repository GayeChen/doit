
function KoaDevMiddleware(expressDevMiddleware) {
  return function middleware(ctx, next) {
    return new Promise((resolve) => {
      expressDevMiddleware(ctx.req, {
        end: (content) => ctx.body = content,
        setHeader: () => {
          ctx.set.apply(ctx, arguments)
        }
      }, () => {
        resolve(true)
      })
    }).then((err) => {
      if(err) {return next()}
      return null
    })
  }
}

module.exports = KoaDevMiddleware
