import { createServer } from "http";

const requestListener = function (req, res) {
  if (req.method === "GET" && req.url === "/teste") {
    res.writeHead("Get /test executado com sucesso");
  } else {
    res.writeHead(200);
  }
  res.end("Hello, World 2!");
};

const server = createServer(requestListener);
server.listen(8080);
