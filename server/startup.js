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

