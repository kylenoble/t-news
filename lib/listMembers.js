var utl = require( 'util' );
var Twitter = require( 'twitter' );
var sentimentAnalysis = require( './sentimentAnalysis' );
var tweetModel = require( '../models/tweet' );
var _ = require( 'underscore' );

require( 'dotenv' )
    .config();

var twitterClient = new Twitter( {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
} );


module.exports = function ( slug, owner, callback ) {
  var members = '';
  var membersArray = [];
  twitterClient.get( 'lists/members', {
      slug: slug,
      owner_screen_name: owner,
      cursor: -1,
      skip_status: 1,
      count: 70
  }, function ( error, users, response ) {
      if ( error ) throw error;
      _.each( users.users, function ( user, index ) {
          membersArray.push( user.id_str );
          if (index < users.users.length - 1 ) {
            members += user.id_str + ',';
          } else {
            members += user.id_str;
          }
      } );
      callback({'members': members, 'membersArray': membersArray});
  } );
}
