const bcrypt = require("bcrypt");

// hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// compare password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
