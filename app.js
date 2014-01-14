Counties = new Meteor.Collection('counties');
Snowlevels = new Meteor.Collection('snowlevels');

if (Meteor.isClient) {
  var snowLevel;

  Template.header.title = function() {
    return "Ohio Snow Death";
  };
  
  Template.header.tagline = function() {
    return "Getting to SnowMash couldn't be more fun!";
  };

  Template.counties.counties = function() {
    return Counties.find({}, { sort: ['name', 'asc'] });
  };

  Template.snowlevels.snowlevels = function() {
    return Snowlevels.find({}, { sort: ['level', 'desc'] });
  };

  Template.login.events = {
    'click #signIn' : function() {
      Meteor.loginWithTwitter(function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log('BooYAH!');
        }
      });
    }
  };

  Template.county.events = {
    'change': function(e, tmpl) {
      e.preventDefault();

      var reportDate = new Date();

      // This isn't working yet... Must learn all the things
      if (Meteor.user()) {
        var countyName = $(event.currentTarget.parentNode).siblings('td.county').text();
        var countyId = Counties.findOne({name: countyName});

        Counties.update( { _id:  countyId._id },
          { $set: {
              snowlevel: snowLevel, 
              reportdate: reportDate, 
              reportedby: Meteor.user().services.twitter.screenName
            }
          }
        );
      }
    }
  };

  Template.snowlevels.events = {
    'change': function(e, tmpl) {
      if (Meteor.user()) {
        snowLevel = e.target.value;
      }
    }
  };

  Handlebars.registerHelper('isSelectedSnowLevel', function (foo, bar) {
    return foo == bar ? 'selected' : '';
  });

}
