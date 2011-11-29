/*jshint browsers:true, forin: true, laxbreak: true */
/*global steal: true, test: true, start: true, stop: true, module: true, ok: true, equal: true, BrowserID:true */
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
 * The Original Code is Mozilla BrowserID.
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

  var bid = BrowserID,
      ProfileModel = bid.Models.Profile,
      ProfileModule = bid.Modules.Profile,
      mediator = bid.Mediator,
      model,
      profileModule;

  module("modules/profile_module", {
    setup: function() {
      mediator.reset();

      $("#formModule input").val("");

      model = ProfileModel.create({ 
        data: {
          name: "John Bravo",
        }
      });

      profileModule = ProfileModule.create({
        target: "#formModule"
      });
    },

    teardown: function() {
      mediator.reset();
      profileModule.destroy();
    }
  });

  
  test("profile module start fills in data", function() {
    // no data filled in before start
    equal($("input[name=name]").val(), "", "input not filled in before start");

    profileModule.start(model);

    equal($("input[name=name]").val(), "John Bravo", "input filled in after start");
  });

  asyncTest("data is not autosaved to model, but saved on submit.  Submit raises message", function() {
    profileModule.start(model);

    $("input[name=name]").val("Johnny Bravo");

    equal(model.get("name"), "John Bravo", "model not updated until submit");

    mediator.subscribe("profile_save", function(msg, data) {
      equal(model.get("name"), "Johnny Bravo", "model updated on submit");

      equal(data.name, "Johnny Bravo", "data name passed correctly");

      start();
    });
    profileModule.submit();
  });

  test("exception thrown if saving before start", function() {
    var error;
    try {
      profileModule.submit();
    }
    catch(e) {
      error = e;
    }

    equal(error, "cannot save module if not running", "exception thrown when saving before start");
  });

  test("stop works", function() {
    profileModule.start(model);
    profileModule.stop();

    // this should have no effect on the element after stop
    model.set("name", "Johnny Bravo");
    equal($("input[name=name]").val(), "John Bravo", "after stop, changes to the model do not effect fields");
  });

  asyncTest("ok click", function() {
    profileModule.start(model);

    mediator.subscribe("profile_ready", function(msg, data) {
      equal(data.name, "Johnny Bravo", "data name passed correctly");

      equal(model.get("name"), "John Bravo", "model has not changed on ok");
      start();
    });

    $("input[name=name]").val("Johnny Bravo");

    profileModule.ok();
  });

}());


