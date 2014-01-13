Counties = new Meteor.Collection('counties');
Snowlevels = new Meteor.Collection('snowlevels');

if (Meteor.isClient) {

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

  Template.snowlevels.events = {
    'change': function(e, tmpl) {
      e.preventDefault();

      var reportDate = new Date();

      // This isn't working yet... Must learn all the things
      if (Meteor.user()) {
        Counties.update( { _id: tmpl.find('#snowlevels').attr('data-county').value }, 
          { 
            name: tmpl.county.value, 
            snowlevel: tmpl.find('#snowlevels').selectedValue, 
            reportdate: reportDate, 
            reportedby: Meteor.user().services.twitter.screenName
          },
          { upsert: true }
        );

      tmpl.find('.reportdate').innerHTML(reportDate);
      tmpl.find('.reportedby').innerHTML(Meteor.user().services.twitter.screenName);
      }
    }
  };

}
