var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Tweet = new Schema( {
    tweet: String,
    sentiment_score: Number,
    date: Date,
    added: Date,
    user_location: String,
    coordinates: String,
    geo: String,
    username: String,
    user_id: String,
    user_full_name: String,
    retweeted: Boolean
} );

module.exports.Tweet = Tweet;
