const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Profile = require("../models/UserProfile")
const Letter = require("../controllers/sendLetter");

//@route    POST /:user_id
//@desc     send a new letter 
//@access   Private
router.post("/:userId" , auth, async(req,res)=>{
    try {
        const {letterBody} = req.body;
        
        if(!letterBody) {res.send('Please write something in the letter')}
        if(letterBody.length<20){
            res.send("Please write more than 20 letters")
        }
        else{
            //store this letterBody in the received array of the targeted user
            const receiverId = req.params.userId;
            const receivingUser = await Profile.findOne({user : receiverId});
            //build an object
            const receiverObj = {};
            receiverObj.letter = letterBody;
            receiverObj.user = req.user.id;
            

            //update the sender sent property
            const currentUser = await Profile.findOne({user : req.user.id});
            const currUserObj = {};
            currUserObj.user = receiverId;
            currUserObj.letter = letterBody;
            currentUser.sent.unshift(currUserObj);
            receivingUser.received.unshift(receiverObj);
            await receivingUser.save();
            //send a response to send
            await currentUser.save();
            res.json({message : "Letter Sent Successfully", currentUser});

        }
    } catch (error) {
        console.log('Server Error: ',error.message);
        res.send('Server Error');
    }
});


//@route    GET /:letter_id
//@desc     Get a letter by id 
//@access   Private
router.get("/:letter_id", auth, Letter.getLetter);


//@route    DELETE /:letter_id
//@desc     Delete a letter by id 
//@access   Private
router.delete("/:letter_id", auth, Letter.deleteLetter);
module.exports = router;