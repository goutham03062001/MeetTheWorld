const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Profile = require("../models/UserProfile");

//@route    POST /api/profile
//@desc     create profile
//@access   auth
router.post("/",auth,async(req,res)=>{
    try {
        const{location,interests,gender,bio} = req.body;

        //build an object
        const Obj = {};
        Obj.location = location;    
        if(interests){
            Obj.interests = interests.split(",").map(ele => ele.trim());
        }
        Obj.gender = gender;
        Obj.bio = bio;
        Obj.user = req.user.id;

        //create a new profile
        const profile = new Profile(Obj);
        profile.save();
        res.json({message : "Profile Created" , profile})
    } catch (error) {
        console.log('Server Error : ',error.message);
        res.send('Server Error')
    }
});



//@route    GET /api/profile
//@desc     create profile
//@access   private
router.get("/", auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user : req.user.id});
        if(!profile){return res.status(404).send('No Profile found')}
        else{
            return res.send(profile);
        }
    } catch (error) {
        console.log('Server Error : ',error.message);
        res.send('Server Error')
    }
});


//@route     GET /api/profile/all
//@desc      get all profiles
//@access    private
router.get("/all",auth,async(req,res)=>{
    try {
        const profiles = await Profile.find();
        return res.send(profiles);
    } catch (error) {
        console.log('Server Error : ',error.message);
        res.send('Server Error')
    }
})

//@route    GET /api/profile/:id
//@desc     get profile by id
//@access   Private
router.get("/:id",auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user : req.params.id});
        if(!profile){
           return res.status(404).send('No Profile Found')
        }
        else{
            return res.send(profile);
        }
    } catch (error) {
        console.log('Server Error : ',error.message);
        res.send('Server Error')
    }
})

//get only required users

//@route    GET /api/profile/filter/
//@desc     get based on filter
//@access   Private
router.get("/filter/profiles", auth, async(req,res)=>{
    try {
        const {location,gender} = req.body;
        const profiles = await Profile.find({location,gender});
        if(!profiles){
            res.send('no profiles matched filter');
        }
        else{
            res.send(profiles);
        }
    } catch (error) {
        console.log('Server Error : ',error.message);
        res.send('Server Error')
    }
})
module.exports = router;