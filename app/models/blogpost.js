var mongoose = require('mongoose'), Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var CommentSchema = new Schema({
    title:String, body:String, date:Date
});


var BlogPostSchema = new Schema({
    author:ObjectId, title:String, body:String, buf:Buffer, date:Date, comments:[CommentSchema], meta:{
        votes:Number, favs:Number
    }
});
/**
 * Note this must return a query object.   If it doesn't well, I dunno what it'll do.
 * @param q
 * @param term
 */
BlogPostSchema.statics.findTitleLike = function findTitleLike(q, term) {
    return this.find({'title':new RegExp(q.title || term, 'i')});
}
var Comment = module.exports.Comment = mongoose.model('Comment', CommentSchema);
var BlogPost = module.exports.BlogPost = mongoose.model('BlogPost', BlogPostSchema);
