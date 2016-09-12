/* jshint node: true */
'use strict';

var FingerPrint = require('broccoli-asset-rev/lib/fingerprint');
var TranslationMapRewrite = require('./translation-map-rewrite');

function TranslationRev(inputTree, options) {

  if(!(this instanceof TranslationRev)) {
    return new TranslationRev(inputTree, options);
  }

  this.assetMapPath = '';
  this.assetMap = {};
  this.inputTree = inputTree;
  this.customHash = options.customHash;
  this.extensions = ['json'];
  this.exclude  = ['!**/translations/**/*.json'];
  this.generateAssetMap = false;
  this.generateRailsManifest = false;
  this.assetMapPath = '';
  this.railsManifestPath = '';
  this.ignore = options.ignore;
  this.description = options.description;

  var fingerPrintTree = FingerPrint(inputTree, this);
  return TranslationMapRewrite(fingerPrintTree, this);

}

module.exports = TranslationRev;
