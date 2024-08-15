const mongoose= require('mongoose');
const slugify= require('slugify');

const tourSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true,
        trim:true
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
        required:[true,'A Tour must have a difficulty']
    },
    ratingsAverage:{
        type:Number,
      default:4.5
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
    slug:{
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
    startDates:[Date],
    secrateTour:{
        type:Boolean,
        default:false,
    }


},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
});

// Like Express there are also middle wares for the mongo dB
// 1-Document middle ware runs befor the save or create
tourSchema.pre('save',function(next){
    this.slug= slugify(this.name,{lower:true});
    console.log("The Slug is",this.slug);
    next();
});

//  

// // post middle ware
// tourSchema.post('save',function(doc,next){
//  console.log(doc);
//     next();
// });

// QUERY MIDDLEWARES

tourSchema.pre(/^find/,function(next){
   this.find({secrateTour: {$ne:true}}) ;
   next();
});
 tourSchema.post(/^find/,function(doc,next){
  console.log("Post Hook for the Find Query is done") 
    next();
 });





const Tour= mongoose.model('Tour',tourSchema);

module.exports=Tour;