const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const auth = require("../middlewares/auth");
const Gravatar = require("gravatar");
router.post("/", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const gravatar = Gravatar.url(
        email,
        { s: "200", r: "pg", d: "retro" },
        false
      );
      if (!name || !email || !password) {
        return res.send("Please Fill all  your details");
      } else {
        const isExisted = await User.findOne({ email });
        if (isExisted) {
          return res.send("This email is already registered");
        } else {
          
          const user = new User({ name, email, password, gravatar });
          //bcrypt the password
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password,salt); //password hashed
          //jwt payload
          const payload = {
            user: {
              id: user.id,
            },
          };
          //jwt sign
          jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              else {
                return res.json({ token });
              }
            }
          );
          
          await user.save();
          
        }
      }
    } catch (error) {
      console.log("Server Error : ", error.message);
      res.send("Server Error");
    }
  }
  );
router.post("/login", async(req,res)=>{
    try {
       const{email,password} = req.body;
       if(!email || !password){return res.send('Please fill all the details')}
       else{
        const user = await User.findOne({email});
        if(!user){return res.send('There is no such email existed')}
        else{
            //compare passwords
            bcrypt.compare(password,user.password , (err,data)=>{
                if(err) throw err;
                if(!data){res.send('Your credentials were wrong')}
                else{
                    //send jwt token
                    const payload = {
                        user: {
                          id: user.id,
                        },
                      };
                      //jwt sign
                      jwt.sign(
                        payload,
                        process.env.jwtSecret,
                        { expiresIn: 36000 },
                        (err, token) => {
                          if (err) throw err;
                          else {
                            res.json({ token });
                          }
                        }
                      );
                      
                }
            })
        }
       }
    } catch (error) {
        console.log("Server Error : ", error.message);
        res.send("Server Error");
    }
}
);

//@route    GET /api/auth
//@desc     Get current logged in user details
//@access   Public

router.get('/', auth,async(req,res)=>{
  try {
    const user = await User.findOne({_id : req.user.id});
    if(!user){return res.send('not found')}
    else{
      return res.json(user);
    }
  } catch (error) {
    console.log("Server Error : ", error.message);
    res.send("Server Error");
  }
})

module.exports = router;