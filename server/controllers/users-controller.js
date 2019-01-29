const { User } = require("../models/user");
const _ = require("lodash");
const validateRegisterInput = require("../validation/user/register");
const validateLoginInput = require("../validation//user/login");
const bcrypt = require("bcryptjs");

exports.signup = async function(req, res, next) {
  const body = await _.pick(req.body, ["email", "password", "confirmation"]);
  try {
    const newUser = await new User(body);
    await newUser.generateAuthToken();
    await newUser.save();
    res.json(newUser.auth.token);
  } catch (e) {
    let { errors, isValid } = validateRegisterInput(body, e);
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      console.log(e);
      return res.status(500).json("please try again");
    }
  }
};

exports.login = (req, res, next) => {
  let body = _.pick(req.body, ["email", "password"]);
  User.verifyLogin(body.email, body.password)
    .then(user => {
      let token = user.generateAuthToken();
      user
        .update({
          $set: {
            auth: {
              token
            }
          }
        })
        .then(() => res.json(token))
        .catch(e => {
          console.log(e);
        });
    })
    .catch(verifyError => {
      let { errors, isValid } = validateLoginInput(body, verifyError);
      if (!isValid) {
        return res.status(400).json(errors);
      }
    });
};

exports.update = (req, res, next) => {
  let body = _.pick(req.body, ["email", "password", "confirmation"]);
  req.user.generateSafePassword(body);
  // try {
  User.findOneAndUpdate(
    {
      email: req.user.email,
      password: req.user.password,
      confirmation: req.user.confirmation
    },
    {
      email: body.email,
      password: body.password
    },
    { new: true }
  )
    .then(user => res.json({ email: user.email, password: user.password }))
    // .catch(e => console.log(e))
    .catch(updateError => {
      let { errors, isValid } = validateRegisterInput(body, updateError);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      // .catch(updateError => {
      //     let { errors, isValid } = validateRegisterInput(body, updateError)
      //     if (!isValid) {
      //       return res.status(400).json(errors)
      //     }
    });
  // } catch (updateError) {
  //     let { errors, isValid } = validateRegisterInput(body, updateError)
  //     if (!isValid) {
  //       return res.status(400).json(errors)
  //     }
  // }
};

//
// User.findOneAndUpdate(
//   { email: req.user.email },
//   {
//     email: body.email,
//     password: body.password,
//     confirmation: body.confirmation
//   },
//   { new: true }
// )
//   // .then(user => {
//   //   user.updateOne({
//   //     $set: {
//   //       email: body.email,
//   //       password: body.password,
//   //       confirmation: body.confirmation
//   //     }
//   //   })
//
//   .then(user => {
//     let { errors, isValid } = validateRegisterInput(body)
//     if (!isValid) {
//       return res.status(400).json(errors)
//     }
//     res.json(user)
//   })
//   .catch(e => console.log(e))
// .then(user => {
//   let { errors, isValid } = validateRegisterInput(body)
//   if (!isValid) {
//     return res.status(400).json(errors)
//   }
//   res.json(user)
// })
// .catch(e => console.log(e))
// })
// .catch(updateError => {
//   let { errors, isValid } = validateRegisterInput(body, updateError)
//   if (!isValid) {
//     return res.status(400).json(errors)
//   }
// })
// }
