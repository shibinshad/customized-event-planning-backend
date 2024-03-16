const Services = require('../../Models/serviceSchema');
const cateringForm = async (req, res) => {
  console.log('hellkjsda');
  try {
    const file = req.file.location;
    const {Name, Discription, price, type, category} = req.body;
    const newService = new Services({
      name: Name,
      Description: Discription,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};

const DecorationForm = async (req, res) => {
  try {
    const file = req.file.location;
    const {Name, Discription, price, type, category} = req.body;
    const newService = new Services({
      name: Name,
      Description: Discription,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
    console.log(newService);
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};

const locationForm = async (req, res) => {
  console.log(req.body);
  console.log(req?.file?.location);
  try {
    const file = req?.file?.location;
    const {Name, Description, price, type, category} = req?.body;
    const newService = new Services({
      name: Name,
      Description,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};

const mediaForm = async (req, res) => {
  try {
    const file = req.file.location;
    const {Name, Description, price, type, category} = req.body;
    const newService = new Services({
      name: Name,
      Description: Description,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};


module.exports = {
  cateringForm,
  DecorationForm,
  locationForm,
  mediaForm,
};
