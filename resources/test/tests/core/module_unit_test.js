/*jshint browser:true, jQuery: true, forin: true, laxbreak:true */
/*globals BrowserID: true, _:true */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla bid.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
(function() {
  "use strict";

  var Module = BrowserID.Module,
      mod,
      config = {
        target: "#formModule"
      };

  module("core/module", {
    setup: function() {
    },

    teardown: function() {
      if (mod) {
        mod.teardown();
      }
    }
  });

  test("can create, initialize with data", function() {
    mod = Module.create(config);

    equal(mod.getConfig(), config, "config is saved in init");
    equal(mod.isRunning(), false, "module is not yet running");
  });

  test("start starts the module", function() {
    mod = Module.create(config);
    mod.start("data");

    equal(mod.getStartData(), "data", "data is set on start");
    ok(mod.isRunning(), "module is running");
  });

  test("cannot call start twice without stopping", function() {
    mod = Module.create(config);
    mod.start("data");

    var error;
    try {
      mod.start("data");
    } catch(e) {
      error = e;
    }

    equal(error, "module is already running");
  });

  test("stop stops the module", function() {
    mod = Module.create(config);
    mod.start("data");
    mod.stop();

    equal(mod.isRunning(), false, "module is no longer running");
  });

  test("cannot call stop without calling start", function() {
    mod = Module.create(config);
    var error;
    try {
      mod.stop();
    } catch(e) {
      error = e;
    }

    equal(error, "module is not running");
  });

  test("cannot call stop twice consecutively without start", function() {
    mod = Module.create(config);
    mod.start("data");
    mod.stop();
    var error;
    try {
      mod.stop();
    } catch(e) {
      error = e;
    }

    equal(error, "module is not running");
  });

  test("dom events are bound on start if domevents are declared, events unbound when stop is called", function() {
    function formClick(event) {
      event.preventDefault();
      this.clicked = true;
    }

    var InheritedModule = Module.extend({
      domevents: {
        "click form": formClick
      }
    });

    mod = InheritedModule.create(config);

    // bind the dom events
    mod.start();

    $("#formModule").trigger("click");
    ok(mod.clicked, "event bound, handler run");

    // unbind the dom events
    mod.clicked = false;
    mod.stop();
    $("#formModule").trigger("click");
    equal(mod.clicked, false, "event not bound, handler not run");
  });

  test("teardown stops module", function() {
    mod = Module.create(config);
    mod.start("data");
    mod.teardown();

    equal(mod.isRunning(), false, "module is no longer running after teardown");
    mod = null;
  });

}());
