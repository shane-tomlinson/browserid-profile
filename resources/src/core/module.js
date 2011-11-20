BrowserID.Module = (function() {

  var bid = BrowserID,
      dom = bid.DOM,
      af = AFrame,
      sc;

  var Module = af.Display.extend({
    init: function(config) {
      if(!af.defined(config.bindEvents)) {
        config.bindEvents = false;
      }

      sc.init.call(this, config);
    },

    teardown: function() {
      var self=this;

      if (self.running) {
        self.stop();
      }

      sc.teardown.call(self);
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

  sc = Module.sc;

  return Module;

}());


