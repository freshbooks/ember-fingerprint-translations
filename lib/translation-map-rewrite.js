/* jshint node: true */
'use strict';

var Filter = require('broccoli-filter');
var Cache = require('broccoli-filter/lib/cache');

module.exports = TranslationMapRewrite;

function TranslationMapRewrite(inputNode, options) {

  if (!(this instanceof TranslationMapRewrite)) {
    return new TranslationMapRewrite(inputNode, options);
  }

  this.assetMap = options.assetMap;

  options = options || {};
  Filter.call(this, inputNode, {
    // Only consider js files
    extensions: ['js']
  });
}

TranslationMapRewrite.prototype = Object.create(Filter.prototype);
TranslationMapRewrite.prototype.constructor = TranslationMapRewrite;

TranslationMapRewrite.prototype.processAndCacheFile = function () {
    this._cache = new Cache();
    return Filter.prototype.processAndCacheFile.apply(this, arguments);
};

TranslationMapRewrite.prototype.processString = function(string, relativePath) {
  return string.replace('__TRANSLATION_MAP__ = {}', '__TRANSLATION_MAP__= ' + JSON.stringify(this.assetMap));
};
