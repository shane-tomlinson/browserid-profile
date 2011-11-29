BrowserID.Module = (function() {

  var bid = BrowserID,
      dom = bid.DOM,
      sc;

  var Module = bid.Class({
    init: function(config) {
      var self=this;

      self.config = config;
    },

    destroy: function() {
      var self=this;

      if(self.running) {
        self.stop();
      }
    },

    getConfig: function() {
      return this.config;
    },

    start: function(data) {
      var self=this;
      if (self.running) {
        throw "module is already running";
      }
      self.startData = data; 
      self.running = true;
    },

    getStartData: function() {
      return this.startData;
    },

    isRunning: function() {
      return !!this.running;
    },

    stop: function() {
      var self=this;
      if (!self.running) {
        throw "module is not running";
      }
      self.running = false;
    }
  });

  sc = Module.sc;

  return Module;

}());


