const mongoose = require('mongoose');
const { accountSchema } = require('../../models/account');

const addUser = async (data) => {
  try {
    const User = mongoose.model('account', accountSchema);

    const newUser = new User({
        type: data.typeUsers,
        email: data.email,
        username: "thomas",
        password: data.password,
    });

    newUser.save().then(() => console.log('User create'));

  } catch (error) {
    console.error(error);
  }
};

module.exports = { addUser };