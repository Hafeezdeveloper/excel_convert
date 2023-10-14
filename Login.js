const express = require("express")
const { sendResponse } = require("../Helper/Helper")
const routers = express.Router()
const bcrypt = require('bcrypt');
const { userModel, optModel } = require("../Models/UserSchema");
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const otpGenerator = require('otp-generator')
const { config } = require("dotenv");
var jwt = require('jsonwebtoken');
const Authent = require("../Contollers/Authent");
const { ObjectId } = require("mongodb");
const stringHash = require("string-hash");
const moment = require("moment");
// routers.get('/:getUser/user', async (req, res) => {
//     //here  /:getUser ==> this is for just showing purpose 

//     try {
//         let result = await userModel.find({
//             $nor: [
//                { name:  "lol"  },
//                { _number:req.params._id }
//             ]
//          } )

//         if (!result) {

//             res.send(sendResponse(false, result, "result Not Found", "error")).status(500)
//         } else {
//             res.send(sendResponse(false, result, "result Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })

routers.put('/:getUser', async (req, res) => {
    try {
        let result = await userModel.findById(req.params.getUser)

        if (!result || result.length === 0) {
            res.status(404).send(sendResponse(false, result, "Result Not Found", "error"));
        } else {
            let update = await userModel.updateOne(
                { _id: result._id }, { $set: { number: new Date() } }
            )
            res.status(200).send(sendResponse(true, update, "Result Found", "success"));
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("An error occurred");
    }
});

// ..

// routers.post('/signUp', async (req,res) =>{
//     try{
//     let users = userModel.find({})
//     if(!users){
//         res.send(sendResponse(false,users,'data not found',"error")).status(404)
//     }else{
//         res.send(sendResponse(true,users,'data found',"sucess")).status(200)
//     }    
//     }catch(e){
//         console.log(e)
//     }
// })

routers.post('/signUp', Authent.signUp)

routers.post('/login', Authent.login)


routers.get("/protect", Authent.protect)

// routers.use(function (req, res, next) {

//     try {
//         if (!req.cookies.token) {
//             res.send(sendResponse(true, null, "userUnValid", "Cookie required")).status(400)
//         } else {

//             let verif = jwt.verify(req.cookies.token, process.env.SECURE_KEY, (err, decoded) => {
//                 if (err) {
//                     res.send(sendResponse(true, err, "UnValid User", "error"))
//                 } else {
//                     var isueData = new Date().getTime() / 1000;
//                     console.log("decoded", decoded)

//                     if (decoded.exp < isueData) {
//                         res.send(sendResponse(false, null, "Token Expires", "cause Error")).status(400)
//                     } else {
//                         req.body.token = decoded
//                         // console.log("ffffff",req.body.token )
//                         next()

//                     }
//                 }
//             });

//             console.log("valid userrrs", req.cookies.token)

//         }
//     } catch (e) {
//         console.log(e)
//     }
// })

// // routers.get('/protected' , Authent.protected, async (req,res) =>{
// //     try{
// //         res.send(sendResponse(true,null,"userValid","sucess"))
// //     }catch(e){
// //         console.log(e)
// //     }
// // })  


// // It will Run as a PipeLine 1 SignUp and then Login 

routers.get("/users", async (req, res) => {

    try {
        let results = await userModel.findOne({ _id: req.body.token.result._id })
        if (!results) {
            res.send("result not found")

        } else {
            res.send(sendResponse(true, results, "result Found", "sucess")).status(200)
        }
    } catch (error) {
        console.log(error)
    }
})

// insert manay Docunment
// routers.post("/checking", async (req, res) => {

//     try {
//         let result = await userModel.insertMany([
//             {
//                 name: 'Ax', 
//                 email: "abc@gmail.com",
//                 password: "waqar",
//                 number:1
//             },
//             {
//                 name: 'Bx',
//                 email: "xyz@gmail.com",
//                 password: "waqar",
//                 number:2
//             }, {
//                 name: 'Cx',
//                 email: "ghq1@gmail.com",
//                 password: "waqar",
//                 number:3
//             }, {
//                 name: 'Dx',
//                 email: "por@gmail.com",
//                 password: "waqar",
//                 number:4
//             }, {
//                 name: 'Ex',
//                 email: "awda@gmail.com",
//                 password: "waqar",
//                 number:5
//             },
//         ])
//         if (!result) {
//             res.send("result not found")
//         } else {
//             res.send(sendResponse(true, result, "result Found", "sucess")).status(200)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })

// it automatically give  bultin array
// routers.post('/checkingtwo', async (req, res) => {
//     let { name , email , password} = req.body
//     let obj = {name , email , password}
//     // const result = await userModel.count() 
//     try {
//         let result = await userModel.insertOne(obj)

//         if (!result) {
//             res.send(sendResponse(false, result, "result Not Found", "error")).status(500)
//         } else {
//             res.send(sendResponse(false, result, "result Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })
routers.post("/checkingteo", async (req, res) => {
    let { name, email, password } = req.body;
    let obj = { name, email, password };

    try {
        // let result = await userModel.insertOne(obj);
        let result = userModel.insertOne(obj);
        result.save()
        if (!result) {
            res.status(500).send("Result not found");
        } else {
            res.status(200).send({
                success: true,
                data: result,
                message: "Result found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

routers.post("/forgetPassword", async (req, res) => {
    console.log(req.files)
    console.log(req.file)
    let { email } = req.body;
    let errArr = []
    try {
        if (!email) {
            errArr.push("email required")
        }

        if (errArr.length > 0) {
            res.send("enail req")
        } else {

            let findEmail = await userModel.findOne({
                email: [email],
            })


            if (findEmail) {
                let otpGen = otpGenerator.generate(4,
                    {
                        digits: true, upperCaseAlphabets: false, specialChars: false
                    }
                );
                console.log(otpGen)
                if (!otpGen) {
                    res.send("Not Generate Otp");
                } else {
                    let strHash = await bcrypt.hash(otpGen, 4)
                    console.log(strHash)
                    if (!strHash) { res.send("pass not hassed") }

                    let saveOtp = await optModel.create({
                        email: findEmail.email,
                        otp: strHash
                    })

                    if (!saveOtp) {
                        res.status(500).send("Not Save");
                    } else {
                        console.log(saveOtp)
                        res.status(200).send("Save ");

                    }
                }
            } else {
                res.status(500).send("Email Not found");
            }

            console.log(findEmail)

        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


routers.post("/forgetPassword/verify", async (req, res) => {
    let { email, otpCode, password } = req.body;
    let errArr = []
    try {
        if (!email) {
            errArr.push("email required")
        }

        if (errArr.length > 0) {
            res.send("enail req")
        } else {

            let findEmail = await optModel.findOne({
                email: [email],
            }).sort({ _id: -1 })


            console.log("findEmail", findEmail)
            if (findEmail.isActive) {
                res.status(500).send("Otp Invalid");
            } else {
                let compareOtp = await bcrypt.compare(otpCode, findEmail.otp)
                if (compareOtp) {

                    let passhashed = await bcrypt.hash(password, 10)
                    if (passhashed) {
                        let now = moment()
                        console.log("now", now)
                        let otpTime = moment(findEmail.createOn)
                        let differ = now.diff(otpTime, "minutes")
                        console.log("differ : ", differ)
                        if (differ > 2) {
                            res.send("Put code before 2  min")
                        } else {

                            let updatePass = await userModel.updateOne(
                                {email: findEmail.email},
                                {password: req.body.password}
                            )
                            let alsoUpdate = await findEmail.updateOne({ isActive: true })
                            if (updatePass) {
                                res.send("update Sucessfully")
    
                            } else {
                                res.send("not update")
                            }
                        }
                    } else {
                        res.send("password not hashed")
                    }

                } else {
                    res.status(500).send("Otp Nt match");
                }

            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});





module.exports = routers    