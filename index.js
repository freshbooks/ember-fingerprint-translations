/* jshint node: true */
'use strict';


var TranslationRev = require('./lib/translation-rev');

module.exports = {
  name: 'ember-translation-fetcher',

  initializeOptions: function() {
    this.options = this.app.options.fingerprintTranslations || {};
  },

  postprocessTree: function(type, tree) {
    if (type === "all" && this.options.enabled) {
      return TranslationRev(tree, this.options || {});
    }
    return tree;
  },

  included: function(app) {
    this.app = app;
    this.initializeOptions();
  },
};
