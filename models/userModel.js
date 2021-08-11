const fs = require('fs');
const users = JSON.parse(fs.readFileSync('models/users.json', {encoding:'utf8', flag:'r'})).users;

const userModel = {
  findOne: (username) => {
    console.log(username, "$$$$$$$$$$$$$");
 //   console.log(await collection.find(), "&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    const user = users.find((user) => user.username === username);
  //  console.log(db.main, "^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  console.log(user, "^^^^^^^^^^^^^^^^^^")
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${username}`);
  },
  findByUsername: (username) => {
    const user = users.find((user) => user.username == username);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with username: ${username}`);
  },
  findById: (id) => {
    console.log(id, "%%%%%%%%%%%%%%%%")
    const user =  users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  }
};

module.exports = { userModel };
