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
      profile;

  module("models/profile-model", {
    setup: function() {
      profile = Profile.create({ 
        data: {
          "fname": "Jack",
          "lname": "Sparrow"
        }
      });
    },

    teardown: function() {
      if(profile) {
        profile.teardown();
        profile = null;
      }
    }
  });

  test("Can create profile model", function() {
    ok(profile, "can create a model");
    equal(profile.get("fname"), "Jack", "first name set");
    equal(profile.get("lname"), "Sparrow", "last name set");
  });

  test("saving a model persists data", function() {
    profile.set("fname", "Captain");

    profile.save();
    
    equal(storage.profile.get("fname"), "Captain", "fname saved to storage on save");
    equal(storage.profile.get("lname"), "Sparrow", "lname saved to storage on save");
  });

  test("loading a model loads model correctly", function() {
    storage.profile.set("fname", "Clark");
    storage.profile.set("lname", "Kent");

    profile.load();
    
    equal(profile.get("fname"), "Clark", "fname loaded from storage on load");
    equal(profile.get("lname"), "Kent", "lname loaded from storage on load");
  });
}());
