
if(!navigator.profile) {
  navigator.profile = {};

  var jsChannel, 
      win = window,
      callback;

  navigator.profile.get = function(cb, fields) {
    win.addEventListener("message", onMessage, false);
    win.open("dialog.html", "_moz_window",
      "menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375");

    cb = callback;
  };

  function onMessage(event) {
    if(evt.data.message === "done") {
      win.removeEventListener("message", onMessage, false);
      cb(evt.data.data);
    }
  }


  navigator.profile.init = function(options) {
    if(options.channel) {
      jsChannel = options.channel;
    }

    if(options.window) {
      win = options.window;
    }
  }
}

