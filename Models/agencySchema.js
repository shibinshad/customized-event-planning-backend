const mongoose=require('mongoose');
const agencyForms =new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  email: {type: String,
    required: true,
  },
  image: {type: String,
    required: true,
  },
  location: {type: String,
    required: true,
  },
  phone: {type: String,
    required: true,
  },
});
module.exports = mongoose.model('agencyForms', agencyForms );
