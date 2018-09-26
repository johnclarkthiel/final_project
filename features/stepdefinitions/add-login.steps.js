'use strict';

module.exports = function() {

  this.Given(/^I am not logged in$/, function(callback) {
    callback.pending();
  });

  this.When(/^I add username and password and submit$/, function(callback) {
    callback.pending();
  });

  this.Then(/^I am able to login to the system$/, function(callback) {
    callback.pending();
  });

};