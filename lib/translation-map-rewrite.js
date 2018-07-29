/* jshint node: true */
'use strict';

var Filter = require('broccoli-filter');
var Cache = require('broccoli-filter/lib/cache');
var jscodeshift = require('jscodeshift');

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
  const j = jscodeshift;
  const root = j(string);
  root.find(j.Property, {
    key: {
      name: '__TRANSLATION_MAP__'
    },
    value: {
      value: '__REPLACE_ME__'
    }
  }).forEach((p) => {
    j(p.parentPath.parentPath).replaceWith(
      j.objectExpression(
        Object.keys(this.assetMap).map((key) => {
          return j.objectProperty(j.literal(key), j.literal(this.assetMap[key]));
        })
      )
    );
  });
  return root.toSource();
};
