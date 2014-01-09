Counties = new Meteor.Collection('counties');
Reports = new Meteor.Collection('reports');

if (Meteor.isClient) {

  Template.header.title = function() {
    return "Ohio Snow Death";
  };
  
  Template.header.tagline = function() {
    return "Getting to SnowMash couldn't be more fun!";
  };

  Template.header.events = {
    'click #signIn' : function() {
      Meteor.loginWithTwitter();
    }
  };

  Template.counties.counties = function() {
    return Counties.find({}, { sort: ['name', 'ascThis']});   
  };

}

if (Meteor.isServer) {

  Meteor.startup(function() {

    Accounts.loginServiceConfiguration.remove({
      service: "twitter"
    });

    Accounts.loginServiceConfiguration.insert({
      service: "twitter",
      consumerKey: "8f8eKkgbwO80MEYZ97MYfA",
      secret: "DPneD4L49wgO86gXHEcd6MZcmT8HlJGO1Axdnra3OM"
    });

  });

};
//     var require = __meteor_bootstrap__.require;
//     var OAuth = require('oauth').OAuth;
//     var oauth = new OAuth(
//         'https://api.twitter.com/oauth/request_token',
//         'https://api.twitter.com/oauth/access_token',
//         'yourToken',
//         'yourTokenSecret',
//         '1.0',
//         'http://localhost:3000/authCallback',
//         'HMAC-SHA1'
//     );

//     Meteor.methods({
//         auth: function() {
//             this.unblock();

//             var fut = new Future();
//             callback = function(error, oauth_token, oauth_token_secret, results) {
//                 fut.ret({
//                     error: error,
//                     oauth_token: oauth_token,
//                     oauth_token_secret: oauth_token_secret,
//                     results: results
//                 });
//             };
//             callback = _.once(callback);
    
//             oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
//                 callback(error, oauth_token, oauth_token_secret, results)
//             });
    
//             if(fut) {
//                 return fut.wait();
//             }
//         },
    
//         authCallback: function(oauth_token, oauth_verifier) {
//             this.unblock();
    
//             var fut = new Future();
//             callback = function(error, oauth_access_token, oauth_access_token_secret, results) {
//             fut.ret({
//                 error: error,
//                 oauth_access_token: oauth_access_token,
//                 oauth_access_token_secret: oauth_access_token_secret,
//                 results: results
//             });
//         };
//         callback = _.once(callback);
    
//         oauth.getOAuthAccessToken(
//             oauth_token,
//             null,
//             oauth_verifier, 
//             function(error, oauth_access_token, oauth_access_token_secret, results) {
//                 callback(error, oauth_access_token, oauth_access_token_secret, results);
//             }
//         );
    
//         if(fut) {
//             return fut.wait();
//         }

//     }});
// }
