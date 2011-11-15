BrowserID.Module = (function() {

  var bid = BrowserID,
      dom = bid.DOM;

  var Module = AFrame.Display.extend({
    init: function(config) {
      if(typeof config.bindEvents === "undefined") {
        config.bindEvents = false;
      }

      Module.sc.init.call(this, config);
    },

    teardown: function() {
      var self=this;

      if (self.running) {
        self.stop();
      }

      Module.sc.teardown.call(self);
    },

    start: function(data) {
      var self=this;
      if (self.running) {
        throw "module is already running";
      }
      self.startData = data; 
      self.bindDOMEvents();
      self.running = true;
    },

    getStartData: function() {
      return this.startData;
    },

    isRunning: function() {
      return !!this.running;
    },

    stop: function() {
      if (!this.running) {
        throw "module is not running";
      }
      this.running = false;
      this.unbindDOMEvents();
    }
  });

  return Module;

}());


