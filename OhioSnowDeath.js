Counties = new Meteor.Collection('counties');

if (Meteor.isClient) {

  Template.hello.greeting = function () {
    return "Welcome to Ohio Snow Death";
  };

  Template.counties.counties = function() {
    return Counties.find({}, { sort: ['name', 'ascThis']});   
  };
  
}
