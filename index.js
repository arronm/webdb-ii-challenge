const express = require('express');
const helmet = require('helmet');

const ZooRouter = require('./routers/zoos');
const BearRouter = require('./routers/bears');
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/zoos', ZooRouter);
server.use('/api/bears', BearRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
