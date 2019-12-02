'use strict';

const { model: User } = require('./userModel');

const { HTTP401Error } = require('../../utils/httpErrors');

exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (e) {
    throw e;
  }
};

exports.findUser = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (e) {
    throw e;
  }
};

exports.isUser = async ({ email, password }) => {
  try {
    const [user] = await User.find({ email });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
    throw new HTTP401Error();
  } catch (e) {
    throw e;
  }
};
