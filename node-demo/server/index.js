import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

const VDom = () => {
  return "我是一个被渲染为真实DOM的虚拟DOM";
};

// 创建一个express应用
const app = express();
// renderToString 是把虚拟DOM转化为真实DOM的关键方法
const RDom = ReactDOMServer.renderToString(<div>hhhhh</div>);
// 编写HTML模板，插入转化后的真实DOM内容
const Page = `
            <html>
              <head>
                <title>test</title>
              </head>
              <body>
                <span>服务端渲染出了真实DOM:  </span>
                  ${RDom}
              </body>
            </html>
            `;

// 配置HTML内容对应的路由
app.get("/index", function (req, res) {
  res.send(Page);
});

// 配置端口号
const server = app.listen(8000);
