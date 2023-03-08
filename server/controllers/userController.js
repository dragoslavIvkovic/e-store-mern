const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const newUser = await User.create(req.body);

      res.json(newUser);
    } else {
      res.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUserControl = async(req,res) => {
  const {email, password} = req.body;

  const findUser = await User.findOne({ email });

  if ( findUser && (await findUser.isPasswordMatched(password))) {
    res.json(findUser);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { createUser, loginUserControl };
