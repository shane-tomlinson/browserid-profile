
if(!navigator.profile) {
  navigator.profile = {};

  var jsChannel, 
      callback,
      dialog;

  navigator.profile.get = function(cb, fields) {
    window.addEventListener("message", onMessage, false);
    dialog = window.open("dialog.html", "_moz_window",
      "menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375");

    callback = cb;
  };

  function onMessage(evt) {
    var data = JSON.parse(evt.data);
    if(data.message === "done") {
      window.removeEventListener("message", onMessage, false);
      dialog.close();
      callback(data.data);
    }
  }


  navigator.profile.init = function(options) {
    if(options.channel) {
      jsChannel = options.channel;
    }

    /*
    if(options.window) {
      win = options.window;
    }
    */
  }
}

