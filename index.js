const express = require('express');
const helmet = require('helmet');

const Zoos = require('./data/lambda-models');
const server = express();

server.use(express.json());
server.use(helmet());

const errorRef = (error) => {
  const hash = Math.random().toString(36).substring(2);
  console.log(error);
  return { message: `Unknown Server Error, Reference: ${hash}`}
}

// endpoints here
server.get('/api/zoos/', async (req, res) => {
  try {
    const data = await Zoos.get();
    res.json(data);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const data = await Zoos.get(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

server.post('/api/zoos/', async (req, res) => {
  try {
    const data = await Zoos.post(req.body);
    res.json(data);
  } catch (error) {
    res.json(errorRef(error));
  }
});

server.put('/api/zoos/:id', async (req, res) => {
  try {
    const records = await Zoos.put(req.params.id, req.body);
    if (!records) return res.status(400).json({
      message: `Could not find with an id of (${req.params.id})`,
    });
    res.json({
      message: `${records} record(s) updated successfully`,
    });
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

server.delete('/api/zoos/:id', async (req, res) => {
  try {
    const records = await Zoos.remove(req.params.id);
    console.log(records);
    if (!records) return res.status(400).json({
      message: `Could not find with an id of (${req.params.id})`,
    });

    res.json({
      message: `${records} record(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
