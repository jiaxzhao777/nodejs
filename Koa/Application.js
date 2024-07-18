class Application {
  constructor() {
    this.middlewares = [];
    this.context = context;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  compose(middlewares) {
    return function (ctx, lastNext) {
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext);
        };
      }

      let len = middlewares.length;
      let next = lastNext;
      if (!next)
        next = () => {
          return Promise.resolve();
        };
      for (let i = len - 1; i >= 0; i--) {
        let currentMiddleware = middlewares[i];
        next = createNext(currentMiddleware, next)
      }

      await next()
    };
  }

  callback() {
    const fn = this.compose(this.middlewares);
    await fn(ctx)
  }

  listen(...args) {
    let server = http.server(this.callback);
    server.listen(...args);
  }
}
