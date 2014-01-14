var Counties = new Meteor.Collection('counties'),
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
      Meteor.loginWithTwitter();
    }
  };

  Template.county.events = {
    'change': function(e, tmpl) {
      e.preventDefault();

      var reportDate = new Date();

      if (Meteor.user()) {
        var countyName = $(event.currentTarget.parentNode).siblings('td.county').text();
        var countyId = Counties.findOne({ name: countyName });

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

  // Need to find a plugin to do this for us... Date parsing is not fun
  Handlebars.registerHelper('formatDate', function(datetime) {
    var myDate = new Date(datetime);
    return (myDate.getMonth() <= 8 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '/' + (myDate.getDate() <= 9 ? '0' + (myDate.getDate() + 1) : myDate.getDate() + 1) + '/' + myDate.getFullYear() + ' ' + (myDate.getHours() <= 9 ? '0' + myDate.getHours() : myDate.getHours()) + ':' + (myDate.getMinutes() <= 9 ? '0' + myDate.getMinutes() : myDate.getMinutes());
  });

}
