const mongoose = require('mongoose');

const dbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // eslint-disable-next-line
  console.log('Connection successful');
};

dbConnect();

module.exports = dbConnect;
