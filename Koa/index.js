const Koa = require("koa");
const app = new Koa();

// app.use((ctx, next) => {
//   ctx.response.body = "hello, I am jiaxin";
//   console.log(ctx);
// });

app.use(async (ctx, next) => {
  console.log("111, then do something");
  await next();
  console.log("111 end");
});

app.use(async (ctx, next) => {
  console.log("222, then do something");
  await next();
  console.log("222 end");
});

app.use(async (ctx, next) => {
  console.log("333, then do something");
  await next();
  console.log("333 end");
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
