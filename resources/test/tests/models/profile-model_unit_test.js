/*jshint browsers:true, forin: true, laxbreak: true */
/*global wrappedAsyncTest: true, start: true, stop: true, module: true, ok: true, equal: true, BrowserID: true */
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
      storage = bid.Storage,
      Profile = bid.Models.Profile,
      profile,
      data = {
        name: "Jack" 
      };

  module("models/profile-model", {
    setup: function() {
      data.name = "Jack";

      profile = Profile.create({ 
        data: data
      });
    },

    teardown: function() {
      if(profile) {
        profile = null;
      }
    }
  });

  test("Can create profile model", function() {
    ok(profile, "can create a model");
    equal(profile.get("name"), "Jack", "first name set");
  });

  test("saving a model persists data", function() {
    profile.set("name", "Captain");

    profile.save();
    
    equal(storage.profile.get("name"), "Captain", "name saved to storage on save");
  });

  test("loading a model loads model correctly", function() {
    storage.profile.set("name", "Clark");

    profile.load();
    
    equal(profile.get("name"), "Clark", "name loaded from storage on load");
  });

  test("toObject returns an object", function() {
    var obj = profile.toObject();

    for(var key in data) {
      equal(obj[key], data[key], "toObject returns same value for: " + key);
    }
  });

  test("keys returns data keys in object", function() {
    var keys = profile.keys();

    for(var key in data) {
      ok(keys.indexOf(key) > -1, key + " is in the set of returned keys");
    }
  });
}());
