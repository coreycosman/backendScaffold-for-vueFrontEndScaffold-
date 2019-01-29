const { User } = require('../models/user');

exports.dashboard = (req, res, next) => {
  // async () => {
  //   try {
  //     const users = await User.find({});
  //     res.json(users)
  //   } catch (e) {
  //     res.json(e)
  //   }
  // }

  User.find({})
    .then(users => res.json(users))
    .catch(e => console.log(e))
}
