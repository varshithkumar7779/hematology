const express=require('express')
const {coll,coll_1}=require('./mongo')
// import {collection,collection_1} from './mongo'
const cors=require('cors')
var nodemailer = require('nodemailer');
const twilio = require('twilio');
const {spawn} = require('child_process');  


const app=express() 
app.use(express.json())
app.use(cors())
var otpres = '';
var email_value='';

app.post('/values',async(req,res) => {
  let data1 = '';
  const{Gender,Hemoglobin,MCH,MCHC,MCV,opt}=req.body;
  var py = spawn('python',['./node server/knn_aneamia.py',Gender,Hemoglobin,MCH,MCHC,MCV,opt]);

  py.stdout.on('data',(data) => {
      data1 += data.toString();
  });

  
  py.stderr.on('data',(data) => {
    console.error(`Error from Python script: ${data}`);
    res.status(500).send('Internal Server Error');
  });

  py.on('close',async(code) => {
    console.log('code', code);
    data1 = JSON.parse(data1)
    if(code === 0){
      var data2={
        email:JSON.stringify(email_value),
        Gender:Gender,
        Hemoglobin:Hemoglobin,
        MCH:MCH,
        MCHC:MCHC,
        MCV:MCV,
        Result:data1,
        GroundTruth:data1.GroundTruth
      }
      try{
        await coll_1.insertMany([data2]);
        res.json(data1.response);
      }
      catch(e){
        console.log(e)
        res.status(500).send('error storing values');
      }
    }
    else{
      res.status(500).send('Internal Server Error');
    }
  });
});

app.post('/otpnum', (req, res) => {
  const accountSid = 'AC90ea98ae7efa00cb6257de44bf51a43e';
  const authToken = '2da78e780f8161d342f8e196d0b5b174';
  const client = new twilio(accountSid, authToken);
  const{number}=req.body
  try{
    var a1 = Math.floor(100000 + Math.random() * 900000);
    client.messages.create({
      body: `Your OTP is ${a1} for the verification of Mykart`,
      from: '+13344384929',
      to:`+91${number}`,
    })
    .then((message) => {
      console.log(message);
      //res.json({ success: true, message: 'OTP sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      //res.json({ success: false, message: 'Failed to send OTP' });
    });

    otpres=a1;
  }
  catch(error){
    console.error(error);
    otpres=100;
}
  });




app.post("/otp",async(req,res)=>{
  const{email}=req.body
  try{
    var a = Math.floor(100000 + Math.random() * 900000);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'five32149@gmail.com',
        pass: 'pbpg ztpl oopf sgpv'
      }
    });
    
    var mailOptions = {
        from: 'five32149@gmail.com',
        to: email.toString(),
        subject: 'OTP verification form Mykart',
        text: a.toString()
    };
    await transporter.sendMail(mailOptions);
    otpres=a;
  }
  catch(error){
    console.error(error);
    otpres=100;
}
  });

app.post("/Login",async(req,res)=>{
     const{email,password}=req.body
     email_value=email;

     try{
        const check=await coll.findOne({email:email})
        const check_1=await coll.findOne({password:password})
        if(check&&check_1){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }
     }
     catch(e){
        res.json("notexist")
     }
})


app.post("/Signup",async(req,res)=>{
    const{name,number,email,password,otp}=req.body
    email_value=email;
    const data={
        name:name,
        number:number,
        email:email,
        password:password
    }
    try {
        const check = await coll.findOne({ email: email })
        if (!check) {
          if (otp && otp.toString() === otpres.toString()) {
            await coll.insertMany([data])
            res.json('notexist');
          } 
          else{
            res.json('otpfailed');
          }
        } 
        else{
          res.json('exist');
        }
      } 
    catch(e){
        res.json('error occured');
      }
})

app.get("/fgh",(req,res)=>{
  console.log(coll.findOne())
})

app.listen(8000,()=>{
    console.log("server running")
})