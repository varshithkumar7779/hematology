const {coll,coll_1,coll_2}=require('./mongo')
// import {collection,collection_1} from './mongo'
const express=require('express');
const cors=require('cors');
const multer = require('multer');
const {spawn} = require('child_process');
const path=require('path');
const app=express();

app.use(express.json());
app.use(cors());
const nodemailer = require('nodemailer');
const twilio = require('twilio');
var otpres = '';
var email_value='';

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Full absolute path to the uploaded file
  const imagePath = path.join(__dirname, 'uploads', req.file.filename);

  const pythonPath = path.join(__dirname, 'dl.py');

  // Spawn Python process
  const py = spawn('python', [pythonPath, imagePath]);

  let output = ""; // accumulate all stdout here

  py.stdout.on('data', (data) => {
    output += data.toString(); // append chunks
  });

  py.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  py.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Python script error' });
    }

    try {
      // keep only the last line (JSON)
      const lastLine = output.trim().split("\n").pop();
      const parsed = JSON.parse(lastLine);
      console.log("✅ Parsed JSON:", parsed);
      res.json(parsed);
    } catch (err) {
      console.error('❌ Parse error:', err.message, "OUTPUT:", output);
      res.status(500).json({ error: 'Invalid response format' });
    }
  });

});



app.post('/values',async(req,res) => {
  let data1 = '';
  const{Gender,Hemoglobin,MCH,MCHC,MCV,opt}=req.body;
  var py = spawn('python',['knn_aneamia.py',Gender,Hemoglobin,MCH,MCHC,MCV,opt]);
  py.stdout.on('data',(data) => {
      data1 += data.toString();
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
    })
    .catch((error) => {
      console.error(error);
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
        const check=await coll.findOne({email:email,password:password})
        if(check){
          const { name, number } = check;
          res.json({ status: "exist", name: name, number: number,email:email,password:password});        }
        else{
            res.json({ status: "notexist" })
        }
     }
     catch(e){
        res.json({ status: "notexist" })
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

app.listen(8000,()=>{
    console.log("server running")
})