$(function() {
  "use strict";
  var bid = BrowserID,
      modules = bid.moduleTracker,
      mediator = bid.Mediator;

  modules.register("profile:get", bid.Modules.Profile, {
    target: "body" 
  });

  var userModel = bid.Models.Profile.create();
  userModel.load();

  modules.start("profile:get", userModel);


});

