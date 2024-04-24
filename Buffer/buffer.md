### Buffer

Node.js 用来处理二进制流数据或者与之进行交互，内置模块

Buffer 用于读取或者操作二进制数据流，做为 Node.js API 的一部分使用无需使用 require
用于网络操作协议、数据库、图片和文件 I/O 等一些需要大量二进制数据的场景。

Buffer 在创建时已经被确定且无法调整，在内存中分配 Buffer 是由 C++而不是 V8

Buffer 是堆外内存，脱离 Node.js 内存限制
