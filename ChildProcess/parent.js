const { fork } = require("child_process");

const child = fork("./child.js");

child.on("message", (message) => {
  console.log(`Received message from child: ${message}`);
});

child.send("Hello from parent");
