// ORM CONFIG
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(() => console.log(`Connected to ${process.env.MONGODB_URI}`))
// TODO - update to logger
.catch(e => console.log('Mongo Connection Error:', e));

module.exports = {mongoose};
