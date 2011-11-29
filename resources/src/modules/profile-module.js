/*jshint browser:true, jQuery: true, forin: true, laxbreak:true */
/*global BrowserID:true */
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
BrowserID.Modules = BrowserID.Modules || {};
BrowserID.Modules.Profile = (function() {
  "use strict";

  var bid = BrowserID,
      Module = bid.Module,
      dom = bid.DOM,
      mediator = bid.Mediator,
      fields = ["name", "email"];

  function getSelector(key) {
    return "[name=" + key + "]";
  }

  function createForm(data) {
    fields.forEach(function(key) {
      dom.setInner(getSelector(key), data.get(key));
    });
  }

  function saveFormData() {
    var model = this.getStartData();
    fields.forEach(function(key) {
      model.set(key, dom.getInner(getSelector(key)));
    });
  }

  function getFormData() {
    var formData = {};
    fields.forEach(function(key) {
      formData[key] = dom.getInner(getSelector(key));
    });
    
    return formData;
  }

  function formSubmit(event) {
    event && event.preventDefault();

    var self=this;
    if(!self.isRunning()) {
      throw "cannot save module if not running";
    }

    saveFormData.call(self);
    var model = self.getStartData();
    model.save();
    self.publish("profile_save", model.toObject());
  }

  function ok(event) {
    event && event.preventDefault();

    var self=this,
        formData = getFormData.call(self);
    self.publish("profile_ready", formData);
  }

  var Profile = bid.Modules.PageModule.extend({
    start: function(data) {
      var self=this;
      Profile.sc.start.call(self, data);

      createForm.call(self, data);

      self.bind("form", "submit", formSubmit);
      self.bind("#ok", "click", ok);
    },

    submit: formSubmit,
    ok: ok
  });

  return Profile;
}());
