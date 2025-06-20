const { text } = require('express');
const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/react-login")
.then(()=>{
    console.log('mongodb connected')
})
.catch((error)=>{
    console.error('MongoDB connection failed:', error);
});

const ImageDetailsSchema = new mongoose.Schema({
        image:{
            type:String
        }
});

const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const newSchema_1=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Gender:{
        type:Number,
        required:true
    },
    Hemoglobin:{
        type:Number,
        required:true
    },
    MCH:{
        type:Number,
        required:true
    },
    MCHC:{
        type:Number,
        required:true
    },
    MCV:{
        type:Number,
        required:true
    },
    Result:{
        type:Object,
        required:true
    },
    GroundTruth:{
        type:Number
    }
})

const bloodBankSchema = new mongoose.Schema({
    bloodbankname: {
        type: String,
        required: true
    },
    address: {
        streetAddress: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    availability: {
        "A+": {
            type: Number,
            required: true
        },
        "A-": {
            type: Number,
            required: true
        },
        "B+": {
            type: Number,
            required: true
        },
        "B-": {
            type: Number,
            required: true
        },
        "AB+": {
            type: Number,
            required: true
        },
        "AB-": {
            type: Number,
            required: true
        },
        "O+": {
            type: Number,
            required: true
        },
        "O-": {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        required: true
    },
    type: {
        type: String,
        enum: ['Government', 'Private'],
        required: true
    }
});
const bloodbank=mongoose.model('bloodbank',bloodBankSchema)
const coll_2=mongoose.model('coll_2',ImageDetailsSchema)
const coll=mongoose.model('coll',newSchema)
const coll_1=mongoose.model('coll_1',newSchema_1)
module.exports={coll,coll_1,coll_2,bloodbank}
//export default {collection,collection_1};