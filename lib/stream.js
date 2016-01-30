var utl = require( 'util' );
var Twitter = require( 'twitter' );
var sentimentAnalysis = require( './sentimentAnalysis' );
var mongoose = require( 'mongoose' );
var tweetModel = mongoose.model('Tweet');
var _ = require( 'underscore' );

require( 'dotenv' )
    .config();

var twitterClient = new Twitter( {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
} );

module.exports = function (membersObj) {
    var response = [],
        dbData = [];

    var members = membersObj.members;
    var membersArray = membersObj.membersArray;

    twitterClient.stream( 'statuses/filter', {follow: members}, function ( stream ) {
        stream.on( 'data', function ( tweet ) {
            var resp = {};
            resp.sentiment = sentimentAnalysis( tweet.text );
            if (membersArray.indexOf(tweet.user.id_str) != -1) {
                console.log('inserted tweet with id: ' + tweet.id_str);
                tweetModel.create( {
                    tweet: tweet.text,
                    sentiment_score: resp.sentiment.score,
                    data: tweet.created_at,
                    added: new Date(),
                    user_location: tweet.user.location,
                    coordinates: tweet.coordinates,
                    geo: tweet.geo,
                    username: tweet.user.screen_name,
                    user_id: tweet.user.id_str,
                    user_full_name: tweet.user.name,
                    retweeted: tweet.retweeted
                } );
            }
        } );

        stream.on( 'error', function ( error ) {
            console.log( error );
        } );
    } );

}
