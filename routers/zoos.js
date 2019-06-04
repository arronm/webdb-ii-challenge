const express = require('express');
const router = express.Router();
router.use(express.json());

const Zoos = require('../data/lambda-models');
const validateBody = require ('./middleware/validateBody');

router.get('/', async (req, res) => {
  try {
    const data = await Zoos.get();
    res.json(data);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Zoos.get(req.params.id);
    if (!data) return res.status(404).json({
      message: `Could not find record with id of (${req.params.id})`
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

router.post('/', validateBody, async (req, res) => {
  try {
    const data = await Zoos.post(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.json(errorRef(error));
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
