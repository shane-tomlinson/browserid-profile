/**
 * Original code authored by Shane Tomlinson
 * original source: https://github.com/stomlinson/appcore/blob/master/js/module.js
 * Licensed under Mozilla Tri-License
 */
BrowserID.moduleTracker = (function() {
  "use strict";

  var registration = {},
      created = {},
      running = {};

  function register(service, module, config) {
    if (!module) {
      throw "module constructor missing for " + service;
    }

    registration[service] = {
      constructor: module,
      config: config
    };
  }

  function getRegistration(service) {
    return registration[service];
  }

  function getModule(service) {
    return registration[service].constructor;
  }

  function reset() {
    registration = {};
    running = {};
    created = {};
  }

  function start(service, data) {
    if (running[service]) {
      throw "module already running for " + service;
    }

    var module = created[service];

    if (!module) {
      var registration = getRegistration(service);
      if (registration) {
        var constr = registration.constructor,
            config = registration.config;

        module = new constr();
        created[service] = module;
        module.init(config);
      }
      else {
        throw "module not registered for " + service;
      }
    }

    module.start(data);
    running[service] = module;

    return module;
  }

  function stop(service) {
    var module = running[service];

    if (module) {
      module.stop();
      delete running[service];
    }
    else {
      throw "module not started for " + service;
    }
  }

  return {
    register: register,
    getModule: getModule,
    reset: reset,
    start: start,
    stop: stop
  };
}());
