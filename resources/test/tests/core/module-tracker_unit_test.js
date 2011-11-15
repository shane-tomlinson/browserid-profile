/*jshint browsers:true, forin: true, laxbreak: true */
/*global steal: true, test: true, start: true, stop: true, module: true, ok: true, equal: true, BrowserID: true */
/**
 * Original code authored by Shane Tomlinson
 * original source at: https://github.com/stomlinson/appcore/blob/master/test/module_unit_test.js
 * Licenced under Mozilla Tri-license.
 */
(function() {
  "use strict";

  var bid = BrowserID,
      moduleTracker = bid.moduleTracker,
      moduleConstructed = false,
      moduleInited = false,
      moduleInitData,
      moduleStarted = false,
      moduleStartData,
      moduleStopped = false;

  function Module() {
    moduleConstructed = true;
  }

  Module.prototype = {
    constructor: Module,
    init: function(data) {
      moduleInited = true; 
      moduleInitData = data;
    },

    start: function(data) {
      moduleStarted = true;
      moduleStartData = data;
    },

    stop: function() {
      moduleStopped = true;
    }
  };

  module("core/moduleTracker", {
    setup: function() {
      moduleConstructed = moduleInited = moduleStarted = moduleStopped = false;
      moduleStartData = moduleInitData = undefined;
      moduleTracker.reset();
    },

    teardown: function() {
      moduleTracker.reset();
    }
  });

  test("register a module with no constructor throws an exception", function() {
    var error;

    try {
      moduleTracker.register("service");
    } catch(e) {
      error = e;
    }

    equal(error, "module constructor missing for service", "exception correctly thrown");
  });


  test("register a module", function() {
    moduleTracker.register("service", Module);
    strictEqual(moduleTracker.getModule("service"), Module, "register->getModule are same module");
  });

  test("start a module that has not been registered throws exception", function() {
    var error;

    try {
      moduleTracker.start("service");
    } catch(e) {
      error = e;  
    }

    equal(error, "module not registered for service", "exception correctly thrown");
  });

  test("start a module that is registered", function() {
    var initData = { initField: true };
    moduleTracker.register("service", Module, initData);

    var startData = { someField: true };
    var module = moduleTracker.start("service", startData);

    ok(moduleConstructed, "module has been constructed");
    ok(moduleInited, "module has been inited");
    ok(moduleInitData === initData, "initData passed in on start");

    ok(moduleStarted, "module has been started");
    ok(moduleStartData === startData, "startData passed in on start");

    ok(module, "module returned on start");
  });

  test("stop a module that has not been started throws exception", function() {
    moduleTracker.register("service", Module);

    var error;
    try {
      moduleTracker.stop("service");
    } catch(e) {
      error = e;
    }

    equal(error, "module not started for service", "exception correctly thrown");
  });

  test("stop a module that is running", function() {
    moduleTracker.register("service", Module);
    moduleTracker.start("service");
    moduleTracker.stop("service");

    ok(moduleStopped, "module has been stopped");
  });

  test("start a module that is already started", function() {
    moduleTracker.register("service", Module);
    moduleTracker.start("service");

    var error;

    try {
      moduleTracker.start("service");
    } catch(e) {
      error = e;
    }

    equal(error, "module already running for service", "exception correctly thrown");
  });

  test("restart a module that was stopped, ", function() {
    moduleTracker.register("service", Module);
    var module = moduleTracker.start("service");
    moduleTracker.stop("service");
    var module2 = moduleTracker.start("service");

    strictEqual(module, module2, "only one module instance ever created");
  });
}());
