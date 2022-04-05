const { Schema, model } = require('mongoose');

const foodSchema = new Schema(
  {
    name: String,
    image: String,
    amount: Number,
    kcal: Number,
    fat: Number,
    fiber: Number,
    carb: Number,
    protein: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Food', foodSchema);
