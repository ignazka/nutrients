const Food = require('./food.model');
const mongoose = require('mongoose');

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getFood(req, res) {
  try {
    const { _id } = req.session.user;
    if (!isObjectId(_id)) {
      res.status(400).json({ message: 'ID not valid' }).end();
    }
    const food = await Food.find({ owner: _id }).lean();
    console.log(food);
    res.status(200).json(food).end();
  } catch (error) {
    return res.status(400).json({ message: error.message }).end();
  }
}

async function createFood(req, res) {
  try {
    const food = await Food.create(req.body);
    res.status(200).json(food).end();
  } catch (error) {
    return res.status(400).json({ error: error.message }).end();
  }
}

async function updateFood(req, res) {
  try {
    const { foodID } = req.params;
    if (!isObjectId(foodID)) {
      res.status(400).json({ message: 'ID not valid' }).end();
    }
  } catch (error) {
    return res.status(400).json({ error: error.message }).end();
  }
}

async function deleteFood(req, res) {
  try {
    const { foodID } = req.params;
    console.log(foodID);
    const { data } = await Food.findByIdAndDelete({ _id: foodID });
    console.log(data);
    return res.status(200).json({ message: 'deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.message }).end();
  }
}

module.exports = {
  getFood,
  updateFood,
  createFood,
  deleteFood,
};
