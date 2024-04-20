const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  selectedId: {
    type: [mongoose.Types.ObjectId],
  },
});

module.exports=mongoose.model('cart', cartSchema);
