const { generateToken } = require('../config/jwtTokken');
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
    res.json({
      _id:findUser?._id,
      firstName:findUser?.firstName,
      lastName:findUser?.lastName,
      email:findUser?.email, 
      mobile:findUser?.mobile,
      token:generateToken(findUser?._id)

    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Get all users

const getAllUsers = async(req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error)
  }
}

const getUser = async(req, res) => {
 console.log(req.params);
  const {id} = req.params;
  try {
    const getUser = await User.findById(id);
    res.json({
      getUser,
    })
    
  } catch (error) {
    throw new Error(error)
  }
}

const deleteUser = async(req, res) => {
  console.log(req.params);
   const {id} = req.params;
   try {
     const deleteUser = await User.findByIdAndDelete(id);
     res.json({
      deleteUser,
     })
     
   } catch (error) {
     throw new Error(error)
   }
 }

 const updateUser = async(req, res) => {
  console.log(req.params);
   const {id} = req.params;
   try {
     const updateUser = await User.findByIdAndUpdate(id,{
     firstName: req?.body?.firstName,
     lastName:req?.body?.lastName,
     email:req?.body?.email,
     mobile:req?.body?.mobile,
     },{
      new: true,
     });
     res.json(updateUser )
     
   } catch (error) {
     throw new Error(error)
   }
 }


 
module.exports = { createUser, loginUserControl, getAllUsers, getUser, deleteUser, updateUser};
