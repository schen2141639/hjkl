const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}
const findOrCreate = (profile, cb) => {
  const user = userModel.findByGithubId(profile.id);
  if(!user) {
    userModel.addUser({...profile, githubId: profile.id})
    return cb(null, profile)
  }
  return cb(null, user)
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate
};
