Counties = new Meteor.Collection('counties');
Reports = new Meteor.Collection('reports');
Snowlevels = new Meteor.Collection('snowlevels');

if (Meteor.isClient) {

  Template.header.title = function() {
    return "Ohio Snow Death";
  };
  
  Template.header.tagline = function() {
    return "Getting to SnowMash couldn't be more fun!";
  };

  Template.login.events = {
    'click #signIn' : function() {
      Meteor.loginWithTwitter();
    }
  };

  Template.counties.counties = function() {
    return Counties.find({}, { sort: ['name', 'asc'] });   
  };

  Template.snowlevels.snowlevels = function() {
    return Snowlevels.find({}, { sort: ['level', 'desc'] });
  }

}

