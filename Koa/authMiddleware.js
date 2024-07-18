const jwt = require("jsonwebtoken");

module.exports = (options) => async (ctx, next) => {
  try {
    // 获取 token
    const token = ctx.header.authorization;
    if (token) {
      try {
        // verify 函数验证 token，并获取用户相关信息
        await verify(token);
      } catch (err) {
        console.log(err);
      }
    }
    // 进入下一个中间件
    await next();
  } catch (err) {
    console.log(err);
  }
};

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "your_secret_key", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
