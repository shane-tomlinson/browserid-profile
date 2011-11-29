
if(!navigator.profile) {
  navigator.profile = {};

  var jsChannel;

  navigator.profile.get = function(callback, fields) {
    callback({
      n: "Shane Tomlinson",
      photo: "http://1.gravatar.com/avatar/beb82d3a38f7812f94120136a8cfec65",
      email: "stomlinson@mozilla.com"
    });
  };

  navigator.profile.init = function(options) {
    if(options.channel) {
      jsChannel = options.channel;
    }
  }
}

