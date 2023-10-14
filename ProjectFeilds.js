const express = require("express")
const { sendResponse } = require("../Helper/Helper")
const { config } = require("dotenv");
const FeildModel = require("../Models/ProjectSchema");
const { findById, populate } = require("../Models/UserSchema");
const { default: mongoose } = require("mongoose");
const feildRouters = express.Router()
const ExcelJS = require('exceljs');

feildRouters.post('/generate-excel', (req, res) => {
  let {data } = req.body
  try {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');
    worksheet.columns = [
      { header: 'Name', key: "name", width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Age', key: 'age', width: 10 },
    ];

    data.map( (x) =>{
      worksheet.addRow(x);
    })
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    workbook.xlsx.write(res).then(() => {
      res.end();
    });

  } catch (error) {
      console.log(error)
  }
})

//insertManay
// feildRouters.post("/post", async (req,res) =>{
//     try{
//         let result = await FeildModel.insertMany([
//             {
//                 name:"hafeez",
//                 status:"A",
//                 number:"1"
//             },
//             {
//                 name:"wahab",
//                 status:"B",
//                 number:"2"
//             },
//             {
//                 name:"saboor",
//                 status:"C",
//                 number:"3"
//             },
//             {
//                 name:"Ammaz",
//                 status:"D",
//                 number:"4"
//             },
//             {
//                 name:"haris",
//                 status:"E",
//                 number:"5"
//             },
//         ])
//         if(!result){
//             res.send(sendResponse(false,null,"Data Not Found","error")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"Data  Found","sucess")).status(200)
//         }
//     }catch(e){
//         console.log(e)
//     }
// })

// put update manay bu using manay update
// feildRouters.put("/put", async (req,res) =>{
//     try{
//         let result = await FeildModel.updateMany(
//             {number:"3"} ,
//             {$set:{number:"a"} })
//         if(!result){
//             res.send(sendResponse(false,null,"Data Not Found","error")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"Data  Found","sucess")).status(200)
//         }
//     }catch(e){
//         console.log(e)
//     }
// })


//  name which is equal to 
// feildRouters.get("/get", async (req,res) =>{
//     try{
//         let result = await FeildModel.find(
//             //eq represent which is equal to 
//             {name:{$eq:"haris"} }
//             )
//         if(!result){
//             res.send(sendResponse(false,null,"Data Not Found","error")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"Data  Found","sucess")).status(200)
//         }
//     }catch(e){
//         console.log(e)
//     }
// })


//get number greateer than equal to 
// express like  number >= $gte "condition"

//update one by one
// feildRouters.put("/put", async (req,res) =>{
//     try{
//         let result = await FeildModel.updateOne(
//             {number:"5"},
//             {$set:{number:"..1"}}       
//             )
//         if(!result){
//             res.send(sendResponse(false,null,"Data Not Found","error")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"Data  Found","sucess")).status(200)
//         }
//     }catch(e){
//         console.log(e)
//     }
// })

// increment hoga number if user exist uska number inc barha do
// feildRouters.put("/put", async (req,res) =>{
//     try{
//         let result = await FeildModel.updateOne(
//             { name: "ghq1" }, // Query condition
//             { $inc: { number: 1 } }, // Update operation, incrementing the "number" field by 1
//           );

//         if(!result){
//             res.send(sendResponse(false,null,"Data Not Found","error")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"Data  Found","sucess")).status(200)
//         }
//     }catch(e){
//         console.log(e)
//     }
// })

//second last schema
//  feildRouters.post("/post", async (req,res) =>{
//     let {name,age} = req.body
//     try{
//         let obj = {name:name,
//             data:{
//             age:age
//         }}
//         let result =  FeildModel(obj)
//         await result.save()

//         if(!result){
//             res.send(sendResponse(false,null,"Data Not Found","error")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"Data  Found","sucess")).status(200)
//         }
//     }catch(e){
//         console.log(e)
//     }
// })

// feildRouters.post("/post", async (req, res) => {
//     let { name, age } = req.body
//     try {
//         let obj = {
//             qualification: [
//                 {   
//                     degree:"xxx",
//                     school:"xxxs"
//                 }
//             ]
//         }
//         let result = FeildModel(obj)
//         await result.save()

//         if (!result) {
//             res.send(sendResponse(false, null, "Data Not Found", "error")).status(400)
//         } else {
//             res.send(sendResponse(true, result, "Data  Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })

// feildRouters.post("/postarr", async (req, res) => {
//     try {
//         let result = FeildModel({ hobbies: ["awawd","Awd","awdwa"]})
//         await result.save()

//         if (!result) {
//             res.send(sendResponse(false, null, "Data Not Found", "error")).status(400)
//         } else {
//             res.send(sendResponse(true, result, "Data  Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })

// feildRouters.get("/get", async (req, res) => {
//     try {
//         let result = await FeildModel.find({}).sort({_id: -1})
//         console.log(result)
//         if (!result) {
//             res.send(sendResponse(false, null, "Data Not Found", "error")).status(400)
//         } else {
//             res.send(sendResponse(true, result, "Data  Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })

// feildRouters.get("/get", async (req, res) => {
//     try {
//         let result = await FeildModel.find({}).sort({_id: -1})
//         console.log(result)
//         if (!result) {
//             res.send(sendResponse(false, null, "Data Not Found", "error")).status(400)
//         } else {
//             res.send(sendResponse(true, result, "Data  Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })
// //  ---------------------Post ------------------
// feildRouters.post("/postarr", async (req, res) => {
    
//     try {
//         let result = FeildModel(req.body)
//         await result.save()

//         if (!result) {
//             res.send(sendResponse(false, null, "Data Not Found", "error")).status(400)
//         } else {
//             res.send(sendResponse(true, result, "Data  Found", "sucess")).status(200)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })

// feildRouters.put("/postarr/:postuserList", async (req, res) => {
//     let {name} = req.body
//     try {
//         let id = req.params.postuserList
//         let idresult = await FeildModel.findById(id)
//             console.log(idresult)
//         if(!idresult){
//             res.send("errr")
//         }else{
//             var obj = {
//                 name:"fuck",
//                 qualifuication:[
//                     {degree:"lllb"}
//                 ]
//             }
            
//             var abc  =  FeildModel(obj)
//              await abc.save()
//             res.send(sendResponse(false,abc, "Data Save", "sucess")).status(200)
//         }

//     } catch (e) {
//         console.log(e)
//     }
// })

//List create Main
// feildRouters.post("/postlist", async (req, res) => {
//     let {name} = req.body
//     let obj = {name}
//     let arr = ["name"]
//     let errAqq = []
//     try {
//         arr.map( (x,i) =>{
//             if(!obj[x]){
//                 errAqq.push(x)
//                 console.log(x)
//             }
//              })
//              let saveObj = FeildModel(obj)
//                 await saveObj.save()
//             res.send(sendResponse(false,saveObj, "Data Save", "sucess")).status(200)

//     } catch (e) {
//         console.log(e)
//     }
// })

// send nested Objects ny submit lisning
// const qualificationSchema = mongoose.Schema({
//     items:[{
//         school:  String,
//         collage: String ,
//         university: String ,
//     }]
// })

// const FeildsSchema = mongoose.Schema({
//     name: {
//         type: String,
//     },
//     qualification:[qualificationSchema]
    

// })

// feildRouters.post("/postlist/:postlistId", async (req, res) => {
//         // let {}
//     try {
//         let id = req.params.postlistId
//         let MainListItem = await FeildModel.findById(id)
//         if(!MainListItem){
//             // let ewSublist =   result.qualification(obj) 
//             res.send(sendResponse(false,"not" , "CANT", "error")).status(400)
//         }else{
//             let   newSubList = {
//                 title:"aqii",
//                 items:[
//                 {school:"abc"},
//                 {collage:"awd"},
//                 {university:"awd"},
//                 ]
//         }
//             MainListItem.qualification.push(newSubList);
//             const updatedMainItem = await MainListItem.save();
//             if(!updatedMainItem){
//                 res.send(sendResponse(false,"not update" , "CANT  Save", "error")).status(400)
//             }else{
//             res.send(sendResponse(true,updatedMainItem , "Data Save", "sucess")).status(200)
//             }

//         }

//     } catch (e) {
//         console.log(e)
//     }
// })
    // if more than 2 id tu aysay krna but if we want to get from URL then next wala procedure
// feildRouters.put("/postlist/:postlistIdedit/sublist/:sublistId", async (req, res) => {
        
//     let schoolName = "The Educator"
// try {
//     let id = req.params.postlistIdedit
//     let MainListItem = await FeildModel.findById(id)

//     if(!MainListItem){
//         res.send(sendResponse(false,"not" , "CANT", "error")).status(400)
//     }else{
        
//         const subList = await MainListItem.qualification.id("6505570adfe4fb98a1916c31");

//         if(!subList){
//             res.send("sublist not found")
//         }else{
//     let   sub2list =     subList.items.id("6505570adfe4fb98a1916c32")
//                 sub2list.school = schoolName
//                await MainListItem.save()
//             console.log(MainListItem)

//         }
        
//         //     let updatedMainItem = FeildModel.findByIdAndUpdate()
//         // if(!updatedMainItem){
//         //     res.send(sendResponse(false,"not update" , "CANT  Save", "error")).status(400)
//         // }else{
//         // res.send(sendResponse(true,updatedMainItem , "Data Save", "sucess")).status(200)
//         // }

//     }

// } catch (e) {
//     console.log(e)
// }
// })

// If we get Id From  URL 
// PUT route to update a sub-document within a FeildModel document
// feildRouters.put("/postlist/:postlistIdedit/sublist/:sublistId/obj/:objId", async (req, res) => {
//     try {
//       // Get the school name from the request body
//       let schoolName = "The Educator";
  
//       // Get the postlistIdedit from the URL parameter
//       let id = req.params.postlistIdedit;
  
//       // Find the MainListItem by its ID
//       let MainListItem = await FeildModel.findById(id);
  
//       // Check if MainListItem does not exist
//       if (!MainListItem) {
//         res.send(sendResponse(false, "not", "CANT", "error")).status(400);
//       } else {
//         // Get the sublistId from the URL parameter
//         let sublistIdz = req.params.sublistId;
  
//         // Find the subList within MainListItem by its ID
//         const subList = await MainListItem.qualification.id(sublistIdz);
  
//         // Check if subList does not exist
//         if (!subList) {
//           res.send("sublist not found");
//         } else {
//           // Get the objId from the URL parameter
//           let subsublistIdz = req.params.objId;
  
//           // Find the sub2list within subList by its ID
//           let sub2list = subList.items.id(subsublistIdz);
  
//           // Log the sub2list
//           console.log("sub2list : ", sub2list);
  
//           // Update the collage property of sub2list with the schoolName
//           sub2list.collage = schoolName;
  
//           // Save the changes to MainListItem
//           await MainListItem.save();
  
//           // Log the updated MainListItem
//           console.log("MainListItem : ", MainListItem);
//         }
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });
  
// This is wrong Way to get ID from URL
// feildRouters.put("/postlist/:postlistIdedit/sublist/:sublistId/obj/:objId", async (req, res) => {
//     try {
//       let schoolName = "The Educator";
  
//       let id = req.params.postlistIdedit;
  
//       let MainListItem = await FeildModel.findById(id);
  
//       if (!MainListItem) {
//         res.send(sendResponse(false, "not", "CANT", "error")).status(400);
//       } else {
//         const subList = await MainListItem.qualification.id(req.params.sublistId);
  
//         if (!subList) {
//           res.send("sublist not found");
//         } else {
//           let sub2list = subList.items.id(req.params.objId);
  
//           console.log("sub2list : ", sub2list);
  
//           sub2list.collage = schoolName;
  
//           await MainListItem.save();
  
//           console.log("MainListItem : ", MainListItem);
//         }
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });



// feildRouters.post("/postlist/:postlistId", async (req, res) => {
//     // let {}
// try {
//     let id = req.params.postlistId
//     let MainListItem = await FeildModel.findById(id)
//     if(!MainListItem){
//         // let ewSublist =   result.qualification(obj) 
//         res.send(sendResponse(false,"not" , "CANT", "error")).status(400)
//     }else{
       
//                  MainListItem.qualification.push({
//                     school:"awdwd",
//                     collage:"awdwd",
//                     university:"awdwd",
//                  });
//         const updatedMainItem = await MainListItem.save();
//         if(!updatedMainItem){
//             res.send(sendResponse(false,"not update" , "CANT  Save", "error")).status(400)
//         }else{
//         res.send(sendResponse(true,updatedMainItem , "Data Save", "sucess")).status(200)
//         }

//     }

// } catch (e) {
//     console.log(e)
// }
// })

// Array of Object
// feildRouters.post("/name/arryobj", async (req, res) => {
//     let {name,school,collage,university} = req.body
//     let obj = {name,school,collage,university}
//     let reqArr = ["name","school","collage","university"]
//     let errArr = []
    
// try {
//     reqArr.map((x,i) =>{
//         if(!obj[x]){
//             errArr.push(x)
//         }
//     })
//     console.log(req.body)
//     if(errArr.length > 0){
//         res.send(sendResponse(false,"null","not post","err")).status(400)
//     }else{
//         let result = FeildModel({
//             name:req.body.name,
//             qualification:[{
//                 school:req.body.school,
//                 collage:req.body.collage,
//                 university:req.body.university,
//             }]
//         })        
//         await result.save()
//         console.log("result", result)
//         if(!result){
//             res.send(sendResponse(false,"null","not post","err")).status(400)
//         }else{
//             res.send(sendResponse(true,result,"posted","succ")).status(200)

//         }
//     }

// } catch (e) {
//     console.log(e)
// }
// })

// Projection
// feildRouters.post("/name/arryobj/post", async (req, res) => {
// try {
  
//     // const result = await FeildModel.find({
//     //     name: "ss",
//     //     owner: "64fd824a9e3a8898ad39a4ab",
//     //     qualification: {
//     //       $elemMatch: {
//     //         school: "tring",
//     //         collage: "String",
//     //         university: "String"
//     //       }
//     //     }
//     //   }).populate("owner");

//     let result = await FeildModel({
//         name: 'ss',
//         owner: "64f23148e8f7c10f142649a6",
//         qualification: [
//           {
//             school: 'tring',
//             collage: 'String',
//             university: 'String',
//           }
//         ]
//       });
//          await result.save()
         
//          if(result){
//                const res = await FeildModel.find({_id:result._id}).populate("owner")
//            console.log("res", res)
//            console.log("result", result)

//         }
       
//     //    const populatedPost = await FeildModel.find({_id:result._id}).populate('owner');

//         // if(!result){
//         //     res.send(sendResponse(false,"null","not post","err")).status(400)
//         // }else{
//         //     res.send(sendResponse(true,result,"posted","succ")).status(200)
//         // }
// } catch (e) {
//     console.log(e)
// }
// })

feildRouters.get("/name/arryobj", async (req, res) => {
  try {
    
      // const result = await FeildModel.find({
      //     name: "ss",
      //     owner: "64fd824a9e3a8898ad39a4ab",
      //     qualification: {
      //       $elemMatch: {
      //         school: "tring",
      //         collage: "String",
      //         university: "String"
      //       }
      //     }
      //   }).populate("owner");
      const res = await FeildModel.find({_id:"65131918e8da8e1c521b32a2"}).populate("owner")
      
      // let result = await FeildModel.find({
      //     name: 'ss',
      //     owner: "64f23148e8f7c10f142649a6",
      //     qualification: [
      //       {
      //         school: 'tring',
      //         collage: 'String',
      //         university: 'String',
      //       }
      //     ]
      //   });
          //  await result.save()
           
           if(res){
             console.log("res", res)
            //  console.log("result", result)
  
          }
         
      //    const populatedPost = await FeildModel.find({_id:result._id}).populate('owner');
  
          // if(!result){
          //     res.send(sendResponse(false,"null","not post","err")).status(400)
          // }else{
          //     res.send(sendResponse(true,result,"posted","succ")).status(200)
          // }
  } catch (e) {
      console.log(e)
  }
  })

module.exports = feildRouters