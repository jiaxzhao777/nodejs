const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
      error: err.stack,
    };
  }
});

app.use(async (ctx, next) => {
  if (Math.random() < 0.5) {
    throw new Error("Oops! Something went wrong.");
  } else {
    ctx.body = {
      message: "Hello, world!",
    };
  }
});

app.listen(3000);
console.log("Server running on http://localhost:3000");
