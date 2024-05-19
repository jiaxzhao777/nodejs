const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());
router.get("/", (ctx, next) => {
  ctx.response.body = "Hello, koa router";
});

router.get("/data", async (ctx, next) => {
  let url = ctx.url;
  let data = ctx.request.query;
  let dataQuery = ctx.request.querystring;

  ctx.body = {
    url,
    data,
    dataQuery,
  };
});

router.get("/data/:id", async (ctx, next) => {
  let data = ctx.params;
  ctx.body = data;
});

router.get("/post", async (ctx, next) => {
  let html = `
    <form action="/post/result" method="post">
      <p>Who is your favourite super star?</p>
      <input name="name" type="text" placeholder="Please input name: " />
      <br />
      <p>What is your car number?</p>
      <input name="num" type="text" placeholder="Please input number: " />
      <button>OK</button>
    </form>
  `;
  ctx.body = html;
});

router.post("/post/result", async (ctx, next) => {
  // 从ctx的request.body拿到提交上来的数据
  let { name, num } = ctx.request.body;
  if (name && num) {
    ctx.body = `Your favourite super star is ${name}, and your car number is ${num}`;
  } else {
    ctx.body = "There is something wrong happen!";
  }
});

app.listen(3000, () => {
  console.log("port is running at 3000");
});
