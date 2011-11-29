$(function() {
  "use strict";
  var bid = BrowserID,
      modules = bid.module,
      mediator = bid.Mediator;

  modules.register("profile_get", bid.Modules.Profile, {
    target: "body" 
  });

  var userModel = bid.Models.Profile.create();
  userModel.load();

  mediator.subscribe("profile_ready", function(msg, data) {
    var message = JSON.stringify({
      message: "done",
      data: data
    });
    window.opener.postMessage(message, "*");
  });

  modules.start("profile_get", userModel);
});

