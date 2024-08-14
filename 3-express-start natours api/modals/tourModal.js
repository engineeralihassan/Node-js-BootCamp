const mongoose= require('mongoose');

const tourSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true,
        trim:true,
        minlength:[10,'A tour must have more then 10 charecters']
    },
    duration:{
        type:Number,
        required:[true,'A Tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A Tour must have a Group size']
    },
    difficulty:{
        type:String,
        required:[true,'A Tour must have a difficulty'],
        enum:{
            values:['easy','medium','difficult'],
            message:'Difficulty is one of them [easy,medium,difficult'
        }
    },
    ratingsAverage:{
        type:Number,
      default:4.5,
      min:[1,'Rating must be atleast 1'],
      max:[5,'Rating must be maximum 5']
    },
    ratingsQuantity:{
        type:Number,
      default:0
    },
    rating:{
        type:Number,
      default:4.5
    },

    price:{
        type:Number,
        required:[true,'A tour must have a price'],
        
    },

    priceDiscount:{
        type:Number,
    },
    summry:{
        type:String,
        trim:true
    },
    description:{
        type:String,
     trim:true
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have an cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDates:[Date]


},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
});
// Agregate middle ware 


const Tour= mongoose.model('Tour',tourSchema);

module.exports=Tour;