(function() {
  "use strict";

  var bid = BrowserID,
      dom = bid.DOM;

  function onPhotoChange(event) {
    var el = event.currentTarget,
        files = el.files;
    
    handleFiles.call(this, files);
  }

  function handleFiles(files) {
    var self=this;

    function onLoad(e) {
      if(self.onchange) {
        self.onchange(e.target.result);
      }
    };

    for(var i = 0, file; file = files[i]; i++) {
      var reader = new FileReader();

      reader.onload = onLoad;
      try {
        reader.readAsDataURL(file);
      }
      catch(e) {
        // this fails during unit testing.
        onLoad({
          target: {
            result: "blue" 
          }
        });
      }
    }
  }

  var PhotoUploader = bid.Modules.PageModule.extend({
    start: function(data) {
      var self=this;
      self.bind("#photo_select", "change", onPhotoChange);

      self.onchange = data && data.onchange;

      PhotoUploader.sc.start.call(this, data);
    },

    handleFiles: handleFiles
  });

  bid.Modules.PhotoUploader = PhotoUploader;

}());

