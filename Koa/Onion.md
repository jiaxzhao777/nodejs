### koa 是什么

https://juejin.cn/post/7140860497330438181?from=search-suggest

koa 被认为是第二代 node 框架，它最大的特点就是独特的中间件流程控制，是一个典型的洋葱模型。koa 是最流行的 nodejs 后端框架之一，有很多网站都使用 koa 进行开发，同时社区也涌现出了一大批基于 koa 封装的企业级框架。

koa 做了什么工作

- 1.封装 node httpServer

koa 首先对原生的 http 请求响应过程进行封装，在 application.js 中实现一个 Application 对象，它主要实现了通过 app.use 注册请求的回调，app.listen 启动 server。

2. 构造 resquest, response, context 对象

koa 有三个重要的对象，分别是 request,response, context。其中 request 和 response 对象是使用 js 的 getter 和 setter 属性，对 node 原生的 req 和 res 对象的一些方法和属性的封装，context 对象则是回调函数上下文对象，在它上面挂载了 request 和 response 对象，并且做了一些常用方法的代理。
有了这三个重要对象之后，Application 对象就不再需要像原生 node 一样在回调函数中直接使用 req 和 res 了。

3.提供了中间件机制
在 koa 中我们可以对每一个请求使用多个中间件，每个中间件会依次处理，并可以通过 next 方法暂停当前执行，待后续中间件执行完毕后继续往下执行。在 koa2 中，得益于 await/async 函数，“我们可以实现《真正》的中间件”，拒绝回调金字塔，和传统的级联处理相比，中间件机制可以很轻易的向下游函数以及上游函数传递执行权。

4.错误处理
一个健壮的框架，必须保证在发生错误的时候，能够捕获错误并有降级方案返回给客户端。koa 的请求处理函数执行后会返回一个 promise，那么只需要定义一个 onerror 函数，里面进行错误发生时的降级处理，然后在 promise 的 catch 方法中引用这个函数即可。

koa2 洋葱模型中间件的实现
中间件的实现有两个最重要的点

next 的实现
中间件的管理

如果要去实现一个洋葱模型的中间件，可以先看 next 的实现，假设现在我们有三个 async 函数

```js
async function m1(next) {
  console.log("m1");
  await next();
}

async function m2(next) {
  console.log("m2");
  await next();
}

async function m3() {
  console.log("m3");
}
```

### 原理

通过手动实现每个中间件的 next，我们让三个中间件以洋葱模型的规则去执行了，将这个思路拓展到 n 个中间件，我们会考虑到实现一个批量操作函数，调用一次批量操作函数，就去倒序遍历中间件列表，批量创建所有中间件的 next 函数，然后将 next 函数作为参数依次传给上一个中间件，构造好它们的联系，最后执行。那么我们只需要在请求打过来的时候调用一下，所有的中间件就可以按我们编排好的顺序来执行了。koa2 对于中间件就是这么管理的，把所有中间件合成一个函数

### 洋葱模型的精妙之处

koa 能这么流行的原因，很大程度归功于洋葱模型的中间件流程设计，为什么这么说呢，我们拿 express 来比较一下，express 也有中间件，但是它是基于回调实现的线形模型，中间件是顺序执行的，不利于组合，不利于互操，并且实现也没有 koa 来得简单。举一个简单的例子感受一下，假如我们想实现一个记录请求响应时间的中间件

```js
const express = require("express");
const app = express();
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});
app.get("/", function (req, res) {
  var responseText = "Hello World!";
  req.setHeader("x-response-time", Date.now() - req.requestTime);
  res.send(responseText);
});
app.listen(3000);
```

```js
const Koa = require("../lib/application");
const app = new Koa();
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
app.use(async (ctx, next) => {
  ctx.body = "Hello World!";
  next();
});
app.listen(3000, () => {
  console.log("listenning on 3000");
});
```
