let Koa = require("koa");

let app = new Koa();

// app.use((ctx, next) => {
//   console.log(1);
//   next();
//   console.log(1);
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use((ctx, next) => {
//   console.log(3);
//   next();
// });

// app.listen(3000, () => {
//   console.log("listenning on 3000");
// });

// // 1 2 3 1

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(1);
});

app.use(async (ctx, next) => {
  await new Promise((resolve) => {
    resolve();
  });
  console.log(2);
  next();
  console.log(2);
});

app.use((ctx, next) => {
  console.log(3);
});

app.listen(3000, () => {
  console.log("listenning on 3000");
});
