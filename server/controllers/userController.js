const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const newUser = await User.create(req.body);

      res.json(newUser);
    } else {
      throw new Error('User already exists');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createUser };
