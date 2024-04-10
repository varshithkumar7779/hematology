const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://varshithkumar:varshithkumar@cluster0.0s05k7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
const newSchema1=new mongoose.Schema({
    Location:{
        type:String,
        required:true
    },
    Size:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
})
const newSchema2=new mongoose.Schema({
    Location:{
        type:String,
        required:true
    },
    Size:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
})
const coll=mongoose.model('coll',newSchema)
const coll_1=mongoose.model('coll_1',newSchema1)
const coll_2=mongoose.model('coll_1',newSchema2)
module.exports={coll,coll_1,coll_2}
// export default {collection,collection_1};