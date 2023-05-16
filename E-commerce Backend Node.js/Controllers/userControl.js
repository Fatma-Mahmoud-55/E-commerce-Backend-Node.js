const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { promisify } = require("util");

// create new user (register)
async function createUser(req, res, next) {
  try {
    var newUser = await userModel.create(req.body);
    console.log(req.body);
    res.status(200).json(newUser);
    if (newUser.password) {
      var salt = await bcrypt.genSalt(10);
      var hashedPass = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPass;
    }
    // console.log(newUser)
    next();
    console.log(res);
  } catch (err) {
    res.status(422).json(err.message);
  }
}

// update user by id
async function updateUser(req, res, next) {
  try {
    var id = req.params.id;
    const newData = req.body;
    console.log(newData.password);
    if (newData.password) {
      var salt = await bcrypt.genSalt(10);
      var hashedPass = bcrypt.hashSync(newData.password, salt);
      newData.password = hashedPass;
    }
    console.log(id);
    await userModel.findByIdAndUpdate(id, { $set: newData });
    res.status(200).json({ status: "success", newData });

    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
}
//reset password
async function updateUserPass(req, res, next) {
  try {
    const email = req.body.email;
    const newData = req.body;
    console.log(newData.password);

    if (newData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = bcrypt.hashSync(newData.password, salt);
      newData.password = hashedPass;
    }

       // console.log(email);
    const user = await userModel.findOneAndUpdate({ email }, { $set: newData }, { new: true });
    res.status(200).json({ status: "success", user });
    // res.end();
    // next();
  } catch (err) {
    res.status(500).json(err.message);
  }
}









//get all users
async function getAllUsers(req, res, next) {
  try {
    const allUsers = await userModel.find();
    var users = allUsers.filter((user)=>{
      return (!user.isDeleted)
    })
    if (users.length > 0){
    res.status(200).json(users);
  } else {
    res.json({msg : "No users found"})
  }
  } catch (err) {
    res.status(500).json(err.message);
  }
}




//get count users
async function getCountUsers(req, res, next) {
  try {
    const users = await userModel.find();
    const count = users.length;
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}







//get by id
async function getUserById(req, res, next) {
  try {
    var id = req.params.id;
    const receivedUser = await userModel.findById(id);
    if(!receivedUser.isDeleted){
    res.status(200).json(receivedUser);
  }else{
    res.json({msg : `no user found for this id :  ${id}`});
  }
  } catch (err) {
    res.status(422).json({ status: "failed", message: `${err.message}` });
  }
}

//delete by id
async function deleteUser(req, res) {
  var id = req.params.id;
  var deletedBody = req.body
  try {
    
    var deletedUser = await userModel.findByIdAndUpdate(id, deletedBody);
    // console.log(deletedUser);
    // console.log("deletedUser");
    if(!deletedUser || deletedUser.isDeleted){
      res.status(404 ).json({msg: `no user for this id ${id}`})
    }
    else {
      if (deletedUser.isAdmin === true) {
        // console.log('heere');
        res.json({msg:"you can't delete admin user"});
      } else{
        deletedBody.isDeleted = true;
        deletedUser = await userModel.findByIdAndUpdate(id, deletedBody);
        res.status(200).json({msg:" user deleted successfully"});
      }
    }
  } catch (err) {
    res.status(422).json({ status: "failed", message: `${err.message}` });
  }
}

// Login

async function login(req, res) {
  var { email, password } = req.body;
  var user = await userModel.findOne({ email }); // {email:email}
  if (user) {
    var valid = bcrypt.compareSync(password, user.password);
    if (valid) {
      // generate Token
      var token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json(token);
      console.log(token);
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } else {
    res.status(401).end();
  }
}

//ADMIN LOGIN
async function adminLogin(req, res, nex) {
  try {
    const { email, password } = req.body;
    var admin = await userModel.findOne({ email }); //{ email: email }
    if (admin) {
      var valid = bcrypt.compareSync(password, admin.password);
      if (valid) {
        var token = jwt.sign(
          {
            isAdmin: admin.isAdmin == true,
            adminId: admin.id,
          },
          process.env.SECRET,
          {
            expiresIn: "24h",
          }
        );
        // res.json({ ...admin._doc, accessToken: token });
        res.json({ accessToken: token });
      } else {
        res.status(401).json("please insert correct pass");
      }
    } else {
      res.status(401).json("please insert correct email");
    }
  } catch (err) {
    res.status(422).json(err.message);
  }
}

//LOGOUT
async function Logout(req, res, next) {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      $set: { isActive: false },
    });
    res.status(200).json("successfully logout");
  } catch (err) {
    res.status(422).json(err.message);
  }
}

// const protect = async () => {
//   try {
//     let token;
//     let reqHeaders = req.headers.authorization;
//     let bearerheders = req.headers.authorization.startswith("Bearer");
//     //token exist
//     if (reqHeaders && bearerheders) {
//       token = reqHeaders.split(" ")[1];
//     }
//     if (!token) {
//       return res.status(422).json(err.message);
//     }
//     //verifcation token
//     let decoded;
//     try {
//       decoded = await promisify(jwt.verify)(token, process.env.SECRET);
//     } catch (error) {
//       if (error.name === "JsonWebTokenError") {
//         return res.status(401).json("invalid token");
//       } else if (error.name === "TokenExpiredError") {
//         return res.status(401).json("your session has expired !! Login again");
//       }
//     }
//     //check if user still exists
//     const curruntUser=await userModel.findById
//   } catch (err) {}
// };

module.exports = {
  createUser,
  login,
  deleteUser,
  adminLogin,
  getUserById,
  Logout,
  getAllUsers,
  getCountUsers,
  updateUser,
  updateUserPass,
  //   protect,
};
