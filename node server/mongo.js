const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/react-login")
.then(()=>{
    console.log('mongodb connected')
})
.catch((error)=>{
    console.error('MongoDB connection failed:', error);
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

const coll=mongoose.model('coll',newSchema)
const coll_1=mongoose.model('coll_1',newSchema_1)
module.exports={coll,coll_1}
// export default {collection,collection_1};