const express = require("express");
const app = express();
const port = 8000;

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/sse", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream", // 设定数据类型
    "Cache-Control": "no-cache", // 长链接拒绝缓存
    Conntection: "keep-alive", // 设置长链接
  });

  console.log("进入长链接了......");

  setInterval(() => {
    console.log("正在持续返回数据中ing");
    const data = {
      message: `Current time is ${new Date().toLocaleTimeString()}`,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Port is listening on ${port}`);
});
